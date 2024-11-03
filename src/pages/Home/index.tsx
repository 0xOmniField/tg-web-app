import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@app/hooks";
import { getConfig, sendTransaction, queryState } from "@api/client";
import { getInsPlayerTransactionCommandArray } from "@api/rpc";
import { useAppSelector } from "@app/hooks";
import {
  UIState,
  selectUIState,
  setUIState,
  selectNonce,
} from "../../features/automata/propertiesSlice";
import GamePlay from "../../features/gamePlay";
import WelcomePage from "../../components/WelcomePage";
import {
  selectL1Account,
  selectL2Account,
  setL1AllAccount,
} from "@components/Account/accountSlice";
import PlayButton from "@components/PlayButton";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import "./index.less";

const Home = () => {
  const [show, setShow] = useState(false);
  const account = useAccount();
  const dispatch = useAppDispatch();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const l1account = useAppSelector(selectL1Account);
  const connectWallet = useCallback(() => {
    const walletConnectConnector = connectors.find(
      (connector) => connector.id === "walletConnect"
    );
    if (walletConnectConnector) {
      connect({ connector: walletConnectConnector });
    }
  }, [connect, connectors]);

  useEffect(() => {
    if (!account.isConnected) {
      connectWallet();
    } else {
      dispatch(
        setL1AllAccount({
          address: account.address,
          chainId: account.chainId,
        })
      );
    }
  }, [
    account.address,
    account.chainId,
    account.isConnected,
    connectWallet,
    dispatch,
  ]);

  const nonce = useAppSelector(selectNonce);
  const uIState = useAppSelector(selectUIState);
  const l2account = useAppSelector(selectL2Account);
  const [inc, setInc] = useState(0);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

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
      img.src = images?.[path]?.default;

      img.onload = () => {
        loadedCount++;
        setProgress(Math.ceil((loadedCount / urls.length) * 8000) / 100);
        setMessage(`Loading images (${loadedCount}/${urls.length})`);
        if (loadedCount === urls.length) {
          onReady();
        }
      };

      img.onerror = () => {
        console.error(`Failed to load image: ${images?.[path]?.default}`);
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
  // useEffect(() => {
  //   dispatch(getConfig());
  //   dispatch(queryState({ cmd: [], prikey: "" }));
  // }, []);
  return (
    <>
      <div className="header">
        <div className="logo" />
        <div>
          {account.status === "connected" ? (
            <div className="relative">
              <PlayButton
                text={l1account?.address}
                onClick={() => {
                  setShow(!show);
                }}
              />
              <div
                className="absolute"
                style={{
                  top: "52px",
                  width: "100%",
                  display: !show ? "none" : "block",
                }}
              >
                <PlayButton text="logout" onClick={() => disconnect()} />
              </div>
            </div>
          ) : (
            <PlayButton text="login" onClick={connectWallet} />
          )}
        </div>
      </div>
      {l2account && uIState >= UIState.Idle ? (
        <GamePlay />
      ) : (
        <WelcomePage progress={progress} message={message} />
      )}
    </>
  );
  // return <GamePlay />;
};

export default Home;
