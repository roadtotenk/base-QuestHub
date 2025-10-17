"use client";

import React from "react";
import { motion } from "framer-motion";
import { AuthProvider } from "../contexts/AuthContext";
import { WalletProvider } from "../contexts/WalletContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QuestCard from "../components/QuestCard";
import { questData } from "../data/quests";
import { ArrowRight, Trophy, Users, Zap, Star } from "lucide-react";

function HomePage() {
  const activeQuests = questData.filter((quest) => quest.status === "active");
  const completedQuests = questData
    .filter((quest) => quest.status === "completed")
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold gradient-text mb-6"
            >
              Base QuestHub
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-white-90 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Discover, participate, and win in Base Builder Quests. Build
              innovative applications on Base and earn rewards.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#quests"
                className="btn-glow inline-flex items-center space-x-2"
              >
                <span>Explore Quests</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#winners"
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <Trophy className="w-4 h-4" />
                <span>View Winners</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <div className="card text-center">
              <div className="text-3xl font-bold text-base-blue-light mb-2">
                {questData.length}
              </div>
              <div className="text-white/60">Total Quests</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-base-blue-light mb-2">
                {questData.reduce(
                  (sum, quest) => sum + quest.participants.length,
                  0
                )}
              </div>
              <div className="text-white/60">Participants</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-base-blue-light mb-2">
                {questData
                  .reduce((sum, quest) => sum + parseFloat(quest.prizePool), 0)
                  .toFixed(1)}{" "}
                ETH
              </div>
              <div className="text-white/60">Total Rewards</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Active Quests Section */}
      <section id="quests" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Active Quests
            </h2>
            <p className="text-white/60 text-lg">
              Join the current Base Builder Quests and start building
            </p>
          </motion.div>

          {activeQuests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeQuests.map((quest, index) => (
                <QuestCard key={quest.id} quest={quest} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No Active Quests
              </h3>
              <p className="text-white/60">
                Check back soon for new Base Builder Quests!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Recent Winners Section */}
      <section id="winners" className="py-16 px-4 bg-black/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Recent Winners
            </h2>
            <p className="text-white/60 text-lg">
              Celebrating the amazing builders who won Base Builder Quests
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {completedQuests.map((quest, index) => (
              <QuestCard key={quest.id} quest={quest} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Why Base QuestHub?
            </h2>
            <p className="text-white/60 text-lg">
              Everything you need to participate in Base Builder Quests
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="card text-center"
            >
              <div className="w-12 h-12 bg-base-blue/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-base-blue-light" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Easy Submission
              </h3>
              <p className="text-white/60">
                Submit your projects with a simple form and track your progress
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="card text-center"
            >
              <div className="w-12 h-12 bg-base-blue/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-base-blue-light" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Win Rewards</h3>
              <p className="text-white/60">
                Compete for ETH prizes and recognition in the Base ecosystem
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="card text-center"
            >
              <div className="w-12 h-12 bg-base-blue/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-base-blue-light" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Community</h3>
              <p className="text-white/60">
                Connect with other builders and learn from the best
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="card text-center"
            >
              <div className="w-12 h-12 bg-base-blue/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-base-blue-light" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Innovation</h3>
              <p className="text-white/60">
                Build the future of Web3 on Base's fast and secure network
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <AuthProvider>
      <WalletProvider>
        <HomePage />
      </WalletProvider>
    </AuthProvider>
  );
}
