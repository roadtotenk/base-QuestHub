export interface QuestParticipant {
  name: string;
  project: string;
  reward: string;
  walletAddress: string;
  githubRepo: string;
  videoLink: string;
  twitterLink: string;
  twitterId: string;
  submissionDate: string;
  status: "winner" | "finalist" | "participant";
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  quest: string;
  month: string;
  prizePool: string;
  startDate: string;
  endDate: string;
  requirements: string[];
  winner: QuestParticipant[];
  finalists: QuestParticipant[];
  participants: QuestParticipant[];
  status: "active" | "upcoming" | "completed";
  createdBy: string;
  createdAt: string;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  walletAddress?: string;
}

export interface ProjectSubmission {
  id: string;
  questId: string;
  userId: string;
  projectTitle: string;
  description: string;
  githubLink: string;
  demoVideoLink?: string;
  submissionDate: string;
  status: "pending" | "approved" | "rejected";
}
