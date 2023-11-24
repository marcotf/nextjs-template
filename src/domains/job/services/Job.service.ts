import { Job } from "../entities/Job.entity.";
import { JobRepository } from "../repositories/Job.repository";
import { JobCategoryRepository } from "../repositories/JobCategory.repository";

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

    await this.jobRepository.create({ name, jobCategory });
  }

  async updateJob(job: Job): Promise<void> {
    await this.jobRepository.update(job);
  }

  async deleteJob(id: string): Promise<void> {
    await this.jobRepository.delete(id);
  }
}
