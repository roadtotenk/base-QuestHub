"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AuthProvider } from "../../contexts/AuthContext";
import { WalletProvider } from "../../contexts/WalletContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

function AdminPanel() {
  const { user } = useAuth();
  const [isCreatingQuest, setIsCreatingQuest] = useState(false);
  const [newQuest, setNewQuest] = useState({
    title: "",
    description: "",
    prizePool: "",
    startDate: "",
    endDate: "",
    requirements: [""],
  });

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-white/60">
            You need admin privileges to access this page.
          </p>
        </div>
      </div>
    );
  }

  const handleCreateQuest = () => {
    // In a real app, this would save to a database
    alert("Quest created successfully! (This is a demo)");
    setIsCreatingQuest(false);
    setNewQuest({
      title: "",
      description: "",
      prizePool: "",
      startDate: "",
      endDate: "",
      requirements: [""],
    });
  };

  const addRequirement = () => {
    setNewQuest({
      ...newQuest,
      requirements: [...newQuest.requirements, ""],
    });
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...newQuest.requirements];
    newRequirements[index] = value;
    setNewQuest({
      ...newQuest,
      requirements: newRequirements,
    });
  };

  const removeRequirement = (index: number) => {
    const newRequirements = newQuest.requirements.filter((_, i) => i !== index);
    setNewQuest({
      ...newQuest,
      requirements: newRequirements,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">
                Admin Panel
              </h1>
              <p className="text-white/60">Manage Base Builder Quests</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreatingQuest(true)}
              className="btn-glow flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Quest</span>
            </motion.button>
          </motion.div>

          {/* Create Quest Modal */}
          {isCreatingQuest && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Create New Quest
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCreatingQuest(false)}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateQuest();
                  }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Quest Title
                    </label>
                    <input
                      type="text"
                      value={newQuest.title}
                      onChange={(e) =>
                        setNewQuest({ ...newQuest, title: e.target.value })
                      }
                      className="input-field"
                      placeholder="Base Builder Quest X"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newQuest.description}
                      onChange={(e) =>
                        setNewQuest({
                          ...newQuest,
                          description: e.target.value,
                        })
                      }
                      className="input-field h-24 resize-none"
                      placeholder="Describe what builders need to build..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Prize Pool
                      </label>
                      <input
                        type="text"
                        value={newQuest.prizePool}
                        onChange={(e) =>
                          setNewQuest({
                            ...newQuest,
                            prizePool: e.target.value,
                          })
                        }
                        className="input-field"
                        placeholder="2 ETH"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Month
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="November 2025"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={newQuest.startDate}
                        onChange={(e) =>
                          setNewQuest({
                            ...newQuest,
                            startDate: e.target.value,
                          })
                        }
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={newQuest.endDate}
                        onChange={(e) =>
                          setNewQuest({ ...newQuest, endDate: e.target.value })
                        }
                        className="input-field"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Requirements
                    </label>
                    <div className="space-y-2">
                      {newQuest.requirements.map((req, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="text"
                            value={req}
                            onChange={(e) =>
                              updateRequirement(index, e.target.value)
                            }
                            className="input-field flex-1"
                            placeholder="Enter requirement..."
                            required
                          />
                          {newQuest.requirements.length > 1 && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              onClick={() => removeRequirement(index)}
                              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          )}
                        </div>
                      ))}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={addRequirement}
                        className="btn-secondary text-sm flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Requirement</span>
                      </motion.button>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setIsCreatingQuest(false)}
                      className="btn-secondary"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="btn-glow flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Create Quest</span>
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}

          {/* Quest Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Quest Management
            </h2>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛠️</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Quest Management
              </h3>
              <p className="text-white/60 mb-6">
                Manage existing quests, add winners, and mark quests as
                completed.
              </p>
              <div className="text-sm text-white/40">
                <p>• Edit quest details and requirements</p>
                <p>• Add winners and finalists</p>
                <p>• Mark quests as active, upcoming, or completed</p>
                <p>• View submission analytics</p>
              </div>
            </div>
          </motion.div>

          {/* Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8"
          >
            <div className="card text-center">
              <div className="text-3xl font-bold text-base-blue-light mb-2">
                3
              </div>
              <div className="text-white/60">Total Quests</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-base-blue-light mb-2">
                1
              </div>
              <div className="text-white/60">Active Quests</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-base-blue-light mb-2">
                15
              </div>
              <div className="text-white/60">Total Submissions</div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function Admin() {
  return (
    <AuthProvider>
      <WalletProvider>
        <AdminPanel />
      </WalletProvider>
    </AuthProvider>
  );
}
