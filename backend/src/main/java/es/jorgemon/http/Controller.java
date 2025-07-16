package es.jorgemon.http;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import es.jorgemon.dto.GetEventsRequestDto;
import es.jorgemon.model.Event;
import es.jorgemon.model.Pagination;
import es.jorgemon.model.Source;
import es.jorgemon.repository.EventsRepository;
import es.jorgemon.repository.SourcesRepository;

public class Controller {

   private static final ObjectMapper objectMapper = new ObjectMapper()
         .registerModule(new JavaTimeModule())
         .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
         .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

   public static void registerRoutes(WebServer webServer) {
      webServer.registerEndpoint("/events", Controller::getEvents);
      webServer.registerEndpoint("/sources", Controller::getSources);
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
         long totalItems = EventsRepository.getTotalEventCount(filter);

         Pagination<Event> pagination = new Pagination<>(
            filter.getPage(),
            filter.getPageSize(),
            totalItems,
            events
         );

         return objectMapper.writeValueAsString(pagination);
      } catch (Exception e) {
         throw new RuntimeException(e.getMessage(), e);
      }
   }

   public static String getSources(Map<String, String> params) {
      try {
         List<Source> sources = SourcesRepository.getSources();
         return objectMapper.writeValueAsString(sources);
      } catch (Exception e) {
         throw new RuntimeException(e.getMessage(), e);
      }
   }
}
