import "server-only";

import { headers } from "next/headers";

import { appRouter } from "@/server/api/root";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs";

export const api = appRouter.createCaller({
  db: db,
  headers: headers(),
  auth: auth(),
});
