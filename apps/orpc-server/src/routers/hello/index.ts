import type { Implementer } from "@orpc/server";
import type { appContract } from "packages/orpc-contract";

type Ctx = Record<never, never>;

export function createHelloRouter(
  os: Implementer<typeof appContract, Ctx, Ctx>
) {
  return {
    greet: os.hello.greet.handler(({ input }) => ({
      message: `Hello, ${input.name}!`,
    })),
    ping: os.hello.ping.handler(() => ({ pong: true as const })),
    echo: os.hello.echo.handler(({ input }) => ({ text: input.text })),
    health: os.hello.health.handler(() => ({ ok: true as const })),
  };
}
