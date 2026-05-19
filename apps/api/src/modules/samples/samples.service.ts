import { Sample, SampleCollectionEntryInput } from './samples.types';

export class SamplesService {
  private samples: Sample[] = [];

  private generateBarcode(): string {
    return `SMP-${new Date().getUTCFullYear()}-${String(this.samples.length + 1).padStart(6, '0')}`;
  }

  createCollectionEntry(input: SampleCollectionEntryInput): Sample {
    const now = new Date().toISOString();
    const sample: Sample = {
      id: `sample-${this.samples.length + 1}`,
      sampleBarcode: this.generateBarcode(),
      patientId: input.patientId,
      visitId: input.visitId,
      testCode: input.testCode,
      collectionStatus: 'COLLECTED',
      transferStatus: 'NOT_TRANSFERRED',
      collectedAt: input.collectedAt,
      createdAt: now,
      updatedAt: now,
    };

    this.samples.push(sample);
    return sample;
  }

  updateCollectionStatus(sampleId: string, status: Sample['collectionStatus']): Sample | null {
    const sample = this.samples.find((entry) => entry.id === sampleId);
    if (!sample) return null;
    sample.collectionStatus = status;
    sample.updatedAt = new Date().toISOString();
    return sample;
  }

  rejectSample(sampleId: string, reason: string): Sample | null {
    const sample = this.samples.find((entry) => entry.id === sampleId);
    if (!sample) return null;
    sample.collectionStatus = 'REJECTED';
    sample.rejectionReason = reason;
    sample.updatedAt = new Date().toISOString();
    return sample;
  }

  updateTransferStatus(sampleId: string, status: Sample['transferStatus']): Sample | null {
    const sample = this.samples.find((entry) => entry.id === sampleId);
    if (!sample) return null;
    sample.transferStatus = status;
    if (status === 'IN_TRANSIT') {
      sample.collectionStatus = 'TRANSFERRED';
    }
    sample.updatedAt = new Date().toISOString();
    return sample;
  }

  trackByBarcode(sampleBarcode: string): Sample | null {
    return this.samples.find((entry) => entry.sampleBarcode === sampleBarcode) ?? null;
  }
}
