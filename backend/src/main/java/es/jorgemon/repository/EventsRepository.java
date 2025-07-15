package es.jorgemon.repository;

import java.util.List;

import es.jorgemon.model.Event;
import es.jorgemon.service.EventsAndSourcesLoader;
import es.jorgemon.dto.GetEventsRequestDto;

public class EventsRepository {

   public static List<Event> getEvents(GetEventsRequestDto filter) {
      return EventsAndSourcesLoader.events.stream()
         .filter(event -> filter.getSourceId() == null || event.getSourceId().equals(filter.getSourceId()))
         .filter(event -> filter.getStartDate() == null || !event.getTimestamp().isBefore(filter.getStartDate()))
         .filter(event -> filter.getEndDate() == null || !event.getTimestamp().isAfter(filter.getEndDate()))
         .filter(event -> filter.getMinValue() == null || event.getValue() >= filter.getMinValue())
         .filter(event -> filter.getMaxValue() == null || event.getValue() <= filter.getMaxValue())
         .skip((filter.getPage() - 1) * filter.getPageSize())
         .limit(filter.getPageSize())
         .toList();
   }
}
