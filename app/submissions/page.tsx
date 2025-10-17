"use client";

import React from "react";
import { motion } from "framer-motion";
import { AuthProvider } from "../../contexts/AuthContext";
import { WalletProvider } from "../../contexts/WalletContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { Github, ExternalLink, Calendar, Clock } from "lucide-react";

function SubmissionsPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Please Login</h1>
          <p className="text-white/60">
            You need to be logged in to view your submissions.
          </p>
        </div>
      </div>
    );
  }

  // Mock submissions data
  const submissions = [
    {
      id: "1",
      questTitle: "Base Builder Quest 11",
      projectTitle: "My Amazing Base App",
      description:
        "A revolutionary application built on Base with no wallet pop-ups",
      githubLink: "https://github.com/user/amazing-base-app",
      demoVideoLink: "https://youtube.com/watch?v=demo",
      submissionDate: "2025-10-15T10:00:00Z",
      status: "pending",
    },
    {
      id: "2",
      questTitle: "Base Builder Quest 2",
      projectTitle: "Base Integration Tool",
      description: "A tool that integrates with the Base ecosystem",
      githubLink: "https://github.com/user/base-integration-tool",
      demoVideoLink: "https://youtube.com/watch?v=demo2",
      submissionDate: "2025-03-20T15:00:00Z",
      status: "approved",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold gradient-text mb-4">
              My Submissions
            </h1>
            <p className="text-white/60 text-lg">
              Track your Base Builder Quest submissions
            </p>
          </motion.div>

          {submissions.length > 0 ? (
            <div className="space-y-6">
              {submissions.map((submission, index) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {submission.projectTitle}
                      </h3>
                      <p className="text-white/60 text-sm">
                        {submission.questTitle}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        submission.status
                      )} mt-2 md:mt-0`}
                    >
                      {submission.status.charAt(0).toUpperCase() +
                        submission.status.slice(1)}
                    </span>
                  </div>

                  <p className="text-white/80 mb-4">{submission.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Submitted {formatDate(submission.submissionDate)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Status: {submission.status}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href={submission.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    {submission.demoVideoLink && (
                      <a
                        href={submission.demoVideoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all"
                      >
                        <span>📹</span>
                        <span>Demo Video</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No Submissions Yet
              </h3>
              <p className="text-white/60 mb-6">
                Start participating in Base Builder Quests to see your
                submissions here.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/quests"
                className="btn-glow inline-flex items-center space-x-2"
              >
                <span>Browse Quests</span>
              </motion.a>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function Submissions() {
  return (
    <AuthProvider>
      <WalletProvider>
        <SubmissionsPage />
      </WalletProvider>
    </AuthProvider>
  );
}
