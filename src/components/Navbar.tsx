"use client";

import Link from "next/link";
import React from "react";
import bs58 from "bs58";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export function Navbar() {
  const router = useRouter();
  const [walletProvider, setWalletProvider] = useState<
    "phantom" | "metamask" | null
  >(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showDisconnectPopup, setShowDisconnectPopup] = useState(false);
  const [showWalletSelector, setShowWalletSelector] = useState(false);
  const [providers, setProviders] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Handle incoming announcements
    function handleAnnounce(event: any) {
      const { info, provider } = event.detail;
      setProviders((prev) => {
        // Check if provider already exists
        const exists = prev.some((p) => p.info.uuid === info.uuid);
        if (!exists) {
          return [...prev, { info, provider }];
        }
        return prev;
      });
    }

    // Listen for EIP-6963 announcements
    window.addEventListener("eip6963:announceProvider", handleAnnounce);

    // Request providers to announce themselves
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    return () => {
      window.removeEventListener("eip6963:announceProvider", handleAnnounce);
    };
  }, []);

  useEffect(() => {
    const checkExistingConnection = async () => {
      const token = localStorage.getItem("token");
      const savedProvider = localStorage.getItem("walletProvider");

      if (!token || !savedProvider) return;

      if (savedProvider === "phantom" && window.solana?.isPhantom) {
        try {
          const resp = await window.solana.connect({ onlyIfTrusted: true });
          if (resp) {
            setIsConnected(true);
            setWalletProvider("phantom");
          }
        } catch (error) {
          console.log("Not connected to Phantom");
          localStorage.removeItem("token");
          localStorage.removeItem("walletProvider");
        }
      } else if (savedProvider === "metamask" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setIsConnected(true);
            setWalletProvider("metamask");
          }
        } catch (error) {
          console.log("Not connected to MetaMask");
          localStorage.removeItem("token");
          localStorage.removeItem("walletProvider");
        }
      }
    };

    checkExistingConnection();
  }, []);

  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const disconnectCurrentWallet = async () => {
    if (window.solana && walletProvider === "phantom") {
      try {
        await window.solana.disconnect();
      } catch (error) {
        console.error("Error disconnecting Phantom:", error);
      }
    }

    // For MetaMask, we just clear our local state since we can't forcefully disconnect
    if (walletProvider === "metamask") {
      // We can unsubscribe from MetaMask events if we've set any
      if (window.ethereum) {
        window.ethereum.removeAllListeners?.();
      }
    }
  };

  const handleWalletAction = async () => {
    if (isConnected) {
      setShowDisconnectPopup(true);
    } else {
      await disconnectCurrentWallet(); // Disconnect any existing wallet
      setShowWalletSelector(true);
    }
  };

  const handlePhantomConnect = async () => {
    try {
      await disconnectCurrentWallet(); // Disconnect any existing wallet

      // Clear existing tokens
      localStorage.removeItem("token");
      localStorage.removeItem("walletProvider");

      // Connect Phantom
      const resp = await window.solana.connect();
      const message =
        "Sign in to OpenPisces: " + window.solana.publicKey.toBase58();
      const encodedMessage = new TextEncoder().encode(message);
      const { signature, publicKey } = await window.solana.signMessage(
        encodedMessage,
        "utf8"
      );

      const response = await fetch("/api/auth/verify-wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_key: publicKey.toBase58(),
          signature: bs58.encode(signature),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("walletProvider", "phantom");
        setIsConnected(true);
        setWalletProvider("phantom");
        setShowWalletSelector(false);
        router.push("/profile");
      } else {
        console.error("Signature verification failed");
      }
    } catch (error) {
      console.error("Error connecting to Phantom:", error);
    }
  };

  const handleMetaMaskConnect = async () => {
    try {
      await disconnectCurrentWallet(); // Disconnect any existing wallet

      // Clear existing tokens
      localStorage.removeItem("token");
      localStorage.removeItem("walletProvider");

      // Connect MetaMask
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Get the first account
      const account = accounts[0];

      // Create signature message
      const message = `Sign in to OpenPisces: ${account}`;

      // Request signature
      const signature = await window.ethereum.request({
        method: "personal_sign",
        params: [message, account],
      });

      // Verify signature with backend
      const response = await fetch("/api/auth/verify-wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_key: account,
          signature: signature,
          wallet_type: "metamask",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("walletProvider", "metamask");
        setIsConnected(true);
        setWalletProvider("metamask");
        setShowWalletSelector(false);
        router.push("/profile");
      } else {
        console.error("Signature verification failed");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectCurrentWallet();

      // Clear all stored data
      localStorage.removeItem("token");
      localStorage.removeItem("walletProvider");
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";

      // Reset state
      setIsConnected(false);
      setWalletProvider(null);
      setShowDisconnectPopup(false);

      // Redirect to home
      router.push("/");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  const getWalletAddress = () => {
    if (!isConnected) return "";
    if (walletProvider === "phantom") {
      return truncateAddress(window.solana.publicKey.toBase58());
    }
    if (walletProvider === "metamask") {
      return truncateAddress(window.ethereum.selectedAddress);
    }
    return "";
  };

  const getEthereumAddress = async () => {
    // Request account access
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // Get the first account
    const account = accounts[0];

    return account;
  };

  // Add MetaMask account change listener
  useEffect(() => {
    if (window.ethereum && walletProvider === "metamask") {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet from the dApp
          handleDisconnect();
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners?.();
      }
    };
  }, [walletProvider]);

  // Add this new component inside the Navbar component
  const NavItems = ({
    mobile = false,
    onItemClick,
  }: {
    mobile?: boolean;
    onItemClick?: () => void;
  }) => {
    const itemClass = mobile
      ? "py-4 text-lg font-medium hover:text-gray-500 transition-colors"
      : "hover:text-gray-500 transition-colors";

    return (
      <>
        <Link href="/create" className={itemClass} onClick={onItemClick}>
          Start A Fund
        </Link>
        <Link href="/mission" className={itemClass} onClick={onItemClick}>
          Mission
        </Link>
        <Link href="/faq" className={itemClass} onClick={onItemClick}>
          FAQ
        </Link>
        <Link href="/profile" className={itemClass} onClick={onItemClick}>
          Profile
        </Link>
      </>
    );
  };

  const handleMobileMenuClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosing(false);
    }, 300); // Match this with animation duration
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-2 bg-white">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/10" />
            <span className="text-black text-xl">OpenPisces</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div className="hidden md:block flex-1 max-w-md mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for fundraisers"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:border-gray-400"
            />
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-black">
          <NavItems />
          <button
            className="px-4 py-2 rounded-lg transition-colors border hover:text-gray-500 border-black"
            onClick={handleWalletAction}
          >
            {isConnected ? getWalletAddress() : "Login"}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className={`fixed inset-0 bg-black ${
              isClosing ? "fade-out" : "fade-in"
            }`}
            onClick={handleMobileMenuClose}
          />
          <div
            className={`fixed top-[3.5rem] right-0 w-72 h-full bg-white shadow-lg ${
              isClosing ? "slide-out" : "slide-in"
            }`}
          >
            <div className="flex flex-col p-6">
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for causes"
                    className="w-full px-4 py-3 text-base rounded-xl border border-gray-300 focus:outline-none focus:border-gray-400"
                  />
                  <svg
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              <NavItems mobile onItemClick={handleMobileMenuClose} />
              <button
                className="mt-4 px-4 py-3 text-lg font-medium rounded-lg transition-colors border hover:text-gray-500 border-black"
                onClick={handleWalletAction}
              >
                {isConnected ? getWalletAddress() : "Login"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showWalletSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Connect Wallet</h3>
              <button
                onClick={() => setShowWalletSelector(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <button
                onClick={handlePhantomConnect}
                className="w-full p-3 flex items-center justify-between border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <img src="/phantom.svg" alt="Phantom" className="w-6 h-6" />
                  <span className="ml-2">Phantom</span>
                </div>
              </button>
              <button
                onClick={handleMetaMaskConnect}
                className="w-full p-3 flex items-center justify-between border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <img src="/metamask.svg" alt="MetaMask" className="w-6 h-6" />
                  <span className="ml-2">MetaMask</span>
                </div>
              </button>
              <button
                onClick={() => console.log("Coinbase Wallet not implemented")}
                className="w-full p-3 flex items-center justify-between border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <img src="/coinbase.svg" alt="Coinbase" className="w-6 h-6" />
                  <span className="ml-2">Coinbase</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {showDisconnectPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Disconnect Wallet</h3>
            <p className="mb-4">
              Are you sure you want to disconnect your wallet?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                onClick={() => setShowDisconnectPopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleDisconnect}
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
