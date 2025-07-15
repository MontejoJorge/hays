package es.jorgemon.service;

import java.io.File;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import es.jorgemon.model.Event;
import es.jorgemon.model.Location;
import es.jorgemon.model.Source;

public class EventsAndSourcesLoader {

   private static final ExecutorService executor = Executors
         .newFixedThreadPool(Runtime.getRuntime().availableProcessors());

   public static final Map<String, Source> sources = new ConcurrentHashMap<>();
   public static final List<Event> events = Collections.synchronizedList(new ArrayList<>());

   public static void load() {
      long start = System.currentTimeMillis();

      CompletableFuture<Void> sourcesFuture = CompletableFuture.runAsync(EventsAndSourcesLoader::loadSources, executor);
      CompletableFuture<Void> eventsFuture = CompletableFuture.runAsync(EventsAndSourcesLoader::loadEvents, executor);

      CompletableFuture<Void> combinedFuture = CompletableFuture.allOf(sourcesFuture, eventsFuture);

      combinedFuture.join();

      long end = System.currentTimeMillis();
      System.out.println("Loaded sources and events in " + ((end - start) / 1000) + " seconds.");
   }

   public static void loadSources() {
      File sourcesFile = new File("backend/src/main/resources/sources/sources.xml");

      if (!sourcesFile.exists()) {
         throw new RuntimeException("Sources file not found: " + sourcesFile.getAbsolutePath());
      }

      try {
         DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
         DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
         Document doc = dBuilder.parse(sourcesFile);
         doc.getDocumentElement().normalize();

         NodeList nodeList = doc.getElementsByTagName("source");

         for (int i = 0; i < nodeList.getLength(); i++) {
            Node node = nodeList.item(i);
            if (node.getNodeType() != Node.ELEMENT_NODE)
               continue;

            Element element = (Element) node;

            String id = element.getElementsByTagName("id").item(0).getTextContent();
            String name = element.getElementsByTagName("name").item(0).getTextContent();
            double lat = Double.parseDouble(element.getElementsByTagName("lat").item(0).getTextContent());
            double lon = Double.parseDouble(element.getElementsByTagName("lon").item(0).getTextContent());

            Location location = new Location(lat, lon);
            Source source = new Source(id, name, location);

            sources.put(id, source);
         }

      } catch (Exception e) {
         throw new RuntimeException("Error loading sources: " + e.getMessage(), e);
      }

   }

   public static void loadEvents() {
      File eventsDir = new File("backend/src/main/resources/events");

      if (!eventsDir.exists() || !eventsDir.isDirectory()) {
         throw new RuntimeException("Events directory not found: " + eventsDir.getAbsolutePath());
      }

      File[] files = eventsDir.listFiles((dir, name) -> name.toLowerCase().endsWith(".xml"));
      if (files == null)
         return;

      List<CompletableFuture<Void>> futures = new ArrayList<>();

      for (File file : files) {
         futures.add(CompletableFuture.runAsync(() -> loadEventsFromFile(file), executor));
      }

      // Wait for all events to be loaded
      CompletableFuture<Void> allFutures = CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]));
      allFutures.join();

      System.out.println("Loaded " + events.size() + " events from " + files.length + " files.");
   }

   private static void loadEventsFromFile(File file) {
      try {
         DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
         DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
         Document doc = dBuilder.parse(file);
         doc.getDocumentElement().normalize();

         NodeList nodeList = doc.getElementsByTagName("event");

         for (int i = 0; i < nodeList.getLength(); i++) {
            Node node = nodeList.item(i);
            if (node.getNodeType() != Node.ELEMENT_NODE)
               continue;

            Element element = (Element) node;
            String id = element.getElementsByTagName("id").item(0).getTextContent();
            String sourceId = element.getElementsByTagName("sourceId").item(0).getTextContent();
            ZonedDateTime timestamp = ZonedDateTime
                  .parse(element.getElementsByTagName("timestamp").item(0).getTextContent());
            int value = Integer.parseInt(element.getElementsByTagName("value").item(0).getTextContent());
            double lat = Double.parseDouble(element.getElementsByTagName("lat").item(0).getTextContent());
            double lon = Double.parseDouble(element.getElementsByTagName("lon").item(0).getTextContent());

            Location location = new Location(lat, lon);
            Event event = new Event(id, sourceId, timestamp, value, location);

            events.add(event);
         }

      } catch (Exception e) {
         throw new RuntimeException("Error parsing events from file: " + file.getAbsolutePath(), e);
      }
   }
}
