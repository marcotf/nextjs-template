import { type JobCategory } from "../entities/JobCategory.entity";
import { type JobCategoryRepository } from "../repositories/JobCategory.repository";

const jobCategoriesData: JobCategory[] = [
  {
    id: "1",
    name: "Test job category",
    createdAt: new Date(),
    updatedAt: new Date(),
    jobs: [],
  },
];

export class JobCategoryRepositoryMock implements JobCategoryRepository {
  findById(id: string): Promise<JobCategory | null> {
    return Promise.resolve(
      jobCategoriesData.find((jobCategory) => jobCategory.id === id) ?? null,
    );
  }

  findAll(): Promise<JobCategory[]> {
    return Promise.resolve(jobCategoriesData);
  }
}
