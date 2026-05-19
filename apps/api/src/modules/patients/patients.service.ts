import { Patient, PatientVisit, RegisterPatientInput, UpdatePatientInput } from './patients.types';

export class PatientsService {
  private patients: Patient[] = [];
  private visits: PatientVisit[] = [];

  private calculateAge(dateOfBirth: string): number {
    const dob = new Date(dateOfBirth);
    const now = new Date();
    let age = now.getUTCFullYear() - dob.getUTCFullYear();
    const monthDelta = now.getUTCMonth() - dob.getUTCMonth();
    const dayDelta = now.getUTCDate() - dob.getUTCDate();

    if (monthDelta < 0 || (monthDelta === 0 && dayDelta < 0)) {
      age -= 1;
    }

    return age;
  }

  private generatePatientId(): string {
    return `PT-${new Date().getUTCFullYear()}-${String(this.patients.length + 1).padStart(5, '0')}`;
  }

  register(input: RegisterPatientInput): Patient {
    const patientId = this.generatePatientId();
    const now = new Date().toISOString();

    const patient: Patient = {
      ...input,
      id: `p-${this.patients.length + 1}`,
      patientId,
      age: this.calculateAge(input.dateOfBirth),
      barcodeValue: patientId,
      qrCodeValue: `lims://patient/${patientId}`,
      createdAt: now,
      updatedAt: now,
    };

    this.patients.push(patient);
    return patient;
  }

  update(patientId: string, input: UpdatePatientInput): Patient | null {
    const index = this.patients.findIndex((patient) => patient.patientId === patientId);
    if (index === -1) return null;

    const existing = this.patients[index];
    const merged = { ...existing, ...input } as Patient;
    merged.age = this.calculateAge(merged.dateOfBirth);
    merged.updatedAt = new Date().toISOString();

    this.patients[index] = merged;
    return merged;
  }

  search(query: string): Patient[] {
    const normalized = query.trim().toLowerCase();
    return this.patients.filter((patient) =>
      [
        patient.patientId,
        patient.firstName,
        patient.lastName,
        patient.mobileNumber,
        patient.doctorReference,
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    );
  }

  getVisitHistory(patientId: string): PatientVisit[] {
    return this.visits.filter((visit) => visit.patientId === patientId);
  }
}
