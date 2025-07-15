package es.jorgemon.http;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import es.jorgemon.model.Event;
import es.jorgemon.repository.EventsRepository;
import es.jorgemon.dto.GetEventsRequestDto;

public class Controller {

   private static final ObjectMapper objectMapper = new ObjectMapper()
         .registerModule(new JavaTimeModule())
         .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

   public static void registerRoutes(WebServer webServer) {
      webServer.registerEndpoint("/events", Controller::getEvents);
   }

   public static String getEvents(Map<String, String> params) {
      try {
         GetEventsRequestDto filter = objectMapper.convertValue(params, GetEventsRequestDto.class);

         // Default pagination values
         if (filter.getPage() == null) {
            filter.setPage(1);
         }
         if (filter.getPageSize() == null) {
            filter.setPageSize(10);
         }

         List<Event> events = EventsRepository.getEvents(filter);

         return objectMapper.writeValueAsString(events);
      } catch (Exception e) {
         throw new RuntimeException("Error processing request: " + e.getMessage(), e);
      }
   }

}
