import React, { useCallback, useEffect, useState } from "react";
import {
  loginL2AccountAsync,
  selectL1Account,
  setL1AllAccount,
} from "./accountSlice";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import "./index.css";
import PlayButton from "../Buttons/PlayButton";

const Account: React.FC = () => {
  const account = useAccount();
  const dispatch = useAppDispatch();
  const { connectors, connect, status } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const [l2Address, setL2Address] = useState("");
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
    if (account.status === "connected") {
      dispatch(
        setL1AllAccount({
          address: account.address,
          chainId: account.chainId,
        })
      );
    } else if (account.status === "disconnected") {
      connectWallet();
    }
  }, [
    account.address,
    account.chainId,
    account.status,
    connect,
    connectWallet,
    connectors,
    dispatch,
  ]);

  return (
    <>
      {account.status === "disconnected" ? (
        <PlayButton onClick={connectWallet} />
      ) : (
        // : chain?.unsupported ? (
        //   <PlayButton
        //     text={"Wrong network"}
        //     onClick={() => {
        //     }}
        //   />
        // )
        <PlayButton
          onClick={() => {
            if (l1account !== undefined) {
              dispatch(loginL2AccountAsync({ l1account, signMessageAsync }));
            } else {
              console.error("L1AccountInfo is undefined");
            }
          }}
        />
      )}
      {/* {<PlayButton text={"Wrong network"} onClick={openChainModal} />} */}
      {/* <div>
        <h2>Account</h2>
        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
          <br />
          l2Address: {l2Address}
        </div>
        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
      <br />
      <button
        type="button"
        onClick={async () => {
          if (account.address) {
            alert("请打开metamask签名");
            let result = await signMessageAsync({ message: account.address });
            setL2Address(result);
          } else {
            alert("Account address is undefined");
          }
        }}
      >
        签名消息,得到l2 prikey
      </button> */}
    </>
  );
};

export default Account;
