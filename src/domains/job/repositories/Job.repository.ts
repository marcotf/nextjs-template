import { type Job, type JobInsert } from "../entities/Job.entity.";

export interface JobRepository {
  findById(id: string): Promise<Job | null>;
  findLast(): Promise<Job | null>;
  create(job: JobInsert): Promise<void>;
  update(job: Job): Promise<void>;
  delete(id: string): Promise<void>;
}
