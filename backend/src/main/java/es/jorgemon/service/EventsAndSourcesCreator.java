package es.jorgemon.service;

import java.io.File;
import java.util.UUID;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;
import es.jorgemon.model.Source;
import es.jorgemon.model.Event;
import es.jorgemon.model.Location;
import java.time.OffsetDateTime;

public class EventsAndSourcesCreator {
   // Peninsula iberica
   public static final double MIN_LAT = 36.0;
   public static final double MAX_LAT = 44.5;
   public static final double MIN_LON = -10.0;
   public static final double MAX_LON = 3.5;

   public static void main() {
      createDirectory("src/main/resources/events");
      createDirectory("src/main/resources/sources");

      createSources();
      createEvents();
   }

   private static void createDirectory(String path) {
      File directory = new File(path);
      if (!directory.exists()) {
         if (!directory.mkdirs()) {
            throw new RuntimeException("Failed to create directory: " + path);
         }
      }
   }

   private static void createSources() {
      String sourcesFilePath = "src/main/resources/sources/sources.xml";
      File sourcesFile = new File(sourcesFilePath);

      if (sourcesFile.exists()) {
         return;
      }

      try {
         Document doc = DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument();
         Element root = createElement(doc, "sources");
         doc.appendChild(root);

         for (int i = 1; i <= 10; i++) {
            double lat = MIN_LAT + Math.random() * (MAX_LAT - MIN_LAT);
            double lon = MIN_LON + Math.random() * (MAX_LON - MIN_LON);
            Location location = new Location(lat, lon);

            Source source = new Source(UUID.randomUUID().toString(), "source-" + i, location);
            root.appendChild(createSourceElement(doc, source));
         }

         TransformerFactory.newInstance().newTransformer().transform(new DOMSource(doc), new StreamResult(sourcesFile));

      } catch (Exception e) {
         throw new RuntimeException("Error creating XML file: " + e.getMessage());
      }
   }

   private static void createEvents() {
      String sourcesFilePath = "src/main/resources/sources/sources.xml";
      File sourcesFile = new File(sourcesFilePath);

      if (!sourcesFile.exists()) {
         System.err.println("Sources file does not exist: " + sourcesFilePath);
         return;
      }

      try {
         Document sourcesDoc = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(sourcesFile);
         NodeList sourceNodes = sourcesDoc.getElementsByTagName("source");

         for (int fileIndex = 1; fileIndex <= 10; fileIndex++) {
            String eventsFilePath = "src/main/resources/events/events-" + fileIndex + ".xml";
            File eventsFile = new File(eventsFilePath);

            // Skip if the events file already exists
            if (eventsFile.exists()) {
               continue;
            }

            Document eventsDoc = DocumentBuilderFactory.newInstance().newDocumentBuilder().newDocument();
            Element root = createElement(eventsDoc, "events");
            eventsDoc.appendChild(root);

            for (int eventIndex = 1; eventIndex <= 100; eventIndex++) {
               int sourceIndex = (eventIndex - 1) % sourceNodes.getLength();
               Element sourceElement = (Element) sourceNodes.item(sourceIndex);

               String sourceId = sourceElement.getElementsByTagName("id").item(0).getTextContent();
               double lat = MIN_LAT + Math.random() * (MAX_LAT - MIN_LAT);
               double lon = MIN_LON + Math.random() * (MAX_LON - MIN_LON);
               Location location = new Location(lat, lon);

               String id = UUID.randomUUID().toString();
               OffsetDateTime timestamp = generateRandomTimestamp();
               int value = (int) (1 + Math.random() * 100);

               Event event = new Event(id, sourceId, timestamp, value, location);
               root.appendChild(createEventElement(eventsDoc, event));
            }

            TransformerFactory.newInstance().newTransformer().transform(new DOMSource(eventsDoc), new StreamResult(eventsFile));
         }

      } catch (Exception e) {
         throw new RuntimeException("Error creating events: " + e.getMessage());
      }
   }

   private static OffsetDateTime generateRandomTimestamp() {
      long currentTimeMillis = System.currentTimeMillis();
      long fiveYearsMillis = 5L * 365 * 24 * 60 * 60 * 1000;
      long randomTimeMillis = currentTimeMillis - (long) (Math.random() * fiveYearsMillis);
      return OffsetDateTime.ofInstant(java.time.Instant.ofEpochMilli(randomTimeMillis), java.time.ZoneId.systemDefault());
   }

   private static Element createSourceElement(Document doc, Source source) {
      Element sourceElement = createElement(doc, "source");
      sourceElement.appendChild(createElementWithText(doc, "id", source.getId()));
      sourceElement.appendChild(createElementWithText(doc, "name", source.getName()));

      Element locationElement = createElement(doc, "location");
      locationElement.appendChild(createElementWithText(doc, "lat", String.valueOf(source.getLocation().getLat())));
      locationElement.appendChild(createElementWithText(doc, "lon", String.valueOf(source.getLocation().getLon())));

      sourceElement.appendChild(locationElement);
      return sourceElement;
   }

   private static Element createEventElement(Document doc, Event event) {
      Element eventElement = createElement(doc, "event");
      eventElement.appendChild(createElementWithText(doc, "id", event.getId()));
      eventElement.appendChild(createElementWithText(doc, "sourceId", event.getSourceId()));
      eventElement.appendChild(createElementWithText(doc, "timestamp", event.getTimestamp().toString()));
      eventElement.appendChild(createElementWithText(doc, "value", String.valueOf(event.getValue())));

      Element locationElement = createElement(doc, "location");
      locationElement.appendChild(createElementWithText(doc, "lat", String.valueOf(event.getLocation().getLat())));
      locationElement.appendChild(createElementWithText(doc, "lon", String.valueOf(event.getLocation().getLon())));

      eventElement.appendChild(locationElement);
      return eventElement;
   }

   private static Element createElement(Document doc, String tagName) {
      return doc.createElement(tagName);
   }

   private static Element createElementWithText(Document doc, String tagName, String textContent) {
      Element element = createElement(doc, tagName);
      element.appendChild(doc.createTextNode(textContent));
      return element;
   }
}
