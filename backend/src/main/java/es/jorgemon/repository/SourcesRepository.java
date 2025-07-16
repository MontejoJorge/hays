package es.jorgemon.repository;

import java.util.List;

import es.jorgemon.model.Source;
import es.jorgemon.service.EventsAndSourcesLoader;

public class SourcesRepository {

   public static List<Source> getSources() {
      return EventsAndSourcesLoader.sources;
   }
}
