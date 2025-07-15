package es.jorgemon.dto;

import es.jorgemon.model.Event;
import es.jorgemon.model.Pagination;

public class GetEventsResponseDto {
   private Pagination<Event> pagination;

   public GetEventsResponseDto(Pagination<Event> pagination) {
      this.pagination = pagination;
   }

   public Pagination<Event> getPagination() {
      return pagination;
   }

   public void setPagination(Pagination<Event> pagination) {
      this.pagination = pagination;
   }
}
