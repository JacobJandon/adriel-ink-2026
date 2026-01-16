# Adriel-Ink-2026 Quick Reference Guide

## 📁 Where to Find Things

### Frontend Components
```
src/components/
├── layout/           → Navigation, layout, branding
├── auth/             → Login, auth buttons
├── shared/           → Reusable UI components
├── monaco-editor/    → Code editor
└── *.tsx             → Feature-specific components
```

### Pages/Routes
```
src/routes/
├── home.tsx          → Landing page
├── chat/             → AI code generation
├── apps/             → App management
├── profile.tsx       → User profile
├── settings/         → User settings
├── pricing/          → Pricing page
├── guide.tsx         → Usage guide
└── [others].tsx      → Legal, info pages
```

### Backend API
```
worker/api/
├── auth/             → Authentication endpoints
├── apps/             → App CRUD operations
├── chat/             → Chat endpoints
├── deploy/           → Deployment endpoints
└── github-exporter/  → GitHub export
```

### AI Agents
```
worker/agents/
├── core/codingAgent.ts           → Main AI agent
├── planning/blueprint.ts         → Blueprint generation
├── assistants/assistant.ts       → Code generation
└── assistants/realtimeCodeFixer.ts → Error fixing
```

### Services
```
worker/services/
├── sandbox/          → Container management
├── github/           → GitHub integration
├── oauth/            → OAuth providers
├── secrets/          → Secrets storage
└── deployment/       → Worker deployment
```

---

## 🚀 Common Commands

### Development
```bash
bun install                  # Install dependencies
bun run setup               # Interactive setup wizard
bun run dev                 # Start dev server (localhost:5173)
bun run build               # Build for production
bun run deploy              # Deploy to Cloudflare
```

### Database
```bash
bun db:migrate:create <name>  # Create new migration
bun db:migrate                # Apply migrations
bun db:migrate:remote         # Migrate production DB
bun db:seed                   # Seed database
```

### Testing
```bash
bun test                    # Run all tests
bun test:unit              # Unit tests only
bun test:integration       # Integration tests
bun typecheck              # TypeScript validation
```

### Code Quality
```bash
bun lint                   # Run ESLint
bun lint:fix              # Fix lint issues
bun format                # Run Prettier
```

---

## 🔑 Key Cloudflare Concepts

### Workers
Serverless functions that run on Cloudflare's edge network.
- **File:** `worker/index.ts`
- **Config:** `wrangler.jsonc`
- **Deploy:** `bun run deploy`

### Durable Objects
Stateful serverless objects with persistent storage.
- **CodeGeneratorAgent** - AI session state
- **UserAppSandboxService** - Container management
- **UserSecretsStore** - Encrypted secrets
- **DORateLimitStore** - Rate limiting

### D1 Database
SQLite database at the edge.
- **Schema:** `worker/database/schema.ts`
- **Migrations:** `migrations/`
- **ORM:** Drizzle

### R2 Storage
Object storage for templates and assets.
- **Bucket:** `adriel-ink-templates-second`
- **Binding:** `TEMPLATES_BUCKET`

### KV Storage
Key-value store for sessions and cache.
- **Namespace:** `VibecoderStore`
- **Binding:** `VibecoderStore`

### Containers
Sandboxed environments for running generated apps.
- **Dockerfile:** `SandboxDockerfile`
- **Service:** `UserAppSandboxService`
- **Instance Types:** lite, standard-1 to standard-4

---

## 🎨 Styling Guide

### CSS Variables
```css
/* Primary colors */
--primary-color: #FF6B6B;
--secondary-color: #4ECDC4;

/* Dark mode */
--bg-primary: #0A0A0A;
--bg-secondary: #1A1A1A;

/* Use in components */
className="bg-[var(--bg-primary)] text-[var(--text-primary)]"
```

### Tailwind Classes
```jsx
// Layout
<div className="flex flex-col gap-4 p-6">

// Responsive
<div className="w-full md:w-1/2 lg:w-1/3">

// Dark mode
<div className="bg-white dark:bg-gray-900">

// Animations
<div className="transition-all duration-300 hover:scale-105">
```

---

## 🔐 Environment Variables

### Required (.dev.vars / .prod.vars)
```bash
# AI Providers
GOOGLE_AI_STUDIO_API_KEY="your-gemini-key"
ANTHROPIC_API_KEY="optional-claude-key"
OPENAI_API_KEY="optional-openai-key"

# Security
JWT_SECRET="random-string-32-chars"
WEBHOOK_SECRET="random-string-32-chars"
SECRETS_ENCRYPTION_KEY="random-string-32-chars"

# Configuration
CUSTOM_DOMAIN="yourdomain.com"
ALLOWED_EMAIL="your-email@example.com"
SANDBOX_INSTANCE_TYPE="standard-3"

# OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### Manual Deployment Only
```bash
CLOUDFLARE_API_TOKEN="your-api-token"
CLOUDFLARE_ACCOUNT_ID="your-account-id"
```

---

## 🐛 Debugging

### View Worker Logs
```bash
wrangler tail                # Live logs
wrangler tail --format json  # JSON format
```

### Check Build Errors
```bash
bun run build               # Build and see errors
bun typecheck              # TypeScript errors only
```

### Inspect Database
```bash
wrangler d1 execute DB --remote --command="SELECT * FROM users LIMIT 10"
```

### Test API Endpoint
```bash
curl https://your-domain.com/api/health
```

---

## 📊 Architecture Patterns

### Frontend State Management
```typescript
// Context for global state
const AuthContext = createContext<AuthState>();

// Hooks for local state
const [data, setData] = useState<Data[]>([]);

// React Query for server state (if needed)
const { data, isLoading } = useQuery(['key'], fetcher);
```

### Backend Request Flow
```
Request → Worker (index.ts)
       → Middleware (auth, cors)
       → Router (app.ts)
       → Controller (api/*/controller.ts)
       → Service (services/*/service.ts)
       → Database/DO/External API
       → Response
```

### AI Agent Flow
```
User Message → WebSocket
           → CodeGeneratorAgent (DO)
           → Planning Phase
           → Blueprint Generation
           → Phase-wise Code Gen
           → Error Checking
           → Preview Update
           → Response Stream
```

---

## 🔧 Configuration Files

### wrangler.jsonc
Main Cloudflare Workers configuration.
- Worker settings
- Bindings (D1, DO, R2, KV, AI)
- Routes and domains
- Container configuration

### package.json
Project metadata and dependencies.
- Scripts
- Dependencies
- Dev dependencies

### tsconfig.json
TypeScript compiler configuration.
- Strict mode
- Path aliases
- Project references

### vite.config.ts
Frontend build configuration.
- Plugins
- Aliases
- Build optimizations

---

## 📱 Component Patterns

### Basic Component
```typescript
interface Props {
  title: string;
  onAction: () => void;
}

export function MyComponent({ title, onAction }: Props) {
  return (
    <div className="p-4">
      <h1>{title}</h1>
      <button onClick={onAction}>Action</button>
    </div>
  );
}
```

### With State
```typescript
export function MyComponent() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Side effects
  }, [count]);
  
  return <div>Count: {count}</div>;
}
```

### With Context
```typescript
export function MyComponent() {
  const { user } = useAuth();
  
  if (!user) return <LoginPrompt />;
  
  return <div>Hello {user.name}</div>;
}
```

---

## 🚨 Common Issues

### Issue: Build fails with TypeScript errors
**Solution:** Run `bun typecheck` to see all errors. Fix types or add `// @ts-ignore` if necessary.

### Issue: "Module not found" error
**Solution:** Check import paths. Use `@/` alias for src imports.

### Issue: Hot reload not working
**Solution:** Restart dev server. Check Vite logs for errors.

### Issue: Database migration fails
**Solution:** Check migration SQL syntax. Run `wrangler d1 migrations list DB --remote` to see status.

### Issue: Preview not loading
**Solution:** Check container logs. Verify sandbox instance type. Check for build errors in generated app.

### Issue: Authentication not working
**Solution:** Check OAuth configuration. Verify JWT secret is set. Check cookie settings.

---

## 📚 Useful Links

### Documentation
- [VibeSDK GitHub](https://github.com/cloudflare/vibesdk)
- [VibeSDK Demo](https://build.cloudflare.dev)
- [Workers Docs](https://developers.cloudflare.com/workers/)
- [Durable Objects](https://developers.cloudflare.com/durable-objects/)
- [D1 Database](https://developers.cloudflare.com/d1/)

### Community
- [Cloudflare Discord](https://discord.cloudflare.com) (#workers-ai)
- [Community Forum](https://community.cloudflare.com/)
- [GitHub Discussions](https://github.com/cloudflare/vibesdk/discussions)

### Tools
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)

---

## 💡 Tips & Tricks

### 1. Fast Iteration
- Use `bun run dev` for instant HMR
- Keep browser DevTools open
- Use React DevTools extension

### 2. Debugging Agents
- Add `console.log()` in agent code
- Use `wrangler tail` to see logs
- Check Durable Object state

### 3. Database Queries
- Use Drizzle's type-safe queries
- Always use prepared statements
- Index frequently queried columns

### 4. Performance
- Lazy load heavy components
- Use React.memo for expensive renders
- Optimize images and assets
- Leverage CDN caching

### 5. Security
- Never commit secrets
- Use environment variables
- Validate all user inputs
- Enable rate limiting

---

## 🎯 Next Steps

### For New Developers
1. Read CODEBASE_ANALYSIS.md
2. Run `bun run setup`
3. Start with simple component changes
4. Explore chat interface
5. Try generating a simple app

### For Contributors
1. Check open issues on GitHub
2. Pick a "good first issue"
3. Read CONTRIBUTING.md (if exists)
4. Make changes in feature branch
5. Submit PR with clear description

### For Deployers
1. Get Cloudflare account + paid plan
2. Get Google Gemini API key
3. Click "Deploy to Cloudflare" button
4. Configure environment variables
5. Set up custom domain + DNS

---

**Last Updated:** January 15, 2026  
**Version:** 1.4.0
