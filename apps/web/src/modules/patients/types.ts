export type PatientRegistrationForm = {
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dateOfBirth: string;
  doctorReference: string;
  mobileNumber: string;
  address: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactMobile: string;
};

export type PatientRow = {
  patientId: string;
  fullName: string;
  gender: string;
  age: number;
  doctorReference: string;
  mobileNumber: string;
};
