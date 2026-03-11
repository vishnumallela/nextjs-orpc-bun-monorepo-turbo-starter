import { implement } from "@orpc/server";
import { appContract } from "orpc-contract";
import { createHelloRouter } from "./hello";

const os = implement(appContract);

export const appRouter = os.router({
  hello: createHelloRouter(os),
});

export type AppRouter = typeof appRouter;
