export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type EmergencyContact = {
  name: string;
  relation: string;
  mobileNumber: string;
};

export type Patient = {
  id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  dateOfBirth: string;
  age: number;
  doctorReference: string;
  mobileNumber: string;
  address: string;
  emergencyContact: EmergencyContact;
  barcodeValue: string;
  qrCodeValue: string;
  createdAt: string;
  updatedAt: string;
};

export type PatientVisit = {
  id: string;
  patientId: string;
  visitDate: string;
  doctorReference: string;
  notes: string;
};

export type RegisterPatientInput = Omit<
  Patient,
  'id' | 'patientId' | 'age' | 'barcodeValue' | 'qrCodeValue' | 'createdAt' | 'updatedAt'
>;

export type UpdatePatientInput = Partial<RegisterPatientInput>;
