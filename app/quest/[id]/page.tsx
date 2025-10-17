"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AuthProvider } from "../../../contexts/AuthContext";
import { WalletProvider } from "../../../contexts/WalletContext";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { questData } from "../../../data/quests";
import { QuestParticipant } from "../../../types";
import {
  Calendar,
  Trophy,
  Users,
  Github,
  ExternalLink,
  Twitter,
  Youtube,
  Send,
  DollarSign,
} from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";
import { useWallet } from "../../../contexts/WalletContext";

interface QuestDetailsProps {
  questId: string;
}

function QuestDetailsPage({ questId }: QuestDetailsProps) {
  const { user } = useAuth();
  const { connected, sendUSDC, loading: walletLoading } = useWallet();
  const [submissionForm, setSubmissionForm] = useState({
    projectTitle: "",
    description: "",
    githubLink: "",
    demoVideoLink: "",
  });
  const [tipAmount, setTipAmount] = useState("1");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quest = questData.find((q) => q.id === questId);

  if (!quest) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Quest Not Found
          </h1>
          <p className="text-white/60">
            The quest you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    alert("Project submitted successfully!");
  };

  const handleTipProject = async (participant: QuestParticipant) => {
    if (!connected) {
      alert("Please connect your wallet first");
      return;
    }

    const success = await sendUSDC(tipAmount, participant.walletAddress);
    if (success) {
      alert(`Successfully tipped ${tipAmount} USDC to ${participant.name}!`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Quest Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card mb-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-4xl font-bold gradient-text mb-2">
                  {quest.title}
                </h1>
                <p className="text-white/60 text-lg">{quest.month}</p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium border ${
                    quest.status === "active"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : quest.status === "upcoming"
                      ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                      : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  }`}
                >
                  {quest.status.charAt(0).toUpperCase() + quest.status.slice(1)}
                </span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-base-blue-light">
                    {quest.prizePool}
                  </div>
                  <div className="text-sm text-white/60">Prize Pool</div>
                </div>
              </div>
            </div>

            <p className="text-white/80 text-lg mb-6">{quest.description}</p>

            <div className="flex flex-wrap gap-4 text-sm text-white/60">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Ends {formatDate(quest.endDate)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{quest.participants.length} participants</span>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About This Quest */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="card"
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  About This Quest
                </h2>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white/90">
                    Requirements:
                  </h3>
                  <ul className="space-y-2">
                    {quest.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="w-6 h-6 bg-base-blue/20 rounded-full flex items-center justify-center text-xs font-bold text-base-blue-light mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-white/80">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Submit Project Form */}
              {quest.status === "active" && user && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="card"
                >
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Submit Your Project
                  </h2>
                  <form onSubmit={handleSubmitProject} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Project Title
                      </label>
                      <input
                        type="text"
                        value={submissionForm.projectTitle}
                        onChange={(e) =>
                          setSubmissionForm({
                            ...submissionForm,
                            projectTitle: e.target.value,
                          })
                        }
                        className="input-field"
                        placeholder="Enter your project title"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Description
                      </label>
                      <textarea
                        value={submissionForm.description}
                        onChange={(e) =>
                          setSubmissionForm({
                            ...submissionForm,
                            description: e.target.value,
                          })
                        }
                        className="input-field h-32 resize-none"
                        placeholder="Describe your project and how it meets the requirements"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        GitHub Repository
                      </label>
                      <input
                        type="url"
                        value={submissionForm.githubLink}
                        onChange={(e) =>
                          setSubmissionForm({
                            ...submissionForm,
                            githubLink: e.target.value,
                          })
                        }
                        className="input-field"
                        placeholder="https://github.com/username/repository"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Demo Video Link (Optional)
                      </label>
                      <input
                        type="url"
                        value={submissionForm.demoVideoLink}
                        onChange={(e) =>
                          setSubmissionForm({
                            ...submissionForm,
                            demoVideoLink: e.target.value,
                          })
                        }
                        className="input-field"
                        placeholder="https://youtube.com/watch?v=..."
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-glow flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {isSubmitting ? "Submitting..." : "Submit Project"}
                      </span>
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {/* Winners & Finalists */}
              {quest.status === "completed" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="card"
                >
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Winners & Finalists
                  </h2>

                  {/* Winners */}
                  {quest.winner.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
                        <Trophy className="w-5 h-5 mr-2" />
                        Winners
                      </h3>
                      <div className="space-y-4">
                        {quest.winner.map((winner, index) => (
                          <div
                            key={index}
                            className="bg-green-500/10 border border-green-500/20 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="text-lg font-bold text-white">
                                  {winner.name}
                                </h4>
                                <p className="text-green-400 font-semibold">
                                  {winner.reward}
                                </p>
                              </div>
                              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                                Winner
                              </span>
                            </div>
                            <p className="text-white/80 mb-3">
                              {winner.project}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <a
                                href={winner.githubRepo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-white/60 hover:text-white transition-colors"
                              >
                                <Github className="w-4 h-4" />
                                <span>GitHub</span>
                              </a>
                              <a
                                href={winner.videoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-white/60 hover:text-white transition-colors"
                              >
                                <Youtube className="w-4 h-4" />
                                <span>Video</span>
                              </a>
                              <a
                                href={winner.twitterLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-white/60 hover:text-white transition-colors"
                              >
                                <Twitter className="w-4 h-4" />
                                <span>Twitter</span>
                              </a>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-white/60">
                                Submitted {formatDate(winner.submissionDate)}
                              </span>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="number"
                                  value={"1"}
                                  onChange={(e) => setTipAmount(e.target.value)}
                                  className="w-20 px-2 py-1 bg-black/20 border border-white/30 rounded text-white text-sm"
                                  placeholder="1"
                                  min="0"
                                  step="0.01"
                                />
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleTipProject(winner)}
                                  disabled={walletLoading}
                                  className="btn-secondary text-sm px-3 py-1 flex items-center space-x-1"
                                >
                                  <DollarSign className="w-3 h-3" />
                                  <span>Tip USDC</span>
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Finalists */}
                  {quest.finalists.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-4 flex items-center">
                        <Trophy className="w-5 h-5 mr-2" />
                        Finalists
                      </h3>
                      <div className="space-y-4">
                        {quest.finalists.map((finalist, index) => (
                          <div
                            key={index}
                            className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h4 className="text-lg font-bold text-white">
                                  {finalist.name}
                                </h4>
                                <p className="text-yellow-400 font-semibold">
                                  {finalist.reward}
                                </p>
                              </div>
                              <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs font-medium">
                                Finalist
                              </span>
                            </div>
                            <p className="text-white/80 mb-3">
                              {finalist.project}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              <a
                                href={finalist.githubRepo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-white/60 hover:text-white transition-colors"
                              >
                                <Github className="w-4 h-4" />
                                <span>GitHub</span>
                              </a>
                              <a
                                href={finalist.videoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-white/60 hover:text-white transition-colors"
                              >
                                <Youtube className="w-4 h-4" />
                                <span>Video</span>
                              </a>
                              <a
                                href={finalist.twitterLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 text-white/60 hover:text-white transition-colors"
                              >
                                <Twitter className="w-4 h-4" />
                                <span>Twitter</span>
                              </a>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-white/60">
                                Submitted {formatDate(finalist.submissionDate)}
                              </span>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="number"
                                  value={tipAmount}
                                  onChange={(e) => setTipAmount(e.target.value)}
                                  className="w-20 px-2 py-1 bg-black/20 border border-white/30 rounded text-white text-sm"
                                  placeholder="1"
                                  min="0"
                                  step="0.01"
                                />
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleTipProject(finalist)}
                                  disabled={walletLoading}
                                  className="btn-secondary text-sm px-3 py-1 flex items-center space-x-1"
                                >
                                  <DollarSign className="w-3 h-3" />
                                  <span>Tip USDC</span>
                                </motion.button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quest Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card"
              >
                <h3 className="text-lg font-bold text-white mb-4">
                  Quest Details
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/60">Status:</span>
                    <span
                      className={`font-medium ${
                        quest.status === "active"
                          ? "text-green-400"
                          : quest.status === "upcoming"
                          ? "text-yellow-400"
                          : "text-blue-400"
                      }`}
                    >
                      {quest.status.charAt(0).toUpperCase() +
                        quest.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Prize Pool:</span>
                    <span className="font-medium text-base-blue-light">
                      {quest.prizePool}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Start Date:</span>
                    <span className="font-medium text-white">
                      {formatDate(quest.startDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">End Date:</span>
                    <span className="font-medium text-white">
                      {formatDate(quest.endDate)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Participants:</span>
                    <span className="font-medium text-white">
                      {quest.participants.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/60">Created by:</span>
                    <span className="font-medium text-white">
                      {quest.createdBy}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="card"
              >
                <h3 className="text-lg font-bold text-white mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  {quest.status === "active" && user ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-glow"
                    >
                      Submit Project
                    </motion.button>
                  ) : quest.status === "upcoming" ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-secondary"
                      disabled
                    >
                      Quest Not Started
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-secondary"
                    >
                      View Results
                    </motion.button>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-secondary"
                  >
                    Share Quest
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function QuestDetails({ params }: { params: { id: string } }) {
  return (
    <AuthProvider>
      <WalletProvider>
        <QuestDetailsPage questId={params.id} />
      </WalletProvider>
    </AuthProvider>
  );
}
