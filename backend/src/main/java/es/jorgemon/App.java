package es.jorgemon;

import es.jorgemon.service.EventsAndSourcesLoader;
import es.jorgemon.http.WebServer;
import es.jorgemon.service.EventsAndSourcesCreator;

public class App {

   public static void initialize() {
      // Initialize directories and files (if does not exist)
      EventsAndSourcesCreator.main();

      // Load sources and events
      EventsAndSourcesLoader.load();
   }

   public static void startServer() {
      WebServer.main();
   }

   public static void main(String[] args) {
      initialize();
      startServer();
   }
}
