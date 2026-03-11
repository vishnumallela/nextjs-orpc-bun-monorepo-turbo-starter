import { oc } from "@orpc/contract";
import { z } from "zod";

const schemas = {
  greet: {
    input: z.object({ name: z.string() }),
    output: z.object({ message: z.string() }),
  },
  ping: {
    input: z.object({}),
    output: z.object({ pong: z.literal(true) }),
  },
  echo: {
    input: z.object({ text: z.string() }),
    output: z.object({ text: z.string() }),
  },
  health: {
    input: z.object({}),
    output: z.object({ ok: z.literal(true) }),
  },
} as const;

export const helloContract = oc.router({
  greet: oc.input(schemas.greet.input).output(schemas.greet.output),
  ping: oc.input(schemas.ping.input).output(schemas.ping.output),
  echo: oc.input(schemas.echo.input).output(schemas.echo.output),
  health: oc.input(schemas.health.input).output(schemas.health.output),
});
