"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useWallet } from "../contexts/WalletContext";
import { Menu, X, Wallet, LogOut, User } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { connected, connectWallet, loading, disconnect } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleWalletAction = () => {
    if (connected) {
      disconnect();
    } else {
      connectWallet();
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="base-logo">B</div>
            <span className="text-xl font-bold gradient-text">
              Base QuestHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white-80 hover:text-white transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/quests"
              className="text-white-80 hover:text-white transition-colors font-medium"
            >
              Active Quests
            </Link>
            {user && (
              <Link
                href="/submissions"
                className="text-white-80 hover:text-white transition-colors font-medium"
              >
                My Submissions
              </Link>
            )}
            {user?.role === "admin" && (
              <Link
                href="/admin"
                className="text-white-80 hover:text-white transition-colors font-medium"
              >
                Admin Panel
              </Link>
            )}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Wallet Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWalletAction}
              disabled={loading}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                connected
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "btn-secondary"
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>
                {loading
                  ? "Loading..."
                  : connected
                  ? "Connected"
                  : "Connect Wallet"}
              </span>
            </motion.button>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user.name}</span>
                  <span className="text-xs bg-base-blue/20 text-base-blue px-2 py-1 rounded">
                    {user.role}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={logout}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </motion.button>
              </div>
            ) : (
              <Link href="/login" className="btn-primary">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white/80 hover:text-white"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 py-4"
          >
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white-80 hover:text-white transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/quests"
                className="text-white-80 hover:text-white transition-colors font-medium"
              >
                Active Quests
              </Link>
              {user && (
                <Link
                  href="/submissions"
                  className="text-white-80 hover:text-white transition-colors font-medium"
                >
                  My Submissions
                </Link>
              )}
              {user?.role === "admin" && (
                <Link
                  href="/admin"
                  className="text-white-80 hover:text-white transition-colors font-medium"
                >
                  Admin Panel
                </Link>
              )}

              <div className="pt-4 border-t border-white/10">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWalletAction}
                  disabled={loading}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    connected
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "btn-secondary"
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  <span>
                    {loading
                      ? "Loading..."
                      : connected
                      ? "Connected"
                      : "Connect Wallet"}
                  </span>
                </motion.button>

                {user ? (
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{user.name}</span>
                      <span className="text-xs bg-base-blue/20 text-base-blue px-2 py-1 rounded">
                        {user.role}
                      </span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={logout}
                      className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                    </motion.button>
                  </div>
                ) : (
                  <Link href="/login" className="w-full btn-primary mt-4">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
