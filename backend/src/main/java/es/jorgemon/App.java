package es.jorgemon;

public class App {
   public static void main(String[] args) {
      // Initialize directories and files (if does not exist)
      CreateEventsAndSources.main();

      // Start the basic web server
      WebServer.main();
   }
}
