import { SamplesService } from './samples.service';

export class SamplesController {
  constructor(private readonly samplesService: SamplesService) {}

  createCollection(payload: Parameters<SamplesService['createCollectionEntry']>[0]) {
    return this.samplesService.createCollectionEntry(payload);
  }

  updateStatus(sampleId: string, status: 'PENDING' | 'COLLECTED' | 'REJECTED' | 'TRANSFERRED') {
    return this.samplesService.updateCollectionStatus(sampleId, status);
  }

  reject(sampleId: string, reason: string) {
    return this.samplesService.rejectSample(sampleId, reason);
  }

  updateTransfer(sampleId: string, status: 'NOT_TRANSFERRED' | 'IN_TRANSIT' | 'RECEIVED') {
    return this.samplesService.updateTransferStatus(sampleId, status);
  }

  track(sampleBarcode: string) {
    return this.samplesService.trackByBarcode(sampleBarcode);
  }
}
