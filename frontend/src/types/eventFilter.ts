export interface EventFilter {
  id?: string;
  sourceId?: string;
  value?: string;
  startDate?: string;
  endDate?: string;
  orderBy?: string;
  orderDirection?: string;
  page: number;
  pageSize: number;
}
