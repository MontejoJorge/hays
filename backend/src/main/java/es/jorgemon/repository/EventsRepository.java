package es.jorgemon.repository;

import java.util.Comparator;
import java.util.List;

import es.jorgemon.model.Event;
import es.jorgemon.service.EventsAndSourcesLoader;
import es.jorgemon.dto.GetEventsRequestDto;

public class EventsRepository {

   public static List<Event> getEvents(GetEventsRequestDto filter) {
      Comparator<Event> comparator = null;

      if (filter.getOrderBy() != null) {
          switch (filter.getOrderBy()) {
            case "id":
               comparator = Comparator.comparing(Event::getId);
               break;
            case "sourceId":
               comparator = Comparator.comparing(Event::getSourceId);
               break;
            case "timestamp":
               comparator = Comparator.comparing(Event::getTimestamp);
               break;
            case "value":
               comparator = Comparator.comparing(Event::getValue);
               break;
          }

         if (comparator != null && "desc".equalsIgnoreCase(filter.getOrderDirection())) {
            comparator = comparator.reversed();
         }
      }

      return EventsAndSourcesLoader.events.stream()
         .filter(event -> filter.getId() == null || event.getId().contains(filter.getId()))
         .filter(event -> filter.getSourceId() == null || event.getSourceId().equals(filter.getSourceId()))
         .filter(event -> filter.getStartDate() == null || !event.getTimestamp().isBefore(filter.getStartDate()))
         .filter(event -> filter.getEndDate() == null || !event.getTimestamp().isAfter(filter.getEndDate()))
         .filter(event -> filter.getValue() == null || event.getValue() == filter.getValue())
         .sorted(comparator != null ? comparator : Comparator.comparing(Event::getId))
         .skip((filter.getPage() - 1) * filter.getPageSize())
         .limit(filter.getPageSize())
         .toList();
   }

   public static long getTotalEventCount(GetEventsRequestDto filter) {
      return EventsAndSourcesLoader.events.stream()
         .filter(event -> filter.getId() == null || event.getId().contains(filter.getId()))
         .filter(event -> filter.getSourceId() == null || event.getSourceId().equals(filter.getSourceId()))
         .filter(event -> filter.getStartDate() == null || !event.getTimestamp().isBefore(filter.getStartDate()))
         .filter(event -> filter.getEndDate() == null || !event.getTimestamp().isAfter(filter.getEndDate()))
         .filter(event -> filter.getValue() == null || event.getValue() == filter.getValue())
         .count();
   }
}
