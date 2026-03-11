import { createORPCClient, onError } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { ContractRouterClient } from "@orpc/contract";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { appContract } from "orpc-contract";

const rpcUrl = process.env.NEXT_PUBLIC_ORPC_URL ?? "http://localhost:3000/rpc";

const link = new RPCLink({
  url: rpcUrl,
  headers: () => ({}),
  interceptors: [
    onError((error) => {
      console.error("[oRPC]", error);
    }),
  ],
});

export const orpcClient: ContractRouterClient<typeof appContract> =
  createORPCClient(link);

export const tanorpc = createTanstackQueryUtils(orpcClient);
