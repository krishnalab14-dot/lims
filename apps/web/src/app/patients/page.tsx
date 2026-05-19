import { PatientRegistrationFormView } from '../../components/patients/patient-registration-form';
import { PatientSearch } from '../../components/patients/patient-search';
import { VisitHistory } from '../../components/patients/visit-history';

export default function PatientsPage() {
  return (
    <main>
      <h1>Patient Registration</h1>
      <PatientRegistrationFormView
        defaultValues={{
          firstName: 'John',
          lastName: 'Doe',
          gender: 'MALE',
          dateOfBirth: '1990-09-21',
          doctorReference: 'Dr. Brown',
          mobileNumber: '+1-555-111-2222',
          address: '16 East Medical St, Springfield',
          emergencyContactName: 'Jane Doe',
          emergencyContactRelation: 'Spouse',
          emergencyContactMobile: '+1-555-333-4444',
        }}
      />
      <PatientSearch
        patients={[
          {
            patientId: 'PT-2026-00001',
            fullName: 'John Doe',
            gender: 'MALE',
            age: 35,
            doctorReference: 'Dr. Brown',
            mobileNumber: '+1-555-111-2222',
          },
        ]}
      />
      <VisitHistory
        visits={[
          {
            id: 'v1',
            visitDate: '2026-05-19',
            doctorReference: 'Dr. Brown',
            notes: 'Routine CBC test ordered',
          },
        ]}
      />
    </main>
  );
}
