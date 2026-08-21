# Social Media Marketing & Automation Platform

A complete, production-ready SaaS platform for managing multiple social media accounts, creating content, automating publishing, and analyzing performance across all major social platforms.

## 🚀 Features

### Core Features
- **Multi-Account Management**: Connect and manage multiple accounts across Facebook, Instagram, TikTok, Twitter/X, LinkedIn, YouTube, and more
- **Unified Dashboard**: Real-time KPIs, analytics, and account health monitoring
- **Content Management System**: Post composer with multi-platform publishing, scheduling, and templates
- **Visual Content Calendar**: Day/week/month views with drag-and-drop scheduling
- **Social Automation Engine**: Workflow builder with triggers, conditions, delays, and actions
- **AI Marketing Studio**: AI-powered caption generation, hashtag suggestions, content ideas, and optimization
- **Unified Inbox**: Combine messages, comments, and mentions from all platforms
- **Campaign Manager**: Create, plan, schedule, and track multi-platform campaigns
- **Lead Management**: Lightweight CRM with lead capture, scoring, and pipeline
- **Advanced Analytics**: Cross-platform insights, engagement tracking, and custom reports
- **Team & Agency**: Multi-workspace support, roles, permissions, and approval workflows

### Premium Features
- Link Management with URL shortener and UTM builder
- Competitor monitoring and keyword tracking
- Media library with advanced organization
- AI Command Center for natural language task automation
- Notification system for important events
- Admin panel with system management

## 🛠 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - React charting library
- **Framer Motion** - Animation library
- **React DnD** - Drag and drop
- **Zustand** - State management
- **Next-Intl** - Internationalization (English/Arabic with RTL support)

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type-safe Node.js
- **PostgreSQL** - Primary database
- **Prisma** - ORM
- **Redis** - Caching and job queue
- **Bull** - Job processing
- **Socket.io** - Real-time updates
- **JWT** - Authentication

## 📁 Project Structure

```
social-media-platform/
├── web/                    # Frontend (Next.js)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── app/            # Next.js app directory
│   │   ├── hooks/          # Custom React hooks
│   │   ├── store/          # Zustand stores
│   │   ├── services/       # API services
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   ├── styles/         # Global styles
│   │   └── i18n/           # i18n configuration
│   ├── public/             # Static assets
│   └── package.json
├── api/                    # Backend (Express)
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── routes/         # API routes
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Express middleware
│   │   ├── utils/          # Utility functions
│   │   ├── integrations/   # Platform integrations
│   │   ├── jobs/           # Background jobs
│   │   └── index.ts        # Entry point
│   ├── prisma/             # Database schema
│   └── package.json
├── docs/                   # Documentation
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 13+
- Redis 6+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/M7md202/social-media-platform.git
cd social-media-platform
```

2. Install dependencies:
```bash
npm install
cd web && npm install
cd ../api && npm install
```

3. Set up environment variables:
```bash
cp api/.env.example api/.env
# Edit api/.env with your configuration
```

4. Set up the database:
```bash
cd api
npx prisma migrate dev --name init
```

5. Start development servers:
```bash
npm run dev
```

This will start both the frontend (http://localhost:3000) and backend (http://localhost:3001) servers.

## 📚 Documentation

See the [docs](./docs) directory for:
- [API Documentation](./docs/api.md)
- [Database Schema](./docs/schema.md)
- [Authentication Flow](./docs/auth.md)
- [Integration Guides](./docs/integrations.md)

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

## 📄 License

This project is proprietary and confidential.
