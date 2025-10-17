# Base QuestHub

A beautiful, modern, and interactive web app inspired by Base's official color scheme and style. Base QuestHub serves as a dedicated platform for Base Builder Quests, providing a centralized hub for quest discovery, project submission, and community engagement.


video1:
https://drive.google.com/file/d/1SP7LPBaD543OZVF7bUb7SttagT-qYKFo/view?usp=sharing

## 🎯 Why Base QuestHub?

Currently, Base Builder Quests are primarily hosted and announced on Twitter, which creates several limitations:

- **Fragmented Information**: Quest details, requirements, and updates are scattered across multiple tweets
- **Poor Discovery**: Hard to find past quests, winners, and project submissions
- **Limited Interaction**: No dedicated space for project showcases and community feedback
- **No Direct Tipping**: Users can't easily tip projects they like
- **Admin Challenges**: Difficult to manage quests, submissions, and winners effectively

### 🚀 Benefits of a Dedicated Platform

**For Quest Participants:**
- **Centralized Discovery**: Browse all quests, active and completed, in one place
- **Easy Submission**: Submit projects with GitHub links, demos, and descriptions
- **Track Progress**: Monitor submission status and quest deadlines
- **Community Recognition**: Showcase your work to the Base ecosystem

**For Quest Admins:**
- **Streamlined Management**: Create, update, and manage quests efficiently
- **Winner Showcase**: Highlight winners and finalists with project details
- **Analytics**: Track participation, submissions, and engagement metrics
- **Professional Presentation**: Present quests in a polished, organized manner

**For the Community:**
- **Project Discovery**: Explore innovative projects built on Base
- **Direct Support**: Tip projects you like using Coinbase Wallet with USDC
- **Learning Resource**: Study winning projects and learn from the community
- **Ecosystem Growth**: Foster collaboration and innovation in the Base ecosystem

**For Base Ecosystem:**
- **Professional Image**: Present Base Builder Quests as a serious development program
- **Better Onboarding**: Help new developers discover and participate in quests
- **Community Building**: Create a dedicated space for Base builders to connect
- **Ecosystem Showcase**: Highlight the amazing projects being built on Base

## 🌟 Features

### For Users

- **Browse Quests**: View active, upcoming, and completed Base Builder Quests
- **Quest Details**: Comprehensive quest information with requirements and timeline
- **Project Submission**: Submit projects with GitHub links and demo videos
- **Wallet Integration**: Connect Coinbase Wallet and tip projects with USDC
- **Track Submissions**: View your submission history and status

### For Admins

- **Quest Management**: Create new quests with custom requirements
- **Winner Management**: Add winners and finalists to completed quests
- **Status Control**: Mark quests as active, upcoming, or completed
- **Analytics**: View quest statistics and participation metrics

### Design & UX

- **Base-Inspired Design**: Dark theme with blue gradients and white typography
- **Smooth Animations**: Framer Motion animations and hover effects
- **Responsive Layout**: Works perfectly on desktop and mobile
- **Interactive Cards**: Animated quest cards with tilt and shadow effects
- **Modern UI**: Glass morphism effects and premium styling

## 🚀 Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Base Account SDK** - Wallet integration and USDC transfers
- **Lucide React** - Beautiful icons
- **Viem** - Ethereum library for blockchain interactions

## 🎨 Design System

The app uses Base's official color scheme:

- **Primary Blue**: #0052ff
- **Dark Blue**: #001a66
- **Light Blue**: #0066ff
- **Gradients**: Blue-to-dark-blue backgrounds
- **Typography**: Inter font family
- **Effects**: Glass morphism, glows, and smooth transitions

## 🔐 Authentication

Simple mock authentication system with role-based access:

- **Admin Account**: `admin@base.org` (any password)
- **User Account**: `builder@example.com` (any password)

## 💰 Wallet Integration & Community Tipping

Base QuestHub integrates Coinbase Wallet with Base Account SDK to enable seamless community support:

- **Coinbase Wallet**: Connect using Base Account SDK for secure transactions
- **Sub Accounts**: Automatic sub account creation for enhanced security
- **USDC Tipping**: Send USDC directly to project creators you admire
- **Auto Spend Permissions**: Seamless transactions without repeated wallet approvals
- **Community Support**: Enable the community to financially support innovative projects
- **Project Recognition**: Reward builders for their contributions to the Base ecosystem

### How Tipping Works:
1. **Connect Wallet**: Users connect their Coinbase Wallet
2. **Browse Projects**: Explore winning projects and submissions
3. **Tip Creators**: Send USDC directly to project creators
4. **Support Innovation**: Help fund continued development of Base projects

## 📱 Pages

1. **Homepage** (`/`) - Hero section, active quests, recent winners
2. **Quests** (`/quests`) - Filterable quest listing
3. **Quest Details** (`/quest/[id]`) - Detailed quest view with submission form
4. **Login** (`/login`) - Authentication page
5. **Submissions** (`/submissions`) - User's submission history
6. **Admin Panel** (`/admin`) - Quest management (admin only)

## 🛠️ Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Run Development Server**

   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to `http://localhost:3000`

## 🎯 Key Components

- **Navbar**: Responsive navigation with wallet connection
- **QuestCard**: Animated quest display cards
- **LoginForm**: Authentication form with demo accounts
- **Footer**: Base branding and links
- **AuthContext**: User authentication and role management
- **WalletContext**: Wallet connection and USDC transfers

## 🔧 Configuration

The app is configured for Base Sepolia testnet:

- **USDC Contract**: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
- **Recipient Address**: `0xd8da6bf26964af9d7eed9e03e53415d37aa96045`

## 📊 Quest Data

The app includes sample quest data from Base Builder Quests 2, 4, and 11, featuring:

- Real project submissions
- Winner and finalist information
- GitHub repositories and demo videos
- Prize distributions and timelines

## 🎨 Animations

- **Page Transitions**: Smooth fade-in animations
- **Card Hover**: Tilt and shadow effects
- **Button Interactions**: Scale and glow animations
- **Loading States**: Skeleton animations
- **Scroll Animations**: Reveal on scroll effects

## 🚀 Future Vision

Base QuestHub aims to become the **definitive platform** for Base Builder Quests, evolving beyond Twitter-based quest management to a comprehensive ecosystem:

### Phase 1: Foundation (Current)
- ✅ Dedicated quest hosting and management
- ✅ Project submission and showcase system
- ✅ Community tipping with USDC
- ✅ Winner and finalist recognition

### Phase 2: Enhanced Features
- 🔄 Real-time quest notifications
- 🔄 Advanced project filtering and search
- 🔄 Community voting and feedback system
- 🔄 Integration with Base's official quest announcements

### Phase 3: Ecosystem Integration
- 🔄 Direct integration with Base's quest management system
- 🔄 Automated winner verification and reward distribution
- 🔄 Advanced analytics and insights dashboard
- 🔄 Mobile app for quest participation

### Phase 4: Community Platform
- 🔄 Developer profiles and portfolios
- 🔄 Mentorship and collaboration features
- 🔄 Educational resources and tutorials
- 🔄 Base ecosystem project showcase

## 🌐 Deployment

The app is ready for deployment on platforms like:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Base L2** (for full decentralization)

## 🤝 Contributing

This is a demo application showcasing Base's design system and wallet integration. Feel free to fork and customize for your own Base Builder Quest platform.

## 📄 License

MIT License - feel free to use this code for your own projects.

---

**Powered by Base Builder Quests ⚡**

Built with ❤️ for the Base ecosystem
