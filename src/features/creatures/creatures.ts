import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  CreatureModel,
  getRareResources,
  emptyRareResources,
  emptyCreature,
  getCreatingCreature,
  ResourceType,
  allResourceTypes,
  ProgramInfo,
} from "./models";
import { selectProgramByIndex, selectProgramsByIndexes } from "./programs";
import { queryState, SERVER_TICK_TO_SECOND } from "@api/client";

interface CreatureRaw {
  entity: Array<number>;
  object_id: Array<string>;
  modifiers: Array<number>;
  modifier_info: string;
}

export const selectState = (state: RootState) => state;

export function formatTime(seconds: number) {
  if (seconds == 0) {
    return "";
  }

  const pad = (num: number) => String(num).padStart(2, "0");
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}

function rawToModel(raw: CreatureRaw, index: number): CreatureModel {
  const binary = BigInt(raw.modifier_info).toString(2).padStart(64, "0");
  const currentProgramIndex = parseInt(binary.slice(8, 16), 2);
  const isProgramStop = parseInt(binary.slice(0, 8), 2) == 1;
  const startTick = parseInt(binary.slice(16), 2);
  return {
    rareResources: getRareResources(raw.entity),
    name: `Bot ${index + 1}`,
    creatureType: index,
    isLocked: false,
    programIndexes: raw.modifiers,
    currentProgramIndex: currentProgramIndex,
    isProgramStop: isProgramStop,
    startTime: startTick * SERVER_TICK_TO_SECOND,
  };
}

function createLockedCreature(creatureType: number): CreatureModel {
  return {
    rareResources: emptyRareResources,
    name: "Lock",
    isLocked: true,
    creatureType: creatureType,
    programIndexes: [null, null, null, null, null, null, null, null],
    currentProgramIndex: 0,
    isProgramStop: false,
    startTime: 0,
  };
}

const CREATURE_MAX_COUNT = 24;

function fillCreaturesWithLocked(origin: CreatureModel[]): CreatureModel[] {
  const start = origin.length;
  const end = CREATURE_MAX_COUNT;
  const addArray = Array.from(
    { length: end - start },
    (_, index) => start + index
  ).map((index) => createLockedCreature(index));
  return [...origin, ...addArray];
}

const NOT_SELECTING_CREATURE = "NotSelecting";
interface CreaturesState {
  selectedCreatureIndex: number | typeof NOT_SELECTING_CREATURE;
  creatures: CreatureModel[];
  creatingCreature: CreatureModel;
  rebootCreature: CreatureModel | null;
  selectingProgramIndex: number;
  currentPage: number;
}

const initialState: CreaturesState = {
  selectedCreatureIndex: NOT_SELECTING_CREATURE,
  creatures: [],
  creatingCreature: emptyCreature,
  rebootCreature: null,
  selectingProgramIndex: 0,
  currentPage: 0,
};

export const creaturesSlice = createSlice({
  name: "creatures",
  initialState,
  reducers: {
    setSelectedCreatureIndex: (state, action) => {
      if (action.payload.index < state.creatures.length) {
        state.selectedCreatureIndex = action.payload.index;
      }
    },
    startCreatingCreature: (state, action) => {
      state.selectedCreatureIndex = state.creatures.length;
      state.creatingCreature = getCreatingCreature(action.payload.creatureType);
      state.selectingProgramIndex = 0;
    },
    startRebootCreature: (state) => {
      if (state.selectedCreatureIndex != NOT_SELECTING_CREATURE) {
        state.rebootCreature = state.creatures[state.selectedCreatureIndex];
        state.selectingProgramIndex = 0;
      }
    },
    clearRebootCreature: (state) => {
      state.rebootCreature = null;
    },
    setProgramIndex: (state, action) => {
      if (state.selectedCreatureIndex != NOT_SELECTING_CREATURE) {
        const selectedCreature =
          state.selectedCreatureIndex === state.creatures.length
            ? state.creatingCreature
            : state.rebootCreature;

        selectedCreature!.programIndexes[state.selectingProgramIndex] =
          action.payload.programIndex;
        state.selectingProgramIndex = (state.selectingProgramIndex + 1) % 8;
      }
    },
    setSelectingProgramIndex: (state, action) => {
      state.selectingProgramIndex = action.payload.selectingIndex;
    },
    nextPage: (state) => {
      state.currentPage += 1;
    },
    prevPage: (state) => {
      state.currentPage = Math.max(0, state.currentPage - 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(queryState.fulfilled, (state, action) => {
      const creatures = action.payload.creatures as CreatureRaw[];
      state.creatures = creatures.map((creature, index) =>
        rawToModel(creature, index)
      );
    });
  },
});
export const selectCreaturesCurrentPage = (state: RootState) =>
  state.automata.creatures.currentPage;

export const selectCreaturesOnCurrentPage =
  (creatures: CreatureModel[]) => (amountPerPage: number) =>
    createSelector(
      [selectCreaturesCurrentPage],
      (selectCreaturesCurrentPage) => {
        const startIndex = selectCreaturesCurrentPage * amountPerPage;
        const endIndex = startIndex + amountPerPage;
        return creatures.slice(startIndex, endIndex);
      }
    );
const selectCreaturesData = (state: RootState) => state.automata.creatures;

export const selectIsNotSelectingCreature = createSelector(
  [selectCreaturesData],
  (creaturesState) =>
    creaturesState.selectedCreatureIndex == NOT_SELECTING_CREATURE
);

export const selectSelectedCreatureIndex = createSelector(
  [selectCreaturesData],
  (creaturesState) => creaturesState.selectedCreatureIndex
);

export const selectSelectedCreatureListIndex = createSelector(
  [selectCreaturesData],
  (creaturesState) =>
    creaturesState.selectedCreatureIndex === NOT_SELECTING_CREATURE
      ? -1
      : creaturesState.selectedCreatureIndex
);

export const selectCreaturesCount = createSelector(
  [selectCreaturesData],
  (creaturesState) => creaturesState.creatures.length
);

export const selectCreatures = createSelector(
  [selectCreaturesData],
  (creaturesState) =>
    creaturesState.selectedCreatureIndex === creaturesState.creatures.length
      ? fillCreaturesWithLocked([
          ...creaturesState.creatures,
          creaturesState.creatingCreature,
        ])
      : fillCreaturesWithLocked(creaturesState.creatures)
);
export const selectSelectedCreature = createSelector(
  [selectCreaturesData],
  (creaturesState) =>
    creaturesState.selectedCreatureIndex === NOT_SELECTING_CREATURE
      ? emptyCreature
      : creaturesState.selectedCreatureIndex === creaturesState.creatures.length
      ? creaturesState.creatingCreature
      : creaturesState.rebootCreature != null
      ? creaturesState.rebootCreature
      : creaturesState.creatures[creaturesState.selectedCreatureIndex]
);

export const selectSelectedRareResources =
  (type: ResourceType) => (state: RootState) =>
    selectSelectedCreature(state).rareResources.find(
      (resource) => resource.type == type
    )?.amount ?? 0;

export const selectSelectedCreaturePrograms = createSelector(
  [selectState],
  (state) =>
    selectProgramsByIndexes(selectSelectedCreature(state).programIndexes)(state)
);

export const selectSelectedCreatureDiffResources = createSelector(
  [selectState],
  (state) => {
    const programs = selectProgramsByIndexes(
      selectSelectedCreature(state).programIndexes
    )(state).filter((program) => program != null);
    const diffResources = Object.fromEntries(
      allResourceTypes.map((type) => [type, 0])
    );
    programs.forEach((program) =>
      program?.resources?.forEach(
        (resource) => (diffResources[resource.type] += resource.amount)
      )
    );
    return diffResources;
  }
);

function getProgressBarValue(progress: number, process: number) {
  return Math.min((progress / process) * 100, 100);
}

export const selectSelectedCreatureCurrentProgramIndex = (state: RootState) =>
  selectSelectedCreature(state).currentProgramIndex;

export const selectSelectedCreatureCurrentProgram = (localTimer: number) =>
  createSelector([selectState], (state): ProgramInfo => {
    const selectedCreature = selectSelectedCreature(state);
    return getCurrentProgram(selectedCreature)(localTimer)(state);
  });

const getCurrentProgram =
  (selectedCreature: CreatureModel) =>
  (localTimer: number) =>
  (state: RootState): ProgramInfo => {
    const currentProgramIndex = selectedCreature.currentProgramIndex;
    const programIndex = selectedCreature.programIndexes[currentProgramIndex]!;
    let program = selectProgramByIndex(programIndex)(state);

    if (program == null) {
      return {
        program: null,
        index: null,
        remainTime: 0,
        progress: 0,
      };
    }

    if (selectedCreature.isProgramStop == true) {
      return {
        program,
        index: currentProgramIndex,
        remainTime: 0,
        progress: 100,
      };
    }

    let time = localTimer - selectedCreature.startTime;
    let diffIndex = 0;
    let index = currentProgramIndex + diffIndex;
    while (diffIndex < 8 && time >= program.processingTime) {
      time -= program.processingTime;
      diffIndex += 1;
      index = (currentProgramIndex + diffIndex) % 8;
      program = selectProgramByIndex(selectedCreature.programIndexes[index]!)(
        state
      )!;
      if (program == null) {
        return {
          program: null,
          index: null,
          remainTime: 0,
          progress: 0,
        };
      }
    }

    return {
      program,
      index,
      remainTime: Math.ceil(program.processingTime - time),
      progress: getProgressBarValue(time, program.processingTime),
    };
  };

export const selectSelectedCreatureSelectingProgram = createSelector(
  [selectState],
  (state): ProgramInfo => {
    const selectedCreature = selectSelectedCreature(state);
    const programIndex =
      selectedCreature.programIndexes[
        state.automata.creatures.selectingProgramIndex
      ];
    return {
      program: selectProgramByIndex(programIndex)(state),
      index: state.automata.creatures.selectingProgramIndex,
      remainTime: 0,
      progress: 0,
    };
  }
);

export const selectCreaturesCurrentProgressOnCurrentPage =
  (creatures: CreatureModel[]) =>
  (amountPerPage: number) =>
  (localTimer: number) =>
    createSelector([selectState], (selectState) => {
      const slicedCreatures =
        selectCreaturesOnCurrentPage(creatures)(amountPerPage)(selectState);
      return slicedCreatures.map(
        (creature) =>
          getCurrentProgram(creature)(localTimer)(selectState).progress
      );
    });

export const selectCurrentPage = createSelector(
  [selectCreaturesData],
  (selectCreaturesData) => selectCreaturesData.currentPage
);

export const {
  setSelectedCreatureIndex,
  startCreatingCreature,
  startRebootCreature,
  clearRebootCreature,
  setProgramIndex,
  setSelectingProgramIndex,
  nextPage,
  prevPage,
} = creaturesSlice.actions;
export default creaturesSlice.reducer;
