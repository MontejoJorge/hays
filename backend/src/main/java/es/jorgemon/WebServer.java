package es.jorgemon;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.HashMap;
import java.util.Map;
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;

@FunctionalInterface
interface EndpointHandler {
   String handle(Map<String, String> params);
}

public class WebServer {

   private HttpServer server;
   private final Map<String, HttpHandler> handlers = new HashMap<>();

   public static void main() {
      WebServer webServer = new WebServer();
      Controller.registerRoutes(webServer);
      webServer.startServer(8080);
   }

   public void startServer(int port) {
      try {
         server = HttpServer.create(new InetSocketAddress(port), 0);
         server.setExecutor(null);
         handlers.forEach(server::createContext);
         server.start();
         System.out.println("Server started on http://localhost:" + port);
      } catch (IOException e) {
         System.err.println("Error: " + e.getMessage());
      }
   }

   public void registerEndpoint(String path, EndpointHandler handler) {
      HttpHandler httpHandler = exchange -> {
         Map<String, String> queryParams = parseQueryParams(exchange.getRequestURI().getQuery());
         try {
            String response = handler.handle(queryParams);
            exchange.sendResponseHeaders(200, response.getBytes().length);
            exchange.getResponseBody().write(response.getBytes());
            exchange.getResponseBody().close();
         } catch (Exception e) {
            exchange.sendResponseHeaders(500, 0);
            exchange.getResponseBody().close();
            System.err.println("Error: " + e.getMessage());
         }
      };

      handlers.put(path, httpHandler);
      if (server != null) {
         server.createContext(path, httpHandler);
      }
   }

   private Map<String, String> parseQueryParams(String query) {
      Map<String, String> queryParams = new HashMap<>();
      if (query != null && !query.isEmpty()) {
         String[] pairs = query.split("&");
         for (String pair : pairs) {
            String[] keyValue = pair.split("=");
            if (keyValue.length == 2) {
               queryParams.put(keyValue[0], keyValue[1]);
            }
         }
      }
      return queryParams;
   }
}
