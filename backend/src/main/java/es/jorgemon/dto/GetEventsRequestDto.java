package es.jorgemon.dto;

import java.time.OffsetDateTime;

public class GetEventsRequestDto {
   private String sourceId;
   private OffsetDateTime startDate;
   private OffsetDateTime endDate;
   private Integer minValue;
   private Integer maxValue;
   private Integer page;
   private Integer pageSize;

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

   public Integer getMinValue() {
      return minValue;
   }

   public void setMinValue(Integer minValue) {
      this.minValue = minValue;
   }

   public Integer getMaxValue() {
      return maxValue;
   }

   public void setMaxValue(Integer maxValue) {
      this.maxValue = maxValue;
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
}
