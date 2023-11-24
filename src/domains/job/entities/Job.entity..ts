import { JobCategory } from "./JobCategory.entity";

export type Job = {
  id: string;
  name: string;
  jobCategory?: JobCategory;
  createdAt: Date;
  updatedAt: Date;
};

export type JobInsert = Omit<Job, "id" | "createdAt" | "updatedAt">;
