package es.jorgemon.model;

import java.time.OffsetDateTime;

public class Event {
   private String id;
   private String sourceId;
   private OffsetDateTime timestamp;
   private int value;
   private Location location;

   public Event(String id, String sourceId, OffsetDateTime timestamp, int value, Location location) {
      this.id = id;
      this.sourceId = sourceId;
      this.timestamp = timestamp;
      this.value = value;
      this.location = location;
   }

   public String getId() {
      return id;
   }

   public String getSourceId() {
      return sourceId;
   }

   public OffsetDateTime getTimestamp() {
      return timestamp;
   }

   public int getValue() {
      return value;
   }

   public Location getLocation() {
      return location;
   }
}
