# Taskly

Taskly is a full-stack task management application built around authenticated workspaces, task CRUD, profile management, filtered task views, notifications, and responsive dashboard layouts. It started as a React interface and was expanded into a deployed MERN application with persistent user data and production API integration.

Live app: https://taskly-taha.vercel.app/

API health check: https://taskly-taha-api.vercel.app/api/health

## Features

- Email signup, verification, login, logout, and protected routes
- Username or email based login
- Secure session cookies with JWT authentication
- Profile editing with avatar upload, crop, update, and delete flows
- Full task CRUD: create, read, update, complete, archive, restore, and delete
- Dashboard statistics derived from real task data
- Filtered task views for dashboard, today, upcoming, important, completed, and archived tasks
- Notifications for task activity and account state
- Responsive sidebar, mobile drawer, profile dropdown, and task modals
- Dark/light theme support and workspace density setting
- MongoDB-backed persistence instead of local-only demo data

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Zustand
- Tailwind CSS
- React Hook Form
- Zod
- Motion / GSAP
- Lucide React
- Sonner

### Backend

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs
- Zod
- Nodemailer with Gmail SMTP
- Cloudinary
- Helmet
- CORS
- Cookie Parser
- Express Rate Limit

## Project Structure

```text
Taskly
├── src/
│   ├── app/                 # Router and app-level setup
│   ├── components/          # Reusable UI and layout components
│   ├── features/            # Feature-specific state and logic
│   ├── lib/                 # API client and shared utilities
│   ├── pages/               # Route pages
│   └── styles/              # Global styling
├── server/
│   ├── src/
│   │   ├── config/          # Database connection
│   │   ├── middleware/      # Auth, CSRF, and error middleware
│   │   ├── models/          # Mongoose models
│   │   ├── routes/          # Auth, task, and health routes
│   │   ├── services/        # Email, auth token, avatar storage
│   │   └── validation/      # Zod request schemas
│   └── package.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 20 or newer
- MongoDB Atlas database
- Cloudinary account
- Gmail account with an app password for SMTP email delivery

### Install dependencies

From the project root:

```bash
npm install
npm --prefix server install
```

### Frontend environment variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000/api
```

For production, set it to the deployed API:

```env
VITE_API_URL=https://taskly-taha-api.vercel.app/api
```

### Backend environment variables

Create `server/.env`:

```env
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
GMAIL_USER=your_gmail_address
GMAIL_APP_PASSWORD=your_gmail_app_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Never commit real environment values to GitHub.

## Running Locally

Start the backend API:

```bash
npm run server:dev
```

Start the frontend in another terminal:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

The backend runs on:

```text
http://localhost:3000
```

## Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run lint
npm run test
```

### Backend

```bash
npm run server:dev
npm run server:test
```

## API Overview

Main API groups:

- `GET /api/health`
- `POST /api/auth/signup`
- `POST /api/auth/verify-email`
- `POST /api/auth/resend-verification`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `PATCH /api/auth/profile`
- `PUT /api/auth/profile/avatar`
- `DELETE /api/auth/profile/avatar`
- `POST /api/auth/logout`
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:taskId`
- `DELETE /api/tasks/:taskId`

Task write operations are protected by authentication and CSRF checks.

## Security Notes

Taskly includes:

- Password hashing with bcryptjs
- JWT-based session cookies
- Protected API routes
- CSRF protection for state-changing requests
- Rate limiting on authentication routes
- Runtime request validation with Zod
- Helmet security headers
- Strict CORS configuration
- Server-side avatar upload handling through Cloudinary

## Deployment

Taskly is deployed as two Vercel projects from the same repository:

```text
taskly-taha.vercel.app       # React frontend
taskly-taha-api.vercel.app   # Express API
```

The frontend uses `VITE_API_URL` to call the production API. The backend uses MongoDB Atlas for persistence, Cloudinary for avatar storage, and Gmail SMTP through Nodemailer for verification emails.

## Status

Taskly is currently live with authentication, profile management, task CRUD, persistent MongoDB data, avatar uploads, and protected dashboard routes.
