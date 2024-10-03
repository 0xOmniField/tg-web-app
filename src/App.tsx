import { useState } from "react";
import { useAccount, useConnect, useDisconnect,useSignMessage } from "wagmi";

window.open = (function (open) {
	return function (url, _, features) {
		return open.call(window, url, "_blank", features);
	};
})(window.open);

function App() {
	const account = useAccount();
	const { connectors, connect, status, error } = useConnect();
	const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const [l2Address, setL2Address] = useState("");
	return (
		<>
			<div>
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
      <br/>
	  <button type="button" onClick={async () =>{
		if (account.address) {
      alert("请打开metamask签名");
		  let result = await signMessageAsync({ message: account.address });
		  setL2Address(result);
		} else {
		  alert("Account address is undefined");
		}
	  }}>
						签名消息,得到l2 prikey
			</button>
		</>
	);
}

export default App;
