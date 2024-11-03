import { http, createConfig } from "wagmi";
import { polygon } from "wagmi/chains";
import {
  coinbaseWallet,
  // injected,
  metaMask,
  walletConnect,
} from "wagmi/connectors";

export const config = createConfig({
  chains: [polygon],
  connectors: [
    // injected(),
    coinbaseWallet(),
    metaMask(),
    walletConnect({ projectId: "7be55d26e898cb78429e8e07aa1b4513" }),
  ],
  transports: {
    [polygon.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
