export interface SampleCollectionRow {
  sampleBarcode: string;
  patientId: string;
  testCode: string;
  collectionStatus: 'Pending' | 'Collected' | 'Rejected' | 'Transferred';
  transferStatus: 'Not Transferred' | 'In Transit' | 'Received';
  collectedAt: string;
  rejectionReason?: string;
}
