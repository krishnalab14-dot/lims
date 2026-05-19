import { DepartmentRow, TestCatalogRow } from '../../modules/tests/types';

export function TestManagementOverview({ tests, departments }: { tests: TestCatalogRow[]; departments: DepartmentRow[] }) {
  return (
    <section>
      <h2>Test Management</h2>
      <p>Manage test categories, departments, test parameters, reference ranges, units, normal values, and pricing.</p>

      <h3>Departments</h3>
      <ul>
        {departments.map((department) => (
          <li key={department.code}>{department.code} - {department.name}</li>
        ))}
      </ul>

      <h3>Test Catalog</h3>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Category</th>
            <th>Department</th>
            <th>Unit</th>
            <th>Reference Range</th>
            <th>Normal Value</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr key={test.testCode}>
              <td>{test.testCode}</td>
              <td>{test.testName}</td>
              <td>{test.category}</td>
              <td>{test.department}</td>
              <td>{test.unit}</td>
              <td>{test.referenceRange}</td>
              <td>{test.normalValue}</td>
              <td>₹{test.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
