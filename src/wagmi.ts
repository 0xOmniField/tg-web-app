import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import {
  coinbaseWallet,
  injected,
  metaMask,
  walletConnect,
} from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    coinbaseWallet(),
    metaMask(),
    walletConnect({ projectId: "7be55d26e898cb78429e8e07aa1b4513" }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
