import { JobCategory } from "../entities/JobCategory.entity";

export interface JobCategoryRepository {
  findById(id: string): Promise<JobCategory | null>;
  findAll(): Promise<JobCategory[]>;
}
