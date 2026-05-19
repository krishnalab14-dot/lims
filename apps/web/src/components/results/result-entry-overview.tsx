import { ResultEntryRow, ResultParameterRow } from '../../modules/results/types';

export function ResultEntryOverview({ entries, parameters }: { entries: ResultEntryRow[]; parameters: ResultParameterRow[] }) {
  return (
    <section>
      <h2>Laboratory Result Entry</h2>
      <p>Supports technician entry, parameter-wise values, validation, abnormal flags, doctor verification, and approval workflow.</p>

      <h3>Workflow Queue</h3>
      <table>
        <thead>
          <tr>
            <th>Result ID</th>
            <th>Sample ID</th>
            <th>Patient ID</th>
            <th>Test</th>
            <th>Technician</th>
            <th>Doctor</th>
            <th>Status</th>
            <th>Remarks</th>
            <th>Attachments</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.resultId}>
              <td>{entry.resultId}</td>
              <td>{entry.sampleId}</td>
              <td>{entry.patientId}</td>
              <td>{entry.testCode}</td>
              <td>{entry.technician}</td>
              <td>{entry.doctor ?? '-'}</td>
              <td>{entry.status}</td>
              <td>{entry.remarks ?? '-'}</td>
              <td>{entry.attachmentsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Parameter-wise Result Entry</h3>
      <table>
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Value</th>
            <th>Unit</th>
            <th>Reference Range</th>
            <th>Flag</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((parameter) => (
            <tr key={`${parameter.parameterName}-${parameter.value}`}>
              <td>{parameter.parameterName}</td>
              <td>{parameter.value}</td>
              <td>{parameter.unit}</td>
              <td>{parameter.referenceRange}</td>
              <td>{parameter.abnormalFlag}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
