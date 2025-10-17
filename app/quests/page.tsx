"use client";

import React from "react";
import { motion } from "framer-motion";
import { AuthProvider } from "../../contexts/AuthContext";
import { WalletProvider } from "../../contexts/WalletContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import QuestCard from "../../components/QuestCard";
import { questData } from "../../data/quests";
import { useState } from "react";

function QuestsPage() {
  const [filter, setFilter] = useState<
    "all" | "active" | "upcoming" | "completed"
  >("all");

  const filteredQuests = questData.filter((quest) => {
    if (filter === "all") return true;
    return quest.status === filter;
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Base Builder Quests
            </h1>
            <p className="text-white/60 text-lg">
              Discover and participate in Base Builder Quests
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {[
              { key: "all", label: "All Quests", count: questData.length },
              {
                key: "active",
                label: "Active",
                count: questData.filter((q) => q.status === "active").length,
              },
              {
                key: "upcoming",
                label: "Upcoming",
                count: questData.filter((q) => q.status === "upcoming").length,
              },
              {
                key: "completed",
                label: "Completed",
                count: questData.filter((q) => q.status === "completed").length,
              },
            ].map((tab) => (
              <motion.button
                key={tab.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(tab.key as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  filter === tab.key
                    ? "bg-white text-base-blue"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
              >
                {tab.label} ({tab.count})
              </motion.button>
            ))}
          </motion.div>

          {/* Quest Grid */}
          {filteredQuests.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredQuests.map((quest, index) => (
                <QuestCard key={quest.id} quest={quest} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No Quests Found
              </h3>
              <p className="text-white/60">
                Try adjusting your filter to see more quests.
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function Quests() {
  return (
    <AuthProvider>
      <WalletProvider>
        <QuestsPage />
      </WalletProvider>
    </AuthProvider>
  );
}
