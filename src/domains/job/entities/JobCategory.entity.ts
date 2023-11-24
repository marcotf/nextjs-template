import { Job } from "./Job.entity.";

export type JobCategory = {
  id?: string;
  name: string;
  jobs?: Job[];
  createdAt: Date;
  updatedAt: Date;
};

export type JobCategoryInsert = Omit<
  JobCategory,
  "id" | "createdAt" | "updatedAt"
>;
