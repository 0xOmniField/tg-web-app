import { useCallback, useEffect } from "react";
import {
  loginL2AccountAsync,
  selectL1Account,
  selectL2Account,
  setL1AllAccount,
} from "./accountSlice";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import { useAccount, useConnect, useSignMessage, useSwitchChain } from "wagmi";
import "./index.css";
import PlayButton from "@components/PlayButton";

const Account: React.FC = () => {
  const account = useAccount();
  const dispatch = useAppDispatch();
  const { connectors, connect } = useConnect();
  const { signMessageAsync } = useSignMessage();
  // const [l2Address, setL2Address] = useState("");
  const l1account = useAppSelector(selectL1Account);
  const l2account = useAppSelector(selectL2Account);
  const { switchChain } = useSwitchChain();

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
  const connected =
    account && account.chainId && account.status === "connected";

  useEffect(() => {
    if (l1account !== undefined && !l2account) {
      if (account.chainId !== 137) {
        switchChain({ chainId: 137 });
      } else {
        dispatch(loginL2AccountAsync({ l1account, signMessageAsync }));
      }
    }
  }, [l1account?.address, l2account, account.chainId]);

  return (
    <>
      <div className="welcome-page-play-button">
        {!connected ? (
          <PlayButton onClick={connectWallet} />
        ) : (
          <>
            <PlayButton
              onClick={() => {
                if (l1account !== undefined) {
                  alert("开始l2签名")
                  dispatch(
                    loginL2AccountAsync({ l1account, signMessageAsync })
                  );
                } else {
                  console.error("L1AccountInfo is undefined");
                }
              }}
            />
          </>
        )}
      </div>
      {account.status === "connecting" ? (
        <div
          className="absolute left-0 right-0 top-0 bottom-0 z-50"
          style={{ background: "rgba(0, 0, 0, 0.8)" }}
        >
          <div className="loading-wrapper">
            <div className="loading" />
          </div>
        </div>
      ) :
        /* l1account !== undefined && !l2account ? (
       <div
         className="absolute left-0 right-0 top-0 bottom-0 z-50"
         style={{ background: "rgba(0, 0, 0, 0.8)" }}
       >
         <div className="loading-wrapper">
           <div className="loading" />
           <div style={{ color: "#fff" }}>
             {account.chainId !== 137
               ? "switch chain"
               : "waiting for signature"}
           </div>
         </div>
       </div>
     ) */
           null}

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
