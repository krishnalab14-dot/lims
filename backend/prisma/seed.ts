import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create organization
  const org = await prisma.organization.create({
    data: {
      name: 'Central Medical Hospital',
      code: 'CMH001',
      email: 'admin@centralhospital.com',
      phone: '+1-800-123-4567',
      address: '123 Medical Plaza, Health City, HC 12345',
    },
  });

  console.log(`✓ Organization created: ${org.name}`);

  // Create labs
  const labHematology = await prisma.lab.create({
    data: {
      organizationId: org.id,
      name: 'Hematology Lab',
      code: 'HEMA001',
    },
  });

  const labChemistry = await prisma.lab.create({
    data: {
      organizationId: org.id,
      name: 'Chemistry Lab',
      code: 'CHEM001',
    },
  });

  console.log(`✓ Labs created: ${labHematology.name}, ${labChemistry.name}`);

  // Create users
  const adminPassword = await bcryptjs.hash('admin123', 10);
  const techPassword = await bcryptjs.hash('tech123', 10);

  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@lab.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      labId: labHematology.id,
      role: 'LAB_ADMIN',
    },
  });

  const techUser = await prisma.user.create({
    data: {
      email: 'tech@lab.com',
      password: techPassword,
      firstName: 'Tech',
      lastName: 'User',
      labId: labHematology.id,
      role: 'TECHNICIAN',
    },
  });

  console.log(`✓ Users created: ${adminUser.email}, ${techUser.email}`);

  // Create test groups
  const hematologyGroup = await prisma.testGroup.create({
    data: {
      labId: labHematology.id,
      name: 'Hematology',
      code: 'HEMA',
      order: 1,
    },
  });

  console.log(`✓ Test group created: ${hematologyGroup.name}`);

  // Create tests
  const cbcTest = await prisma.test.create({
    data: {
      testGroupId: hematologyGroup.id,
      code: 'CBC',
      name: 'Complete Blood Count',
      category: 'Hematology',
      price: 250,
      unit: 'cells/µL',
      resultForm: [
        {
          field: 'wbc',
          label: 'White Blood Cell Count',
          type: 'number',
          unit: '10^3/µL',
          normalRange: '4.0-10.0',
          required: true,
        },
        {
          field: 'rbc',
          label: 'Red Blood Cell Count',
          type: 'number',
          unit: '10^6/µL',
          normalRange: '4.5-5.5',
          required: true,
        },
        {
          field: 'hemoglobin',
          label: 'Hemoglobin',
          type: 'number',
          unit: 'g/dL',
          normalRange: '12-16',
          required: true,
        },
        {
          field: 'platelets',
          label: 'Platelet Count',
          type: 'number',
          unit: '10^3/µL',
          normalRange: '150-400',
          required: true,
        },
      ],
    },
  });

  console.log(`✓ Test created: ${cbcTest.name}`);

  // Create patients
  const patient1 = await prisma.patient.create({
    data: {
      organizationId: org.id,
      mrn: 'MRN001',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: new Date('1990-01-15'),
      gender: 'M',
      phone: '555-1234',
      email: 'john.doe@email.com',
      address: '456 Elm Street',
      city: 'Health City',
      state: 'HC',
      zipCode: '12345',
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      organizationId: org.id,
      mrn: 'MRN002',
      firstName: 'Jane',
      lastName: 'Smith',
      dateOfBirth: new Date('1985-06-20'),
      gender: 'F',
      phone: '555-5678',
      email: 'jane.smith@email.com',
      address: '789 Oak Avenue',
      city: 'Health City',
      state: 'HC',
      zipCode: '12345',
    },
  });

  console.log(`✓ Patients created: ${patient1.firstName} ${patient1.lastName}, ${patient2.firstName} ${patient2.lastName}`);

  // Create samples
  const sample1 = await prisma.sample.create({
    data: {
      labId: labHematology.id,
      sampleId: 'S-2024-001',
      patientId: patient1.id,
      sampleType: 'BLOOD',
      status: 'RECEIVED',
      receivedDate: new Date(),
      collectionDate: new Date(),
      tests: {
        create: [
          {
            testId: cbcTest.id,
            status: 'PROCESSING',
          },
        ],
      },
    },
  });

  const sample2 = await prisma.sample.create({
    data: {
      labId: labHematology.id,
      sampleId: 'S-2024-002',
      patientId: patient2.id,
      sampleType: 'BLOOD',
      status: 'COMPLETED',
      receivedDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
      completedDate: new Date(),
      collectionDate: new Date(Date.now() - 3 * 60 * 60 * 1000),
      tests: {
        create: [
          {
            testId: cbcTest.id,
            status: 'COMPLETED',
            results: {
              wbc: 7.5,
              rbc: 4.8,
              hemoglobin: 14.2,
              platelets: 250,
            },
          },
        ],
      },
    },
  });

  console.log(`✓ Samples created: ${sample1.sampleId}, ${sample2.sampleId}`);

  // Create workflows
  await prisma.labWorkflow.create({
    data: {
      labId: labHematology.id,
      status: 'RECEIVED',
      allowedTransitions: ['PROCESSING', 'REJECTED'],
      requiresApproval: false,
    },
  });

  await prisma.labWorkflow.create({
    data: {
      labId: labHematology.id,
      status: 'PROCESSING',
      allowedTransitions: ['COMPLETED', 'REJECTED'],
      requiresApproval: false,
    },
  });

  await prisma.labWorkflow.create({
    data: {
      labId: labHematology.id,
      status: 'COMPLETED',
      allowedTransitions: ['VERIFIED', 'REJECTED'],
      requiresApproval: true,
    },
  });

  console.log(`✓ Workflows created`);

  console.log('\n✅ Database seeding completed!');
  console.log('\n📝 Demo Credentials:');
  console.log('   Email: admin@lab.com');
  console.log('   Password: admin123');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
