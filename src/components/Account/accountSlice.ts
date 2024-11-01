import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SignMessageMutateAsync } from "wagmi/query";

export interface L1AccountInfo {
  address: string;
  chainId: string;
}
// export interface L2AccountInfo {
//   address: string;
// }
export class L2AccountInfo {
  address: string;
  constructor(address0x: string) {
    this.address = address0x.substring(2);
  }
  toBigInt(): bigint {
    return BigInt("0x" + this.address);
  }
}

// async function loginL1Account() {
//   return await withBrowserConnector(async (web3: DelphinusBrowserConnector) => {
//     const i = await web3.getJsonRpcSigner();
//     return {
//       address: await i.getAddress(),
//       chainId: (await web3.getNetworkId()).toString(),
//     };
//   });
// }

async function loginL2Account(
  address: string,
  signMessage: SignMessageMutateAsync<unknown>
): Promise<{ address: string }> {
  const str: string = await signMessage({ message: address });
  console.log("signed result", str);
  const l2account = new L2AccountInfo(str.substring(0, 34));
  return { address: l2account.address };
}

export interface AccountState {
  l1account?: L1AccountInfo;
  l2account?: L2AccountInfo;
  status: "Loading" | "Ready";
}

export interface State {
  account: AccountState;
}

const initialState: AccountState = {
  status: "Loading",
};

export const loginL2AccountAsync = createAsyncThunk(
  "acccount/deriveL2Account",
  async ({
    l1account,
    signMessageAsync,
  }: {
    signMessageAsync: SignMessageMutateAsync<unknown>;
    l1account: L1AccountInfo;
  }) => {
    const l2account = await loginL2Account(l1account.address, signMessageAsync);
    return l2account;
  }
);

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setL1Account: (state, account) => {
      state.l1account!.address = account.payload;
    },
    setL1AllAccount: (state, account) => {
      state.l1account = account.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginL2AccountAsync.pending, (state) => {
        state.status = "Loading";
      })
      .addCase(loginL2AccountAsync.fulfilled, (state, c) => {
        state.status = "Ready";
        console.log(c);
        state.l2account = c.payload as any;
      });
  },
});
export const { setL1AllAccount } = accountSlice.actions;
export const selectL1Account = <T extends State>(state: T) =>
  state.account.l1account;
export const selectL2Account = <T extends State>(state: T) =>
  state.account.l2account;
export const selectLoginStatus = <T extends State>(state: T) =>
  state.account.status;

export default accountSlice.reducer;
