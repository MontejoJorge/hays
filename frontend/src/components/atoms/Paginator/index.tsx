interface PaginationProps {
  currentPage: number;
  totalPages: number;
  fetchNextPage: () => void;
  fetchPreviousPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const Paginator = ({
  currentPage,
  totalPages,
  fetchNextPage,
  fetchPreviousPage,
  hasNextPage,
  hasPreviousPage,
}: PaginationProps) => {
  return (
    <div>
      <button disabled={!hasPreviousPage} onClick={fetchPreviousPage}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        Next
      </button>
    </div>
  );
};
