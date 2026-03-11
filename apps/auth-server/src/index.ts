import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

import { auth } from "./auth";

const app = new Elysia()
  .use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  )
  .mount(auth.handler)
  .listen(8000);

console.log(
  `Auth server running at ${app.server?.hostname}:${app.server?.port}`
);
