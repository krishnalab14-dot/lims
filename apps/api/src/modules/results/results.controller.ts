import { ResultsService } from './results.service';

export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  create(payload: Parameters<ResultsService['createResult']>[0]) {
    return this.resultsService.createResult(payload);
  }

  addParameter(resultId: string, payload: Parameters<ResultsService['addParameterEntry']>[1]) {
    return this.resultsService.addParameterEntry(resultId, payload);
  }

  complete(resultId: string, remarks?: string) {
    return this.resultsService.completeResultEntry(resultId, remarks);
  }

  verify(resultId: string, doctorId: string, remarks?: string) {
    return this.resultsService.verifyByDoctor(resultId, doctorId, remarks);
  }

  approve(resultId: string, approverId: string, remarks?: string) {
    return this.resultsService.approveResult(resultId, approverId, remarks);
  }
}
