import "dotenv/config";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { CORSPlugin } from "@orpc/server/plugins";
import Bun from "bun";
import { runMigration } from "./database/migrate";
import { appRouter } from "./routers";

export { type AppRouter, appRouter } from "./routers";

await runMigration()
  .then(() => {
    console.log("migration process completed successfully");
  })
  .catch((error) => {
    console.error("Error applying migration process", error);
    process.exit(1);
  });

const handler = new RPCHandler(appRouter, {
  plugins: [new CORSPlugin()],
  interceptors: [
    onError((error) => {
      console.error(error);
    }),
  ],
});

const port = process.env.PORT ?? 3001;

Bun.serve({
  port: Number(port),
  async fetch(request: Request) {
    const { matched, response } = await handler.handle(request, {
      prefix: "/rpc",
      context: {},
    });
    if (matched && response) {
      return response;
    }
    return new Response("Not found", { status: 404 });
  },
});

console.log(`oRPC server listening on http://localhost:${port}/rpc`);
