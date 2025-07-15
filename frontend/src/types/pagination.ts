export interface Pagination<T> {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  data: T[];
}
