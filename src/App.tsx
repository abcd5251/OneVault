import "@rainbow-me/rainbowkit/styles.css";
import { useState } from "react";
import {
  ConnectButton,
  RainbowKitProvider,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider, http } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./layout";
import { config } from "./config";

const queryClient = new QueryClient();

export default function App() {
  const [inputText, setInputText] = useState("");
  const [displayBox, setDisplayBox] = useState<{
    text: string;
    color: string;
  } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSend = () => {
    const value = inputText.toLowerCase();
    if (value === "news") {
      setDisplayBox({ text: "hello, how can i help you", color: "yellow" });
    } else if (value === "low risk") {
      setDisplayBox({ text: "low risk strategy", color: "green" });
    } else if (value === "high risk") {
      setDisplayBox({ text: "high risk strategy", color: "red" });
    } else {
      setDisplayBox(null);
    }
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Layout />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
