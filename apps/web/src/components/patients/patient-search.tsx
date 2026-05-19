import { PatientRow } from '../../modules/patients/types';

type PatientSearchProps = {
  patients: PatientRow[];
};

export function PatientSearch({ patients }: PatientSearchProps) {
  return (
    <section>
      <h2>Patient Search</h2>
      <input placeholder='Search by patient ID, name, mobile, or doctor' />
      <table>
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th>Doctor</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.patientId}>
              <td>{patient.patientId}</td>
              <td>{patient.fullName}</td>
              <td>{patient.gender}</td>
              <td>{patient.age}</td>
              <td>{patient.doctorReference}</td>
              <td>{patient.mobileNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
