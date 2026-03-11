import { helloContract } from "./contracts/hello";

export const appContract = {
  hello: helloContract,
};

export type AppContract = typeof appContract;
