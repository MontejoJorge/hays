package es.jorgemon.model;

import java.util.List;

public class Pagination<T> {
   private int currentPage;
   private int nextPage;
   private int prevPage;
   private int totalPages;
   private long totalItems;
   private int perPage;
   private List<T> data;

   public Pagination(int currentPage, int perPage, long totalItems, List<T> data) {
      this.currentPage = currentPage;
      this.perPage = perPage;
      this.totalItems = totalItems;
      this.totalPages = (int) Math.ceil((double) totalItems / perPage);
      this.nextPage = currentPage < totalPages ? currentPage + 1 : 0;
      this.prevPage = currentPage > 1 ? currentPage - 1 : 0;
      this.data = data;
   }

   public int getCurrentPage() {
      return currentPage;
   }

   public int getNextPage() {
      return nextPage;
   }

   public int getPrevPage() {
      return prevPage;
   }

   public int getTotalPages() {
      return totalPages;
   }

   public long getTotalItems() {
      return totalItems;
   }

   public int getPerPage() {
      return perPage;
   }

   public List<T> getData() {
      return data;
   }

   public void setData(List<T> data) {
      this.data = data;
   }
}
