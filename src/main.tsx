import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { Provider } from "react-redux";
import { store } from "@app/store";
import App from "./App.tsx";
import VConsole from "vconsole";
import "./index.css";

globalThis.Buffer = Buffer;
const queryClient = new QueryClient();

import { config } from "./wagmi.ts";
import React from "react";

if (
  process.env.NODE_ENV === "development" ||
  (process.env.NODE_ENV === "production" &&
    window.location.search.includes("debug=true"))
) {
  new VConsole();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  </Provider>
);
