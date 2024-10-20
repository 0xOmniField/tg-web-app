import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@app/hooks";
import { getConfig, sendTransaction, queryState } from "@api/client";
import { getInsPlayerTransactionCommandArray } from "@api/rpc";
import { useAppSelector } from "@app/hooks";
import { selectL2Account } from "@features/account/accountSlice";
import {
  UIState,
  selectUIState,
  setUIState,
  selectNonce,
} from "../automata/propertiesSlice";

const GamePlay: React.FC = () => {
  const dispatch = useAppDispatch();
  const nonce = useAppSelector(selectNonce);
  const uIState = useAppSelector(selectUIState);
  const l2account = useAppSelector(selectL2Account);
  const [inc, setInc] = useState(0);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   // 当组件加载时，派发 fetchData 异步 action
  //   if (status === "idle") {
  //     dispatch(fetchData());
  //   }
  // }, [dispatch, status]);

  const createPlayer = useCallback(() => {
    try {
      dispatch(
        sendTransaction({
          cmd: getInsPlayerTransactionCommandArray(nonce),
          prikey: l2account!.address,
        })
      );
    } catch (e) {
      console.log("Error at create player " + e);
    }
  }, [dispatch, l2account, nonce]);

  const loginProcess = useCallback(() => {
    if (uIState == UIState.QueryConfig) {
      dispatch(getConfig());
    } else if (uIState == UIState.QueryState) {
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
    } else if (uIState == UIState.CreatePlayer) {
      createPlayer();
    }
  }, [createPlayer, dispatch, l2account, uIState]);

  const updateState = useCallback(() => {
    if (uIState >= UIState.Idle) {
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
    }
    setInc(inc + 1);
  }, [dispatch, inc, l2account, uIState]);

  const preloadImages = (images: Record<string, any>, onReady: () => void) => {
    // 预加载所有图片
    let loadedCount = 0;
    const urls = Object.keys(images);
    urls.forEach((path) => {
      const img = new Image();
      img.src = images[path].default;

      img.onload = () => {
        loadedCount++;
        setProgress(Math.ceil((loadedCount / urls.length) * 8000) / 100);
        setMessage(`Loading images (${loadedCount}/${urls.length})`);
        if (loadedCount === urls.length) {
          onReady();
        }
      };

      img.onerror = () => {
        console.error(`Failed to load image: ${images[path].default}`);
        loadedCount++;
        if (loadedCount === urls.length) {
          onReady();
        }
      };
    });
  };

  useEffect(() => {
    loginProcess();
  }, [loginProcess, uIState]);

  useEffect(() => {
    setTimeout(() => {
      updateState();
      // console.log(9999, uIState, progress, message);
    }, 1000);
  }, [inc, updateState]);

  useEffect(() => {
    if (l2account && uIState == UIState.Init) {
      const images = import.meta.glob("/src/assets/*.(png|jpg|jpeg|gif)", {
        eager: true,
      });
      preloadImages(images, () => {
        dispatch(setUIState({ uIState: UIState.QueryConfig }));
        setMessage("Syncing data from server...");
      });
    }
  }, [dispatch, l2account, uIState]);

  return (
    <div>
      <h1>Counter: {l2account?.address}</h1>
      {/* <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment by 5
      </button>
      {status === "loading" && <div>Loading...</div>}
      {status === "succeeded" && <ul>{data}</ul>}
      {status === "failed" && <div>Error loading data.</div>} */}
    </div>
  );
};

export default GamePlay;
