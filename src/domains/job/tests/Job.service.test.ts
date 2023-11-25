import { beforeAll, describe, expect, it } from "bun:test";
import { JobService } from "../services/Job.service";
import { JobRepositoryMock } from "./Job.repository.mock";
import { JobCategoryRepositoryMock } from "./JobCategory.repository.mock";

describe("JobService", () => {
  let jobService: JobService;

  beforeAll(() => {
    const jobRepository = new JobRepositoryMock();
    const jobCategoryRepository = new JobCategoryRepositoryMock();
    jobService = new JobService(jobRepository, jobCategoryRepository);
  });

  describe("Job creation", () => {
    it("should create a job", async () => {
      expect(await jobService.createJob("Test job", "1")).pass();
    });

    it("should not create a job with a name that is too short", () => {
      expect(async () => {
        await jobService.createJob("a", "1");
      }).toThrow("Job name must be between 2 and 64 characters");
    });

    it("should not create a job with a name that is too long", () => {
      expect(async () => {
        await jobService.createJob("a".repeat(65), "1");
      }).toThrow("Job name must be between 2 and 64 characters");
    });
  });
});
