package es.jorgemon;

import es.jorgemon.service.EventsAndSources;
import es.jorgemon.service.EventsAndSourcesCreator;
import es.jorgemon.web.WebServer;

public class App {
   public static void main(String[] args) {
      // Initialize directories and files (if does not exist)
      EventsAndSourcesCreator.main();

      // Load sources and events
      EventsAndSources.load();

      // Start the basic web server
      WebServer.main();
   }
}
