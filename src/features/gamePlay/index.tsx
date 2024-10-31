import "./index.less";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "@app/hooks";
import {
  selectGlobalTimer,
  selectUIState,
} from "@features/automata/propertiesSlice";

import MainMenu from "./MainMenu";
import Command from "./Command";
import LeftMenu from "./LeftMenu";
import RightMenu from "./RightMenu";
import { SERVER_TICK_TO_SECOND } from "@api/client";

const GamePlay: React.FC = () => {
  const uIState = useAppSelector(selectUIState);

  //#region LocalTime
  const globalTimer = useAppSelector(selectGlobalTimer);
  const [globalTimerCache, setGlobalTimerCache] = useState(globalTimer);
  const [localTimer, setLocalTimer] = useState(globalTimer);
  const [visibilityChange, setVisibilityChange] = useState(false);
  const startTimeRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const elapsedTimeMultiplierRef = useRef<number>(1);
  const lastLocalTimerRef = useRef<number>(globalTimer);

  const resetStartTimeRef = () => {
    startTimeRef.current = 0;
    lastLocalTimerRef.current =
      Math.abs(globalTimerCache - localTimer) > SERVER_TICK_TO_SECOND
        ? globalTimerCache
        : localTimer;
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      setVisibilityChange(true);
    }
  };

  useEffect(() => {
    const updateProgress = (timestamp: DOMHighResTimeStamp) => {
      if (startTimeRef.current === 0) {
        startTimeRef.current = timestamp;
      }

      setLocalTimer(
        lastLocalTimerRef.current +
          ((timestamp - startTimeRef.current) / 1000) *
            elapsedTimeMultiplierRef.current
      );
      animationFrameIdRef.current = requestAnimationFrame(updateProgress);
    };

    resetStartTimeRef();
    elapsedTimeMultiplierRef.current = Math.max(
      Math.min(
        (globalTimerCache - lastLocalTimerRef.current + SERVER_TICK_TO_SECOND) /
          SERVER_TICK_TO_SECOND,
        1.2
      ),
      0.8
    );

    if (animationFrameIdRef.current !== null) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
    animationFrameIdRef.current = requestAnimationFrame(updateProgress);

    setVisibilityChange(false);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resetStartTimeRef();
    };
  }, [uIState, globalTimerCache, visibilityChange]);

  useEffect(() => {
    setGlobalTimerCache(globalTimer);
  }, [globalTimer]);

  return (
    <div className="main">
      <div className="header" />
      <div className="content">
        <LeftMenu localTimer={localTimer} />
        <MainMenu localTimer={localTimer} />
        <RightMenu />

        <Command />
      </div>
    </div>
  );
};

export default GamePlay;
