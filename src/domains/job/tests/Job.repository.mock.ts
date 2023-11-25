import type { Job, JobInsert } from "@/domains/job/entities/Job.entity.";
import type { JobRepository } from "@/domains/job/repositories/Job.repository";

const jobsData: Job[] = [
  {
    id: "1",
    name: "Test job",
    jobCategory: {
      id: "1",
      name: "Test job category",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export class JobRepositoryMock implements JobRepository {
  findById(id: string): Promise<Job | null> {
    return Promise.resolve(jobsData.find((job) => job.id === id) ?? null);
  }

  findLast(): Promise<Job | null> {
    throw new Error("Method not implemented.");
  }

  async create(job: JobInsert): Promise<void> {
    await Promise.resolve(
      jobsData.push({
        ...job,
        id: String(jobsData.length + 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
  }

  update(_: Job & { id: string }): Promise<void> {
    throw new Error("Method not implemented.");
  }

  delete(_: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
