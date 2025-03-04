"use client";
import { WalletIcon } from "@heroicons/react/24/outline";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function CustomRainbowKitConnectButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        // authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected = ready && account && chain;
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="cursor-pointer text-xl px-16 py-2 bg-background-blue border border-solid border-black parallelogram uppercase text-white ml-6 rounded-md px-3 py-1"
                    onClick={openConnectModal}
                    type="button"
                    style={{
                      textShadow: " -1px 2px 0px #000000",
                      WebkitTextFillColor: "white",
                      WebkitTextStroke: "0.2px black",
                    }}
                  >
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="ml-6" style={{ display: "flex" }}>
                  <button
                    className="cursor-pointer flex items-center text-2xl bg-background-gray text-white parallelogram border border-solid border-black uppercase px-4 py-3 shadow-[0_4px_0_0_rgba(0,0,0,1)]"
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.iconUrl ? (
                      <img
                        alt={chain.name}
                        src={chain.iconUrl}
                        className="size-6"
                      />
                    ) : (
                      <span>{chain.name}</span>
                    )}
                  </button>
                  <button
                    className="rounded-sm cursor-pointer flex items-center text-2xl bg-background-gray text-white parallelogram border border-solid border-black uppercase px-4 py-3 shadow-[0_4px_0_0_rgba(0,0,0,1)]"
                    onClick={openAccountModal}
                    type="button"
                    style={{
                      textShadow: "-1px 2px 0px #000000",
                      WebkitTextFillColor: "white",
                      WebkitTextStroke: "1px black",
                    }}
                  >
                    <WalletIcon className="size-6 mr-2" />
                    <span>
                      {" "}
                      {account.address.slice(0, 6) +
                        "..." +
                        account.address.slice(-4)}
                    </span>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
