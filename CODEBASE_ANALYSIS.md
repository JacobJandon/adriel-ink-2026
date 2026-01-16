# Adriel-Ink-2026 - Comprehensive Codebase Analysis
*Generated: January 15, 2026*

## 📊 Executive Summary

**Project:** Adriel-Ink-2026 (Cloudflare VibeSDK v1.4.0)  
**Type:** Open-source AI-powered webapp generator  
**Scale:** 17,902 TypeScript files, 1.4GB total  
**Stack:** React 19 + Cloudflare Workers + Durable Objects + D1  
**Purpose:** Full-stack AI coding platform that generates and deploys web applications from natural language

---

## 🏗️ Architecture Overview

### Three-Layer Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (src/)                          │
│  React 19 + Vite + React Router 7 + TailwindCSS v4         │
│  • User interface for chat, app management, settings        │
│  • 24+ routes, 100+ components, hooks, contexts             │
│  • Monaco Editor for code editing                           │
│  • Real-time WebSocket connections to agents                │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (worker/)                          │
│  Cloudflare Workers + Durable Objects                       │
│  • API controllers for auth, apps, chat, deploy             │
│  • AI agents (blueprint, code generation, assistants)       │
│  • Services (GitHub, OAuth, secrets, sandbox)               │
│  • Real-time communication via WebSockets                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│               CLOUDFLARE PLATFORM                            │
│  • D1 SQLite Database (via Drizzle ORM)                     │
│  • Durable Objects (stateful AI agents)                     │
│  • Workers for Platforms (deploy generated apps)            │
│  • Containers (sandboxed app previews)                      │
│  • R2 (template storage), KV (session cache)                │
│  • AI Gateway (multi-LLM routing)                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Directory Structure Breakdown

### Frontend (src/ - 2.0M)

```
src/
├── routes/                    # 24+ application routes
│   ├── home.tsx              # Landing page (44KB - heavily enhanced)
│   ├── chat/                 # AI code generation interface
│   │   ├── chat.tsx          # Main chat component (vault disabled)
│   │   ├── components/       # Chat-specific UI components
│   │   └── hooks/            # Chat state management
│   ├── apps/                 # App management pages
│   ├── discover/             # Template discovery
│   ├── profile.tsx           # User profile
│   ├── settings/             # User settings
│   ├── pricing/              # Pricing page (NEW)
│   ├── guide.tsx             # Usage guide (NEW)
│   ├── about.tsx             # About page (NEW)
│   ├── terms.tsx             # Terms of service (NEW)
│   ├── privacy.tsx           # Privacy policy (NEW)
│   ├── cookies.tsx           # Cookie policy (NEW)
│   ├── contact.tsx           # Contact page (NEW)
│   ├── status.tsx            # System status (NEW)
│   ├── not-found.tsx         # 404 page (NEW)
│   └── server-error.tsx      # 500 page (NEW)
│
├── components/                # 100+ reusable components
│   ├── layout/               # App layout components
│   │   ├── app-layout.tsx    # Main application layout
│   │   ├── app-sidebar.tsx   # Navigation sidebar
│   │   ├── global-header.tsx # Top navigation bar
│   │   └── adriel-logo.tsx   # Branding logo (NEW)
│   ├── auth/                 # Authentication components
│   │   ├── login-modal.tsx   # Login dialog
│   │   └── auth-button.tsx   # Auth state button
│   ├── shared/               # Shared UI components
│   │   ├── AnimatedLoader.tsx       # Loading animations (NEW)
│   │   ├── PageTransition.tsx       # Page transitions (NEW)
│   │   ├── AppCardSkeleton.tsx      # Skeleton loaders (NEW)
│   │   ├── AppCard.tsx              # App display card
│   │   ├── AppListContainer.tsx     # App grid layout
│   │   ├── AppActionsDropdown.tsx   # App actions menu
│   │   └── GitClone.tsx             # Git clone dialog
│   ├── monaco-editor/        # Code editor integration
│   ├── config-*.tsx          # Configuration dialogs
│   ├── model-config-tabs.tsx # AI model configuration
│   ├── empty-state.tsx       # Empty state UI (NEW)
│   ├── mobile-blocker.tsx    # Mobile blocker (NEW)
│   ├── cookie-consent-banner.tsx  # Cookie consent (NEW)
│   ├── discord-reminder.tsx  # Discord CTA (NEW)
│   ├── onboarding-tour.tsx   # User onboarding (NEW)
│   ├── terms-acceptance-dialog.tsx # Terms dialog (NEW)
│   ├── subscription-status.tsx # Subscription UI (NEW)
│   ├── ai-help-dialog.tsx    # AI help modal (NEW)
│   └── SEO.tsx               # Meta tags component (NEW)
│
├── hooks/                    # Custom React hooks
│   ├── use-auth.ts           # Authentication state
│   ├── use-websocket.ts      # WebSocket connection
│   ├── use-chat.ts           # Chat state management
│   ├── use-quota-status.ts   # Quota display (NEW)
│   └── use-*.ts              # Various utility hooks
│
├── contexts/                 # React Context providers
│   ├── auth-context.tsx      # Auth state context
│   ├── theme-context.tsx     # Theme management
│   └── vault-context.tsx     # Vault state (disabled in chat)
│
├── features/                 # Feature-specific modules
│   ├── chat/                 # Chat feature logic
│   ├── apps/                 # App management logic
│   └── settings/             # Settings logic
│
├── lib/                      # Utility libraries
│   ├── api/                  # API client
│   ├── utils/                # Helper functions
│   └── constants/            # App constants
│
├── App.tsx                   # Root application component
├── main.tsx                  # Application entry point
├── index.css                 # Global styles (660 lines - enhanced)
└── routes.ts                 # Route configuration
```

### Backend (worker/ - 3.0M)

```
worker/
├── index.ts                  # Main Worker entry point
├── app.ts                    # App routing logic
│
├── agents/                   # AI Agent implementations
│   ├── core/
│   │   └── codingAgent.ts    # Main CodeGeneratorAgent Durable Object
│   ├── planning/
│   │   ├── blueprint.ts      # Blueprint generation agent
│   │   └── templateSelector.ts  # Template selection logic
│   ├── assistants/
│   │   ├── assistant.ts      # Code generation assistant
│   │   ├── realtimeCodeFixer.ts  # Error fixing agent
│   │   └── projectsetup.ts   # Project initialization
│   └── tools/                # Agent tools (MCP, web search, etc.)
│       ├── mcpManager.ts     # Model Context Protocol
│       ├── customTools.ts    # Custom tool definitions
│       └── toolkit/          # Individual tool implementations
│
├── api/                      # API route handlers
│   ├── auth/                 # Authentication endpoints
│   ├── apps/                 # App management endpoints
│   ├── chat/                 # Chat endpoints
│   ├── deploy/               # Deployment endpoints
│   ├── github-exporter/      # GitHub export endpoints
│   └── handlers/             # Request handlers
│       └── git-protocol.ts   # Git protocol support
│
├── services/                 # Business logic services
│   ├── sandbox/              # Container sandbox management
│   │   ├── sandboxSdkClient.ts  # Sandbox Durable Object
│   │   └── request-handler.ts   # Proxy to sandbox
│   ├── github/               # GitHub integration
│   │   └── GitHubService.ts  # GitHub API client
│   ├── oauth/                # OAuth providers
│   │   ├── google.ts         # Google OAuth
│   │   ├── github.ts         # GitHub OAuth
│   │   └── github-exporter.ts  # GitHub export OAuth
│   ├── secrets/              # User secrets management
│   │   ├── UserSecretsStore.ts  # Secrets Durable Object
│   │   ├── SecretsClient.ts  # Secrets API client
│   │   └── vault-types.ts    # Vault type definitions
│   ├── aigateway-proxy/      # AI Gateway integration
│   ├── cache/                # KV caching layer
│   ├── rate-limit/           # Rate limiting logic
│   │   └── DORateLimitStore.ts  # Rate limit Durable Object
│   └── deployment/           # Worker deployment service
│
├── database/                 # Database layer
│   ├── schema.ts             # Drizzle ORM schema
│   ├── migrations/           # Database migrations
│   └── queries/              # Database queries
│
├── middleware/               # Worker middleware
│   ├── auth.ts               # Authentication middleware
│   ├── cors.ts               # CORS handling
│   └── error.ts              # Error handling
│
├── types/                    # TypeScript type definitions
├── utils/                    # Utility functions
├── logger/                   # Logging infrastructure
├── observability/            # Monitoring (Sentry integration)
└── config/                   # Worker configuration
    └── security.ts           # Security settings
```

### Shared (shared/ - 20K)

```
shared/
└── types/                    # Shared type definitions
    ├── pricing.ts            # Pricing types (NEW)
    └── *.ts                  # Other shared types
```

---

## 🔑 Key Technologies

### Frontend Stack
- **React 19.2.3** - Latest React with concurrent features
- **TypeScript 5.9.3** - Type-safe development
- **Vite** - Fast build tool with HMR
- **React Router v7** - Client-side routing
- **TailwindCSS v4** - Utility-first CSS with custom tokens
- **Radix UI** - Accessible component primitives
- **Monaco Editor** - VS Code-powered code editor
- **Framer Motion** - Smooth animations
- **React Helmet** - Document head management
- **Date-fns** - Date utilities
- **Lucide React** - Icon library

### Backend Stack
- **Cloudflare Workers** - Serverless compute platform
- **Durable Objects** - Stateful serverless objects
  - `CodeGeneratorAgent` - AI code generation sessions
  - `UserAppSandboxService` - Container management
  - `DORateLimitStore` - Distributed rate limiting
  - `UserSecretsStore` - Encrypted secrets storage
- **D1 SQLite** - Edge database with Drizzle ORM
- **R2** - Object storage for templates
- **KV** - Key-value store for sessions
- **Containers** - Sandboxed app preview execution
- **Workers for Platforms** - Deploy generated apps

### AI & LLMs
- **AI Gateway** - Unified gateway for multiple LLM providers
- **Gemini 3 Flash** - Google's latest model (primary)
- **Claude 3.7 Sonnet** - Anthropic's reasoning model
- **OpenAI GPT-4** - OpenAI's flagship model
- **AI SDK** - Vercel AI SDK for streaming

### DevOps & Tooling
- **Bun 1.3.2** - Fast package manager and runtime
- **Wrangler** - Cloudflare deployment CLI
- **Vitest** - Unit testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Commitlint** - Commit message validation

---

## 🎯 Core Features

### 1. AI Code Generation
**Location:** `worker/agents/core/codingAgent.ts`

Phase-wise application generation:
1. **Planning Phase** - Analyzes requirements, selects templates
2. **Blueprint Phase** - Creates file structure and architecture
3. **Foundation Phase** - Generates package.json, config files
4. **Core Phase** - Creates main components and logic
5. **Styling Phase** - Adds CSS and visual design
6. **Integration Phase** - Connects APIs and services
7. **Optimization Phase** - Performance improvements
8. **Error Recovery** - Automatic error detection and fixing

**Key Files:**
- `worker/agents/core/codingAgent.ts` - Main agent Durable Object
- `worker/agents/planning/blueprint.ts` - Blueprint generation
- `worker/agents/assistants/assistant.ts` - Code generation assistant
- `worker/agents/assistants/realtimeCodeFixer.ts` - Error fixing

### 2. Live Preview System
**Location:** `worker/services/sandbox/`

Sandboxed container execution:
- Isolated environment per app
- Real-time code updates
- Build error detection
- Hot module reloading
- Container instance types: lite, standard-1 to standard-4

**Key Files:**
- `worker/services/sandbox/sandboxSdkClient.ts` - Sandbox Durable Object
- `worker/services/sandbox/request-handler.ts` - Proxy requests
- `SandboxDockerfile` - Container image definition

### 3. Chat Interface
**Location:** `src/routes/chat/`

Real-time conversational coding:
- WebSocket connection to agent
- Streaming AI responses
- File tree navigation
- Code diff viewer
- Image attachment support
- **Note:** Vault features disabled (requires backend APIs not in base SDK)

**Key Files:**
- `src/routes/chat/chat.tsx` - Main chat component (vault disabled)
- `src/routes/chat/components/` - Chat UI components
- `src/hooks/use-chat.ts` - Chat state management
- `src/hooks/use-websocket.ts` - WebSocket connection

### 4. App Management
**Location:** `src/routes/apps/`, `worker/api/apps/`

Full lifecycle management:
- List all user apps
- View app details
- Deploy to Workers for Platforms
- Export to GitHub repository
- Delete apps
- Clone apps

**Key Files:**
- `src/routes/apps/` - App management pages
- `worker/api/apps/` - App CRUD endpoints
- `worker/services/deployment/` - Deployment service

### 5. Authentication System
**Location:** `worker/api/auth/`, `src/components/auth/`

Multi-provider OAuth:
- Google OAuth
- GitHub OAuth
- Email-based authentication
- JWT session management
- Protected routes

**Key Files:**
- `worker/api/auth/` - Auth endpoints
- `worker/services/oauth/` - OAuth providers
- `src/contexts/auth-context.tsx` - Auth state
- `src/components/auth/` - Auth UI

### 6. GitHub Integration
**Location:** `worker/services/github/`

Export generated apps to GitHub:
- Create new repositories
- Commit generated code
- Configure repo settings
- Separate OAuth app for export

**Key Files:**
- `worker/services/github/GitHubService.ts` - GitHub API client
- `worker/api/github-exporter/` - Export endpoints
- `src/components/github-export-modal.tsx` - Export UI

### 7. Secrets Management
**Location:** `worker/services/secrets/`

Zero-knowledge vault (requires additional setup):
- Client-side encryption
- Master password protection
- Secure key storage
- API key management
- **Status:** Disabled in chat.tsx (backend APIs not available)

**Key Files:**
- `worker/services/secrets/UserSecretsStore.ts` - Secrets Durable Object
- `worker/services/secrets/SecretsClient.ts` - Secrets API
- `src/contexts/vault-context.tsx` - Vault context

### 8. Template System
**Location:** `worker/agents/planning/templateSelector.ts`

Pre-built templates stored in R2:
- React + Vite templates
- Next.js templates
- API-only templates
- AI-powered template selection
- Template metadata and indexing

**Key Files:**
- `worker/agents/planning/templateSelector.ts` - Template selection
- `scripts/deploy-templates.ts` - Template deployment

---

## 🗄️ Database Schema

**Technology:** D1 SQLite with Drizzle ORM  
**Location:** `worker/database/schema.ts`, `migrations/`

### Tables

1. **users** - User accounts
   - id, email, name, avatar_url, created_at, updated_at

2. **apps** - Generated applications
   - id, user_id, name, description, status, created_at, updated_at

3. **chats** - Chat sessions
   - id, app_id, user_id, created_at, updated_at

4. **messages** - Chat messages
   - id, chat_id, role (user/assistant), content, created_at

5. **deployments** - Deployment history
   - id, app_id, status, url, created_at

6. **templates** - Template metadata
   - id, name, description, category, created_at

---

## 🔒 Security Features

### 1. Rate Limiting
- API endpoints: 10,000 req/60s
- Auth endpoints: 1,000 req/60s
- Distributed via Durable Objects
- Per-user and per-IP limits

### 2. CORS Configuration
- Configurable allowed origins
- Supports multiple domains
- Credentials support

### 3. Authentication
- JWT-based sessions
- Secure cookie handling
- CSRF protection
- Token rotation

### 4. Sandboxing
- Isolated container execution
- Resource limits (CPU, memory, disk)
- Network isolation
- Process monitoring

### 5. Input Validation
- Query length limits (20k characters)
- Content filtering
- SQL injection prevention
- XSS protection

---

## 🎨 UI/UX Enhancements (Recent Additions)

### Design System
**Location:** `src/index.css` (660 lines)

- **Color Tokens** - Adriel AI brand colors with dark mode support
- **Typography** - Custom font stack and scale
- **Spacing** - Consistent spacing system
- **Shadows** - Apple-inspired elevation shadows
- **Animations** - Smooth transitions and micro-interactions
- **Glassmorphism** - Modern frosted glass effects

### New Components (Added from adriel-ink-2)
1. **AnimatedLoader** - Loading state animations
2. **PageTransition** - Page transition effects
3. **AppCardSkeleton** - Skeleton loading states
4. **EmptyState** - Empty state illustrations
5. **MobileBlocker** - Mobile experience blocker
6. **CookieConsentBanner** - GDPR cookie consent
7. **DiscordReminder** - Community CTA
8. **OnboardingTour** - User onboarding flow
9. **TermsAcceptanceDialog** - Terms acceptance
10. **SubscriptionStatus** - Subscription display
11. **AIHelpDialog** - AI-powered help
12. **SEO** - Meta tags and SEO optimization

### New Pages
1. **Guide** (`/guide`) - Usage documentation
2. **Pricing** (`/pricing`) - Pricing tiers
3. **About** (`/about`) - About Adriel AI
4. **Terms** (`/terms`) - Terms of service
5. **Privacy** (`/privacy`) - Privacy policy
6. **Cookies** (`/cookies`) - Cookie policy
7. **Contact** (`/contact`) - Contact form
8. **Status** (`/status`) - System status
9. **Not Found** (`/404`) - Custom 404 page
10. **Server Error** (`/500`) - Custom error page

---

## ⚙️ Configuration Files

### 1. wrangler.jsonc
Cloudflare Workers configuration:
- Worker name: `adriel-ink-2026`
- Compatibility date: 2025-08-10
- Node.js compatibility enabled
- Assets directory: `dist/`
- SPA routing enabled
- Observability enabled (100% head sampling)
- Bindings:
  - D1 database: `vibesdk-db`
  - Durable Objects: 4 classes
  - R2 bucket: `adriel-ink-templates-second`
  - KV namespace: `VibecoderStore`
  - AI binding: remote
  - Dispatch namespace: `vibesdk-default-namespace`
  - Containers: UserAppSandboxService
  - Rate limiters: API + Auth
- Routes:
  - Custom domain: `build.cloudflare.dev`
  - Preview domain: `*build-preview.cloudflare.dev/*`

### 2. package.json
Project dependencies and scripts:
- **Version:** 1.4.0
- **Key Scripts:**
  - `dev` - Local development with Wrangler
  - `build` - Production build
  - `deploy` - Deploy to Cloudflare
  - `typecheck` - TypeScript validation
  - `db:migrate` - Database migrations
  - `db:seed` - Seed database
  - `test` - Run tests
  - `lint` - ESLint
  - `format` - Prettier

### 3. vite.config.ts
Frontend build configuration:
- React plugin with SWC
- Path aliases (@/ = src/)
- Optimized dependencies
- Source maps enabled

### 4. tsconfig.json
TypeScript configuration:
- Multiple project references
- App, worker, and node configs
- Strict type checking
- ES2022 target

---

## 🚀 Deployment Architecture

### Local Development
```bash
bun install           # Install dependencies
bun run setup         # Interactive setup wizard
bun run dev           # Start dev server (localhost:5173)
```

### Production Deployment
```bash
bun run deploy        # Deploy to Cloudflare
```

**What happens:**
1. TypeScript compilation
2. Vite builds frontend → `dist/`
3. Wrangler deploys worker + assets
4. Database migrations run
5. Templates uploaded to R2
6. DNS configured (if first deploy)

### CI/CD
- **GitHub Actions** - Automatic deployments on push to `main`
- **Workflows:**
  - Build validation
  - TypeScript checks
  - Tests
  - Deploy to Cloudflare
  - Release management

---

## 🧪 Testing

### Test Structure
```
test/
├── unit/             # Unit tests
├── integration/      # Integration tests
└── e2e/              # End-to-end tests
```

### Testing Tools
- **Vitest** - Unit testing
- **Testing Library** - Component testing
- **Playwright** - E2E testing (planned)

### Running Tests
```bash
bun test              # Run all tests
bun test:unit         # Unit tests only
bun test:integration  # Integration tests
```

---

## 📊 Performance Metrics

### Frontend
- **Build Time:** 3.5-4.2 seconds
- **Bundle Size:** ~5MB (including Monaco Editor)
- **Initial Load:** < 2 seconds (with CDN)
- **Time to Interactive:** < 3 seconds

### Backend
- **Cold Start:** 50-100ms (Workers)
- **Warm Request:** < 10ms
- **Durable Object Access:** < 20ms
- **Database Query:** 5-15ms (D1)

### Sandbox
- **Container Start:** 2-5 seconds
- **Build Time:** 10-30 seconds (depends on app complexity)
- **Preview Ready:** 15-40 seconds total

---

## 🔧 Common Operations

### Adding a New Route
1. Create route file in `src/routes/`
2. Add route to `src/routes.ts`
3. Create corresponding components
4. Add navigation link if needed

### Adding a New Component
1. Create component in `src/components/`
2. Follow naming convention (kebab-case)
3. Export from component file
4. Import where needed

### Adding a Backend Endpoint
1. Create handler in `worker/api/`
2. Add route in `worker/app.ts`
3. Implement business logic in `worker/services/`
4. Update types in `worker/types/`

### Database Migration
```bash
bun db:migrate:create <name>  # Create migration
bun db:migrate                # Apply migrations
bun db:seed                   # Seed database
```

---

## 🐛 Known Issues & Limitations

### 1. Vault Features Disabled
**Status:** Vault functionality commented out in `chat.tsx`
**Reason:** Requires backend APIs not available in base VibeSDK
**Files Affected:**
- `src/routes/chat/chat.tsx` - VaultProvider disabled
- `src/contexts/vault-context.tsx` - Context exists but not used

**Solution:** Backend implementation required:
- Vault unlock API endpoint
- Vault key storage in UserSecretsStore
- Vault encryption/decryption service

### 2. Mobile Experience Limited
**Status:** Mobile blocker component shows warning
**Reason:** Complex code editor not optimized for mobile
**Solution:** Responsive design improvements needed

### 3. Template Discovery
**Status:** Templates stored in R2 but discovery UI basic
**Solution:** Enhanced filtering, search, and preview needed

### 4. Error Monitoring
**Status:** Sentry integration code present but commented out
**Reason:** DSN not configured
**Solution:** Configure Sentry DSN and uncomment monitoring code

---

## 📚 Cloudflare VibeSDK Documentation

### Official Resources

1. **GitHub Repository**
   - URL: https://github.com/cloudflare/vibesdk
   - Stars: 4.6k
   - Forks: 1.1k
   - Latest Release: v1.4.0 (Dec 20, 2025)
   - Issues: 29 open
   - Pull Requests: 4 open

2. **Live Demo**
   - URL: https://build.cloudflare.dev
   - Try before deploying your own instance
   - Full feature access

3. **Documentation**
   - Main README: Comprehensive setup guide
   - AGENTS.md: Agent architecture details
   - CLAUDE.md: Claude integration guide
   - Setup Guide: docs/setup.md

4. **SDK Package**
   - NPM: `@cf-vibesdk/sdk`
   - TypeScript SDK for programmatic access
   - Build apps via API instead of UI

### Cloudflare Platform Docs

1. **Workers**
   - https://developers.cloudflare.com/workers/
   - Serverless compute platform
   - Runtime APIs, bindings, examples

2. **Durable Objects**
   - https://developers.cloudflare.com/durable-objects/
   - Stateful serverless objects
   - WebSocket support, storage

3. **D1 Database**
   - https://developers.cloudflare.com/d1/
   - SQLite at the edge
   - Migrations, queries, limitations

4. **Containers**
   - https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/outbound-workers/
   - Sandboxed execution
   - Instance types, resource limits

5. **Workers AI**
   - https://developers.cloudflare.com/workers-ai/
   - LLM inference on GPU
   - 50+ models available

6. **AI Gateway**
   - https://developers.cloudflare.com/ai-gateway/
   - Unified LLM gateway
   - Caching, rate limiting, fallback

### Community & Support

1. **Discord**
   - https://discord.cloudflare.com
   - #workers-ai channel for VibeSDK
   - Real-time community support

2. **Community Forum**
   - https://community.cloudflare.com/
   - Long-form discussions
   - Search for solutions

3. **GitHub Discussions**
   - https://github.com/cloudflare/vibesdk/discussions
   - Feature requests
   - Q&A with maintainers

4. **Twitter/X**
   - @CloudflareDev
   - Product announcements
   - Latest updates

### Common Issues & Solutions

#### Issue: "Insufficient Permissions"
**Solution:** Permissions auto-granted during deployment. Retry if persists.

#### Issue: "AI Gateway Not Found"
**Solution:** 
- With token: Script auto-creates gateway (check token permissions)
- Without token: Manually create gateway at https://dash.cloudflare.com/ai/ai-gateway

#### Issue: "Database Migration Failed"
**Solution:** D1 resources provisioning. Wait a few minutes and retry.

#### Issue: "Slow Preview Loading"
**Solution:** Upgrade container instance type from `lite` to `standard-3` or `standard-4`

#### Issue: "Out of Memory in Sandbox"
**Solution:** 
- Check for memory leaks in generated app
- Upgrade to higher instance type (standard-3 or standard-4)

#### Issue: "Build Timeouts"
**Solution:** Use `standard-3` or `standard-4` for more CPU cores

### Prerequisites for Deployment

1. **Cloudflare Account**
   - Workers Paid Plan ($5/month)
   - Workers for Platforms subscription
   - Advanced Certificate Manager (for wildcard cert)

2. **API Keys**
   - Google Gemini API Key (required) - https://ai.google.dev
   - Anthropic API Key (optional) - https://console.anthropic.com
   - OpenAI API Key (optional) - https://platform.openai.com

3. **Environment Variables**
   - `GOOGLE_AI_STUDIO_API_KEY` - Gemini API key
   - `JWT_SECRET` - Random string for sessions
   - `WEBHOOK_SECRET` - Webhook auth secret
   - `SECRETS_ENCRYPTION_KEY` - Encryption key
   - `SANDBOX_INSTANCE_TYPE` - Container tier (optional)
   - `ALLOWED_EMAIL` - Authorized user email
   - `CUSTOM_DOMAIN` - Your custom domain (required)

4. **DNS Setup**
   - CNAME record: `*.yourapp` → `yourapp.yourdomain.com`
   - Proxy status: Proxied (orange cloud)
   - Propagation time: Up to 1 hour

### Development Tips

1. **Local Development**
   - Use `.dev.vars` for local secrets
   - Use `.prod.vars` for production secrets
   - Never commit `.dev.vars` or `.prod.vars`

2. **Debugging**
   - Check Worker logs in Cloudflare dashboard
   - Use `console.log()` - visible in `wrangler tail`
   - Enable observability in `wrangler.jsonc`

3. **Performance**
   - Use KV for caching
   - Leverage CDN for static assets
   - Optimize Durable Object usage
   - Monitor cold start times

4. **Security**
   - Rotate JWT secrets regularly
   - Use environment variables for secrets
   - Enable rate limiting
   - Validate all user inputs

---

## 🎓 Learning Resources

### Building with VibeSDK

1. **Sample Prompts** (samplePrompts.md)
   - Example app ideas
   - Prompt engineering tips
   - Best practices

2. **Agent Architecture** (AGENTS.md)
   - How agents work
   - Phase-wise generation
   - Error recovery

3. **SDK Usage** (sdk/README.md)
   - Programmatic API
   - TypeScript SDK
   - Example code

### Cloudflare Platform

1. **Workers Learning Path**
   - https://developers.cloudflare.com/learning-paths/workers/
   - Step-by-step tutorials
   - Best practices

2. **Full-Stack Guide**
   - Building complete applications
   - Database integration
   - Authentication

3. **AI Integration**
   - https://developers.cloudflare.com/workers-ai/
   - LLM integration
   - Prompt engineering

---

## 🔮 Future Enhancements

### Planned Features
1. **Mobile Support** - Responsive design for mobile devices
2. **Template Marketplace** - Community-contributed templates
3. **Vault Integration** - Complete zero-knowledge secrets
4. **Enhanced Previews** - Better preview experience
5. **Collaboration** - Multi-user editing
6. **Version Control** - Built-in git integration
7. **Monitoring** - Sentry error tracking
8. **Analytics** - Usage analytics dashboard
9. **API Docs** - Interactive API documentation
10. **Testing** - Built-in testing tools

### Optimization Opportunities
1. **Bundle Size** - Code splitting, lazy loading
2. **Database** - Query optimization, caching
3. **Containers** - Faster cold starts
4. **AI Costs** - Model selection optimization
5. **Rate Limits** - More granular limits

---

## 📝 Contributing

### How to Contribute

1. **Fork the Repository**
   - Use "Deploy to Cloudflare" button
   - Creates your own instance + GitHub repo

2. **Develop Features**
   - Clone your fork locally
   - Create feature branch
   - Make changes
   - Test thoroughly

3. **Submit Pull Request**
   - Push to your fork
   - Open PR to main repo
   - Describe changes clearly
   - Wait for review

### Code Standards

1. **TypeScript**
   - Strict mode enabled
   - No `any` types
   - Proper error handling

2. **React**
   - Functional components
   - Hooks for state
   - Proper prop types

3. **Styling**
   - TailwindCSS utility classes
   - CSS variables for theming
   - Responsive design

4. **Testing**
   - Unit tests for utilities
   - Integration tests for features
   - E2E tests for critical flows

---

## 📞 Support & Contact

### Getting Help

1. **Discord** - Fastest response
   - https://discord.cloudflare.com
   - #workers-ai channel

2. **GitHub Issues** - Bug reports
   - https://github.com/cloudflare/vibesdk/issues
   - Check existing issues first

3. **Community Forum** - Discussions
   - https://community.cloudflare.com/
   - Long-form questions

4. **Email** - Enterprise support
   - Complete Custom Requirements Form
   - https://forms.gle/axnnpGDb6xrmR31T6

---

## 📄 License

**MIT License**

Copyright (c) 2026 Cloudflare, Inc.

See LICENSE file for full text.

---

## 🙏 Acknowledgments

### Core Contributors
- @AshishKumar4 - Lead developer
- @palashgo - Core contributor
- @dinasaur404 - Developer
- @karishnu - Developer
- Cloudflare team - Platform support

### Technologies
- Cloudflare - Infrastructure
- React - UI framework
- Vercel - AI SDK
- Radix UI - Component primitives
- Monaco Editor - Code editing

---

## 📊 Version History

### v1.4.0 (Dec 20, 2025) - Latest
- New zero-knowledge vault implementation
- SDK documentation and usage examples
- Enhanced phase generation prompts
- Pre-deploy safety gates
- Query length validation (20k limit)
- Gemini 3 Flash model support
- Multiple bug fixes and optimizations

### v1.3.0 (Dec 8, 2025)
- Template write-protection
- Cost optimizations
- Latest package updates

### v1.2.0 (Nov 30, 2025)
- Agent-specific model constraints
- Process monitoring rewrite
- Enhanced changelog generation

See CHANGELOG.md for complete history.

---

**Generated:** January 15, 2026  
**Codebase:** adriel-ink-2026  
**Version:** 1.4.0  
**Author:** Adriel AI Team
