export function FilterBar() {
  return (
    <div style={{ display: 'flex', gap: 8, margin: '8px 0' }}>
      <select aria-label="Status filter"><option>All Statuses</option><option>Pending</option><option>Completed</option></select>
      <select aria-label="Department filter"><option>All Departments</option><option>Hematology</option><option>Biochemistry</option></select>
      <button type="button">Apply Filters</button>
    </div>
  );
}
