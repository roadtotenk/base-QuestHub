"use client";

import React from "react";
import { AuthProvider } from "../../contexts/AuthContext";
import { WalletProvider } from "../../contexts/WalletContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LoginForm from "../../components/LoginForm";

export default function Login() {
  return (
    <AuthProvider>
      <WalletProvider>
        <div className="min-h-screen">
          <Navbar />
          <LoginForm />
          <Footer />
        </div>
      </WalletProvider>
    </AuthProvider>
  );
}
