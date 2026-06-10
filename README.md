# AI Zone

> A full-stack AI SaaS platform for content creators — write articles, generate blog titles, create and edit images, and review resumes, all behind a polished, animated UI.

AI Zone bundles six AI tools into a single dashboard with authentication, usage-based free/premium plans, a community gallery, and a creation history. It's built on the **MERN-ish** stack (React + Express + PostgreSQL), with Clerk for auth & billing, Gemini for text, ClipDrop for images, and Cloudinary for media storage.

---

## ✨ Features

| Tool | Description | Access |
| --- | --- | --- |
| **Write Article** | Generate full-length articles (short / medium / long) from a topic. | Free (10 uses) |
| **Blog Titles** | Generate catchy blog titles by keyword & category. | Free (10 uses) |
| **Generate Images** | Text-to-image generation in multiple styles (Realistic, Ghibli, Anime, 3D…). | Premium |
| **Remove Background** | Strip the background from any uploaded image. | Premium |
| **Remove Object** | Remove a named object from an image. | Premium |
| **Review Resume** | Upload a PDF resume and get an AI analysis & feedback. | Premium |

Plus:

- 🔐 **Authentication & billing** via Clerk (sign-in, user profile, premium plan gating).
- 📊 **Dashboard** showing total creations and active plan.
- 🖼️ **Community gallery** of published AI images with likes.
- 🗂️ **Creation history** with single & bulk delete.
- 🆓 **Free tier** with 10 free generations for text tools; premium unlocks image & resume tools.
- 🎨 **Premium animated UI** — dark/neon theme, GSAP-style reveal animations, magnetic buttons, glassmorphism, and Framer Motion transitions.
- 🔔 **Smart upsell toasts** — when a premium/limit message is hit, the app shows a friendly note with a shortcut to the Plans section.

> **Note:** This is a demo/test build. The pricing flow uses Clerk's test mode, so no real payment is required — you can click *Purchase* to unlock premium features and try everything out.

---

## 🏗️ Architecture

AI Zone is a **monorepo** with two independent apps: a Vite/React `client` and an Express `server`, talking over a REST API.

```
AI Zone/
├── client/                 # React 19 + Vite frontend
│   └── src/
│       ├── components/     # Navbar, Hero, Sidebar, ToolUI, Reveal, etc.
│       ├── pages/          # HomePage, Dashboard, Layout, + 6 tool pages, Community
│       ├── hooks/          # useTilt / useMagnetic animation hooks
│       ├── lib/            # notify.jsx (toast/upsell helper)
│       ├── App.jsx         # Routes + Toaster
│       └── main.jsx        # ClerkProvider + BrowserRouter entry
│
└── server/                 # Express 5 backend
    ├── config/             # db (Neon), cloudinary, multer
    ├── controllers/        # aiController, userController
    ├── middlewares/        # auth (Clerk + plan/usage resolution)
    ├── routes/             # aiRoutes, userRoutes
    └── server.js           # App entry
```

### Request flow

```
Browser (React)
   │  axios + Clerk JWT (Authorization: Bearer <token>)
   ▼
Express server  ──► clerkMiddleware() ──► requireAuth() ──► auth middleware
   │                                          (resolves plan + free_usage)
   ├── /api/ai/*    → aiController   → Gemini / ClipDrop / Cloudinary
   └── /api/user/*  → userController → Neon PostgreSQL (creations table)
```

### Tech stack

**Frontend**
- React 19 + Vite 7
- React Router 7
- Tailwind CSS 4
- Framer Motion (animations)
- Clerk React (auth UI + `PricingTable` / `Protect`)
- Axios, react-hot-toast, react-markdown, lucide-react

**Backend**
- Node.js + Express 5
- Clerk Express (`clerkMiddleware`, `requireAuth`) for auth & plan checks
- Neon serverless PostgreSQL (`@neondatabase/serverless`)
- OpenAI SDK pointed at **Google Gemini** (text generation)
- **ClipDrop API** (image generation)
- **Cloudinary** (image hosting + AI background/object removal transforms)
- Multer (file uploads), pdf-parse (resume text extraction)

### Auth & plan model

The `auth` middleware (`server/middlewares/auth.js`) runs on every protected route:
1. Reads `userId` and `has({ plan: 'premium' })` from Clerk.
2. Tracks `free_usage` in the user's Clerk `privateMetadata` (text tools allow 10 free uses).
3. Attaches `req.plan` (`'premium'` | `'free'`) and `req.free_usage` for controllers to enforce limits.

### Database

A single `creations` table in PostgreSQL stores every generation:

| column | type | notes |
| --- | --- | --- |
| `id` | int (PK) | |
| `user_id` | text | Clerk user id |
| `prompt` | text | the input prompt |
| `content` | text | article/title text **or** image URL |
| `type` | text | `article` \| `blog-title` \| `image` \| `resume-review` |
| `publish` | bool | whether the image appears in the community gallery |
| `likes` | text[] | array of user ids who liked it |
| `created_at` | timestamp | |

---

## 🚀 Getting Started

### Prerequisites

You'll need free accounts / keys for:

- [Node.js](https://nodejs.org/) 18+
- [Clerk](https://clerk.com/) — auth & billing (publishable + secret keys, and a `premium` plan configured)
- [Neon](https://neon.tech/) — serverless PostgreSQL connection string
- [Google AI Studio](https://aistudio.google.com/) — Gemini API key
- [ClipDrop](https://clipdrop.co/apis) — image generation API key
- [Cloudinary](https://cloudinary.com/) — cloud name, API key, API secret

### 1. Clone

```bash
git clone <your-repo-url> AI Zone
cd AI Zone
```

### 2. Set up the database

In your Neon (or any Postgres) instance, create the `creations` table:

```sql
CREATE TABLE creations (
  id          SERIAL PRIMARY KEY,
  user_id     TEXT NOT NULL,
  prompt      TEXT NOT NULL,
  content     TEXT NOT NULL,
  type        TEXT NOT NULL,
  publish     BOOLEAN DEFAULT FALSE,
  likes       TEXT[] DEFAULT '{}',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Configure the server

```bash
cd server
npm install
```

Create `server/.env`:

```env
PORT=3000

# Clerk
CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx

# Database (Neon Postgres)
DATABASE_URL=postgresql://user:password@host/db?sslmode=require

# AI providers
GEMINI_API_KEY=your_gemini_key
CLIPDROP_API_KEY=your_clipdrop_key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

Start the API:

```bash
npm run server      # dev (nodemon) → http://localhost:3000
# or
npm start           # production
```

### 4. Configure the client

```bash
cd ../client
npm install
```

Create `client/.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxx
VITE_BASE_URL=http://localhost:3000
```

Start the dev server:

```bash
npm run dev         # → http://localhost:5173
```

### 5. Use it

1. Open `http://localhost:5173`.
2. Click **Get Started** to sign in via Clerk.
3. Use the **Dashboard** button in the navbar to enter the app at `/ai`.
4. Try the free text tools; for premium tools, open the **Plans** section and "purchase" the premium plan (test mode — no real charge).

---

## 📜 Available Scripts

**Client** (`/client`)

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

**Server** (`/server`)

| Command | Description |
| --- | --- |
| `npm run server` | Start with nodemon (dev) |
| `npm start` | Start with node (production) |

---

## 🔌 API Reference

All routes require a Clerk JWT (`Authorization: Bearer <token>`).

### AI routes — `/api/ai`

| Method | Endpoint | Body | Plan |
| --- | --- | --- | --- |
| POST | `/generate-article` | `{ prompt, length }` | Free (≤10) |
| POST | `/generate-blog-title` | `{ prompt }` | Free (≤10) |
| POST | `/generate-image` | `{ prompt, publish }` | Premium |
| POST | `/remove-image-background` | `image` (multipart) | Premium |
| POST | `/remove-image-object` | `image` (multipart), `object` | Premium |
| POST | `/resume-review` | `resume` PDF (multipart, ≤5MB) | Premium |

### User routes — `/api/user`

| Method | Endpoint | Body | Description |
| --- | --- | --- | --- |
| GET | `/get-user-creations` | — | Current user's creations |
| GET | `/get-published-creations` | — | Community gallery |
| POST | `/toggle-like-creation` | `{ id }` | Like / unlike |
| POST | `/delete-creation` | `{ id }` | Delete one creation |
| POST | `/delete-creations` | `{ ids }` | Bulk delete (owner only) |

---

## 🚢 Deployment

The `client` and `server` are independent apps and can be deployed separately:

- **Client** → any static host (Vercel, Netlify). Set `VITE_*` env vars and point `VITE_BASE_URL` at the deployed API.
- **Server** → any Node host (Render, Railway, Vercel serverless). Set all server `.env` vars there.

Make sure the deployed client's origin is allowed by CORS (the server currently uses open `cors()` — tighten this for production).

---

## 📄 License

ISC — see `server/package.json`. Built for learning/demo purposes.
