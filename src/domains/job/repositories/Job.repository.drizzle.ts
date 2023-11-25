import { type Job, type JobInsert } from "@/domains/job/entities/Job.entity.";
import { type JobRepository } from "@/domains/job/repositories/Job.repository";
import { db } from "@/server/db";
import { jobs } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export class JobRepositoryDrizzle implements JobRepository {
  async findById(id: string): Promise<Job | null> {
    const jobData = await db.query.jobs.findFirst({
      where: eq(jobs.id, id),
      with: { jobCategory: true },
    });

    return jobData ?? null;
  }

  async findLast(): Promise<Job | null> {
    const jobData = await db.query.jobs.findFirst({
      orderBy: (jobs, { desc }) => [desc(jobs.createdAt)],
      with: { jobCategory: true },
    });

    return jobData ? { ...jobData, jobCategory: jobData.jobCategory } : null;
  }

  async create(job: JobInsert): Promise<void> {
    await db.insert(jobs).values(job);
  }

  async update(job: Job & { id: string }): Promise<void> {
    await db.update(jobs).set(job).where(eq(jobs.id, job.id));
  }

  async delete(id: string): Promise<void> {
    await db.delete(jobs).where(eq(jobs.id, id));
  }
}
