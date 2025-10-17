"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { createBaseAccountSDK } from "@base-org/account";
import { baseSepolia } from "viem/chains";
import { encodeFunctionData, parseUnits } from "viem";

// USDC contract address on Base Sepolia
const USDC_ADDRESS = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
const RECIPIENT_ADDRESS = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";

// ERC-20 ABI for transfer function
const ERC20_ABI = [
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

interface WalletContextType {
  provider: ReturnType<
    ReturnType<typeof createBaseAccountSDK>["getProvider"]
  > | null;
  connected: boolean;
  universalAddress: string;
  subAccountAddress: string;
  loading: boolean;
  status: string;
  connectWallet: () => Promise<void>;
  sendUSDC: (amount: string, recipient?: string) => Promise<string | null>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<ReturnType<
    ReturnType<typeof createBaseAccountSDK>["getProvider"]
  > | null>(null);
  const [connected, setConnected] = useState(false);
  const [universalAddress, setUniversalAddress] = useState<string>("");
  const [subAccountAddress, setSubAccountAddress] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Ready to connect");

  // Initialize SDK with quickstart configuration
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        const sdkInstance = createBaseAccountSDK({
          appName: "Base QuestHub",
          appLogoUrl: "https://base.org/logo.png",
          appChainIds: [baseSepolia.id],
          // Quickstart configuration
          subAccounts: {
            creation: "on-connect",
            defaultAccount: "sub",
          },
        });

        const providerInstance = sdkInstance.getProvider();
        setProvider(providerInstance);
        setStatus("SDK initialized - ready to connect");
      } catch (error) {
        console.error("SDK initialization failed:", error);
        setStatus("SDK initialization failed");
      }
    };

    initializeSDK();
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      setStatus("Provider not initialized");
      return;
    }

    setLoading(true);
    setStatus("Connecting wallet and creating sub account...");

    try {
      // With quickstart config, this will automatically create a sub account
      const connectedAccounts = (await provider.request({
        method: "wallet_connect",
        params: [],
      })) as string[];

      const accounts = (await provider.request({
        method: "eth_requestAccounts",
        params: [],
      })) as string[];

      // With defaultAccount: 'sub', the sub account is the first account
      const subAddr = accounts[0];
      const universalAddr = accounts[1];

      setSubAccountAddress(subAddr);
      setUniversalAddress(universalAddr);
      setConnected(true);
      setStatus("Connected! Sub Account automatically created");
    } catch (error) {
      console.error("Connection failed:", error);
      setStatus(
        `Connection failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const sendUSDC = useCallback(
    async (
      amount: string,
      recipient: string = RECIPIENT_ADDRESS
    ): Promise<string | null> => {
      if (!provider || !subAccountAddress) {
        setStatus("Not connected or sub account not available");
        return null;
      }

      setLoading(true);
      setStatus("Preparing USDC transfer...");

      try {
        // Parse amount (USDC has 6 decimals)
        const amountInUnits = parseUnits(amount, 6);

        // Encode the transfer function call
        const data = encodeFunctionData({
          abi: ERC20_ABI,
          functionName: "transfer",
          args: [recipient as `0x${string}`, amountInUnits],
        });

        setStatus("Sending transaction...");

        // Send the transaction using wallet_sendCalls
        const callsId = (await provider.request({
          method: "wallet_sendCalls",
          params: [
            {
              version: "2.0",
              atomicRequired: true,
              chainId: `0x${baseSepolia.id.toString(16)}`,
              from: subAccountAddress,
              calls: [
                {
                  to: USDC_ADDRESS,
                  data: data,
                  value: "0x0",
                },
              ],
              capabilities: {
                // Optional: Add paymaster URL here to sponsor gas
                // paymasterUrl: "your-paymaster-url",
              },
            },
          ],
        })) as string;

        setStatus(`Transaction sent! Calls ID: ${callsId}`);
        return callsId;
      } catch (error) {
        console.error("Transaction failed:", error);
        setStatus(
          `Transaction failed: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
        return null;
      } finally {
        setLoading(false);
      }
    },
    [provider, subAccountAddress]
  );

  const disconnect = () => {
    setConnected(false);
    setUniversalAddress("");
    setSubAccountAddress("");
    setStatus("Disconnected");
  };

  return (
    <WalletContext.Provider
      value={{
        provider,
        connected,
        universalAddress,
        subAccountAddress,
        loading,
        status,
        connectWallet,
        sendUSDC,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
