import { PrismaClient, UserRole, ApplicationStatus } from '@prisma/client';
import { addDays } from 'date-fns';

const prisma = new PrismaClient();

async function main() {
  // Employer user
  const employer = await prisma.user.upsert({
    where: { email: 'employer@example.com' },
    update: {},
    create: {
      firstName: 'Employer',
      lastName: 'Demo',
      email: 'employer@example.com',
      password: 'seeded-hash',
      role: UserRole.EMPLOYER,
      bookmarks: [],
      applicationId: [],
    },
  });

  // Company
  const company = await prisma.company.create({
    data: {
      name: 'Demo Company',
      description: 'Seeded demo company for We Hosst.',
      email: 'company@example.com',
      employerId: employer.id,
      employerName: employer.firstName,
      phone: '+1 555 0100',
      address: '123 Main St',
      zip: '10001',
      vat: 'VAT-123456',
      crn: 'CRN-987654',
      website: 'https://example.com',
      images: [],
      managers: [],
      socialNetworks: [],
    },
  });

  // Location
  const location = await prisma.location.create({
    data: {
      name: 'HQ',
      description: 'Headquarters',
      address: '123 Main St',
      city: 'Belgrade',
      country: 'Serbia',
      zip: '11000',
      managers: [],
      socialNetworks: [],
      images: [],
      employerId: employer.id,
      Company: { connect: { id: company.id } },
    },
  });

  // Jobs
  const jobs = await prisma.$transaction(
    Array.from({ length: 5 }).map((_, idx) =>
      prisma.job.create({
        data: {
          employerName: employer.firstName,
          employer: { connect: { id: employer.id } },
          title: `Demo Job ${idx + 1}`,
          description: 'This is a seeded job description.',
          requirements: ['Requirement A', 'Requirement B'],
          location: { connect: { id: location.id } },
          company: { connect: { id: company.id } },
        },
      }),
    ),
  );

  // Applications (for first job)
  await prisma.application.create({
    data: {
      job: { connect: { id: jobs[0].id } },
      applicant: { connect: { id: employer.id } },
      company: { connect: { id: company.id } },
      resume: 'https://example.com/resume.pdf',
      coverLetter: 'I am interested in this role.',
      status: ApplicationStatus.VIEWED,
    },
  });

  // Fake recent trend by touching updatedAt
  await prisma.job.update({
    where: { id: jobs[0].id },
    data: { updatedAt: addDays(new Date(), -1) },
  });
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


