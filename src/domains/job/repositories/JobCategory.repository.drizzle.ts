import { db } from "@/server/db";
import { jobCategories } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { type JobCategory } from "../entities/JobCategory.entity";
import { type JobCategoryRepository } from "./JobCategory.repository";

export class JobCategoryRepositoryDrizzle implements JobCategoryRepository {
  async findById(id: string): Promise<JobCategory | null> {
    const jobCategoryData = await db.query.jobCategories.findFirst({
      where: eq(jobCategories.id, id),
      with: { jobs: true },
    });

    return jobCategoryData ?? null;
  }

  async findAll(): Promise<JobCategory[]> {
    const jobCategoriesData = await db.query.jobCategories.findMany();

    return jobCategoriesData;
  }
}
