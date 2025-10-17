"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Trophy, Users, ExternalLink } from "lucide-react";
import { Quest } from "../types";

interface QuestCardProps {
  quest: Quest;
  index: number;
}

export default function QuestCard({ quest, index }: QuestCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "upcoming":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "completed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="card card-hover group cursor-pointer"
    >
      <Link href={`/quest/${quest.id}`}>
        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white group-hover:text-base-blue-light transition-colors">
                {quest.title}
              </h3>
              <p className="text-white-70 text-sm mt-1 font-medium">
                {quest.month}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                quest.status
              )}`}
            >
              {quest.status.charAt(0).toUpperCase() + quest.status.slice(1)}
            </span>
          </div>

          {/* Description */}
          <p className="text-white-80 text-sm line-clamp-2 leading-relaxed">
            {quest.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-white-70">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Trophy className="w-4 h-4" />
                <span>{quest.prizePool}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{quest.participants.length} participants</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(quest.endDate)}</span>
            </div>
          </div>

          {/* Requirements preview */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/80">Requirements:</h4>
            <div className="flex flex-wrap gap-2">
              {quest.requirements.slice(0, 2).map((req, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-white/5 rounded text-xs text-white/60"
                >
                  {req.length > 30 ? `${req.substring(0, 30)}...` : req}
                </span>
              ))}
              {quest.requirements.length > 2 && (
                <span className="px-2 py-1 bg-white/5 rounded text-xs text-white/60">
                  +{quest.requirements.length - 2} more
                </span>
              )}
            </div>
          </div>

          {/* Winners preview for completed quests */}
          {quest.status === "completed" && quest.winner.length > 0 && (
            <div className="pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-400 font-medium">
                  🏆 Winner: {quest.winner[0].name}
                </span>
                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/60 transition-colors" />
              </div>
            </div>
          )}

          {/* Action button */}
          <div className="pt-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-full btn-secondary text-center"
            >
              {quest.status === "active"
                ? "Submit Project"
                : quest.status === "upcoming"
                ? "View Details"
                : "View Results"}
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
