package es.jorgemon.http;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import es.jorgemon.model.Event;
import es.jorgemon.repository.EventsRepository;

public class Controller {

   private static final ObjectMapper objectMapper = new ObjectMapper()
         .registerModule(new JavaTimeModule())
         .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

   public static void registerRoutes(WebServer webServer) {
      webServer.registerEndpoint("/events", Controller::getEvents);
   }

   public static String getEvents(Map<String, String> params) {
      List<Event> events = EventsRepository.getAllEvents();
      try {
         return objectMapper.writeValueAsString(events);
      } catch (Exception e) {
         throw new RuntimeException(e);
      }
   }

}
