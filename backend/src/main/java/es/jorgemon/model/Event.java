package es.jorgemon.model;

import java.time.ZonedDateTime;

public class Event {
   private String id;
   private String sourceId;
   private ZonedDateTime timestamp;
   private double value;
   private double lat;
   private double lon;

   public Event(String id, String sourceId, ZonedDateTime timestamp, double value, double lat, double lon) {
      this.id = id;
      this.sourceId = sourceId;
      this.timestamp = timestamp;
      this.value = value;
      this.lat = lat;
      this.lon = lon;
   }

   public String getId() {
      return id;
   }

   public String getSourceId() {
      return sourceId;
   }

   public ZonedDateTime getTimestamp() {
      return timestamp;
   }

   public double getValue() {
      return value;
   }

   public double getLat() {
      return lat;
   }

   public double getLon() {
      return lon;
   }
}
