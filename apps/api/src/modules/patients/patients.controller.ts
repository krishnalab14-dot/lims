import { PatientsService } from './patients.service';
import { RegisterPatientInput, UpdatePatientInput } from './patients.types';

export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  registerPatient(input: RegisterPatientInput) {
    return this.patientsService.register(input);
  }

  updatePatient(patientId: string, input: UpdatePatientInput) {
    return this.patientsService.update(patientId, input);
  }

  searchPatients(query: string) {
    return this.patientsService.search(query);
  }

  getVisitHistory(patientId: string) {
    return this.patientsService.getVisitHistory(patientId);
  }
}
