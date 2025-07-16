import { useSearchParams } from 'react-router';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export const Paginator = ({
  totalPages,
  currentPage,
  hasNextPage,
  hasPreviousPage,
}: PaginationProps) => {
  const [params, setParams] = useSearchParams();

  const goToPage = (page: number) => {
    params.set('page', String(page));
    setParams(params);
  };

  return (
    <div>
      <button
        disabled={!hasPreviousPage || currentPage <= 1}
        onClick={() => goToPage(currentPage - 1)}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={!hasNextPage || currentPage >= totalPages}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};
