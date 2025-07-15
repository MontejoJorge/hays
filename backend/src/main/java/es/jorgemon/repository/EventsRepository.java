package es.jorgemon.repository;

import java.util.List;

import es.jorgemon.model.Event;
import es.jorgemon.service.EventsAndSourcesLoader;

public class EventsRepository {

   public static List<Event> getAllEvents() {
      return EventsAndSourcesLoader.events;
   }
}
