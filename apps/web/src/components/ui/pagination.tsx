export function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  return (
    <div>
      <button type="button" disabled={page <= 1}>Previous</button>
      <span> Page {page} of {totalPages} </span>
      <button type="button" disabled={page >= totalPages}>Next</button>
    </div>
  );
}
