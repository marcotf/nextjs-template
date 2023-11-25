import { type Job } from "../entities/Job.entity.";
import { type JobRepository } from "../repositories/Job.repository";
import { type JobCategoryRepository } from "../repositories/JobCategory.repository";

export class JobService {
  constructor(
    private jobRepository: JobRepository,
    private jobCategoryRepository: JobCategoryRepository,
  ) {}

  async getJobById(id: string): Promise<Job | null> {
    return this.jobRepository.findById(id);
  }

  async getLastJob(): Promise<Job | null> {
    const job = await this.jobRepository.findLast();

    if (!job) return null;

    return { ...job, jobCategory: job.jobCategory };
  }

  async createJob(name: string, jobCategoryId: string): Promise<void> {
    const jobCategory =
      await this.jobCategoryRepository.findById(jobCategoryId);

    if (!jobCategory) throw new Error("Job category not found");

    if (name.length < 2 || name.length > 64)
      throw new Error("Job name must be between 2 and 64 characters");

    await this.jobRepository.create({ name, jobCategory });
  }

  async updateJob(job: Job): Promise<void> {
    await this.jobRepository.update(job);
  }

  async deleteJob(id: string): Promise<void> {
    await this.jobRepository.delete(id);
  }
}
