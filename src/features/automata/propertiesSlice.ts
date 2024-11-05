import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import { getConfig, sendTransaction, queryState } from "@api/client";
import { ResourceAmountPair } from "@features/creatures/models";

export enum UIState {
  Init,
  QueryConfig,
  QueryState,
  CreatePlayer,
  Idle,
  Loading,
  Guide,
  Creating,
  Reboot,
}

interface PropertiesState {
  uIState: UIState;
  globalTimer: number;
  nonce: string;
  hasRocket: boolean;
  selectedCreatureDiffResources: ResourceAmountPair[];
}

const initialState: PropertiesState = {
  uIState: UIState.Init,
  globalTimer: 0,
  nonce: "0",
  hasRocket: false,
  selectedCreatureDiffResources: [],
};

export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setUIState: (state, action) => {
      state.uIState = action.payload.uIState;
    },
    setHasRocket: (state, action) => {
      state.hasRocket = action.payload.hasRocket;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getConfig.fulfilled, (state) => {
        state.uIState = UIState.QueryState;
        console.log("query config fulfilled");
      })
      .addCase(getConfig.rejected, (_state, action) => {
        console.log(`query config rejected: ${action.payload}`);
      })
      .addCase(sendTransaction.fulfilled, (state) => {
        if (state.uIState == UIState.CreatePlayer) {
          state.uIState = UIState.Guide;
        }
        console.log("send transaction fulfilled");
      })
      .addCase(sendTransaction.rejected, (_state, action) => {
        console.log(`send transaction rejected: ${action.payload}`);
      })
      .addCase(queryState.fulfilled, (state, action) => {
        if (state.uIState == UIState.QueryState) {
          state.uIState = UIState.Idle;
        }
        state.globalTimer = action.payload.globalTimer;
        state.nonce = action.payload.player.nonce.toString();
        console.log("send transaction fulfilled");
      })
      .addCase(queryState.rejected, (state, action) => {
        if (state.uIState == UIState.QueryState) {
          state.uIState = UIState.CreatePlayer;
        }
        console.log(`query state rejected: ${action.payload}`);
      });
  },
});
export const automataProperties = (state: RootState) =>
  state.automata.properties;

export const selectIsLoading = createSelector(
  [automataProperties],
  (automataProperties) => automataProperties.uIState == UIState.Loading
);
export const selectIsSelectingUIState = createSelector(
  [automataProperties],
  (automataProperties) =>
    automataProperties.uIState == UIState.Creating ||
    automataProperties.uIState == UIState.Reboot
);

export const selectUIState = createSelector(
  [automataProperties],
  (automataProperties) => automataProperties.uIState
);

export const selectGlobalTimer = createSelector(
  [automataProperties],
  (automataProperties) => automataProperties.globalTimer
);
export const selectNonce = createSelector(
  [automataProperties],
  (automataProperties) => {
    return BigInt(automataProperties.nonce);
  }
);

export const selectHasRocket = createSelector(
  [automataProperties],
  (automataProperties) => automataProperties.hasRocket
);

export const { setUIState, setHasRocket } = propertiesSlice.actions;
export default propertiesSlice.reducer;
