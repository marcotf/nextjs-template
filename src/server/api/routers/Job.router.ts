import { z } from "zod";

import { JobRepositoryDrizzle } from "@/domains/job/repositories/Job.repository.drizzle";
import { JobCategoryRepositoryDrizzle } from "@/domains/job/repositories/JobCategory.repository.drizzle";
import { JobService } from "@/domains/job/services/Job.service";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

const jobRepository = new JobRepositoryDrizzle();
const jobCategoryRepository = new JobCategoryRepositoryDrizzle();
const jobService = new JobService(jobRepository, jobCategoryRepository);

export const jobRouter = createTRPCRouter({
  hello: protectedProcedure
    .input(z.object({ text: z.string() }))
    .query(({ ctx, input }) => {
      return {
        greeting: `Hello ${input.text} with user ${ctx.auth.userId}!`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      await jobService.createJob(
        input.name,
        "e867dac2-cea8-401e-ac50-b5ec323094ca",
      );
    }),

  getLatest: protectedProcedure.query(() => {
    return jobService.getLastJob();
  }),
});
