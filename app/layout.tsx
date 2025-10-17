import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Base QuestHub",
  description:
    "Discover, participate, and win in Base Builder Quests. Build innovative applications on Base and earn rewards.",
  keywords: ["Base", "Quest", "Builder", "Ethereum", "L2", "Coinbase"],
  authors: [{ name: "Base Team" }],
  openGraph: {
    title: "Base QuestHub",
    description: "Discover, participate, and win in Base Builder Quests",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
