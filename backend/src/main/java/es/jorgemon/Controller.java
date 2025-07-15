package es.jorgemon;

import java.util.Map;

public class Controller {

   public static void registerRoutes(WebServer webServer) {
      webServer.registerEndpoint("/hello", Controller::helloEndpoint);
   }

   public static String helloEndpoint(Map<String, String> params) {
      String name = params.getOrDefault("name", "World");
      return "Hello, " + name + "!";
   }

}
