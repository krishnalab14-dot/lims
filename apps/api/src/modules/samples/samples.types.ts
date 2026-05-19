export type CollectionStatus = 'PENDING' | 'COLLECTED' | 'REJECTED' | 'TRANSFERRED';

export interface Sample {
  id: string;
  sampleBarcode: string;
  patientId: string;
  visitId?: string;
  testCode: string;
  collectionStatus: CollectionStatus;
  transferStatus: 'NOT_TRANSFERRED' | 'IN_TRANSIT' | 'RECEIVED';
  rejectionReason?: string;
  collectedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SampleCollectionEntryInput {
  patientId: string;
  visitId?: string;
  testCode: string;
  collectedAt: string;
}
