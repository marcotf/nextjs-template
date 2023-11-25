import "server-only";

import { appRouter } from "@/server/api/root";
import { auth } from "@clerk/nextjs";
import { headers } from "next/headers";

export const caller = () => {
  // cant use auth() outside a function, build fails
  return appRouter.createCaller({
    auth: auth(),
    headers: headers(),
  });
};
