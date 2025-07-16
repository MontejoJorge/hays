package es.jorgemon.dto;

import java.time.OffsetDateTime;

public class GetEventsRequestDto {
   private String id;
   private String sourceId;
   private OffsetDateTime startDate;
   private OffsetDateTime endDate;
   private Integer value;
   private Integer page;
   private Integer pageSize;
   private String orderBy;
   private String orderDirection;

   public String getId() {
      return id;
   }

   public void setId(String id) {
      this.id = id;
   }

   public String getSourceId() {
      return sourceId;
   }

   public void setSourceId(String sourceId) {
      this.sourceId = sourceId;
   }

   public OffsetDateTime getStartDate() {
      return startDate;
   }

   public void setStartDate(OffsetDateTime startDate) {
      this.startDate = startDate;
   }

   public OffsetDateTime getEndDate() {
      return endDate;
   }

   public void setEndDate(OffsetDateTime endDate) {
      this.endDate = endDate;
   }

   public Integer getValue() {
      return value;
   }

   public void setValue(Integer value) {
      this.value = value;
   }

   public Integer getPage() {
      return page;
   }

   public void setPage(Integer page) {
      this.page = page;
   }

   public Integer getPageSize() {
      return pageSize;
   }

   public void setPageSize(Integer pageSize) {
      this.pageSize = pageSize;
   }

   public String getOrderBy() {
      return orderBy;
   }

   public void setOrderBy(String orderBy) {
      this.orderBy = orderBy;
   }

   public String getOrderDirection() {
      return orderDirection;
   }

   public void setOrderDirection(String orderDirection) {
      this.orderDirection = orderDirection;
   }
}
