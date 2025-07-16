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

  const changePageSize = (size: number) => {
    params.set('pageSize', String(size));
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
      <label htmlFor="pageSize">Results per page:</label>
      <select
        id="pageSize"
        onChange={(e) => changePageSize(Number(e.target.value))}
        defaultValue={params.get('pageSize') || '10'}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </div>
  );
};
