# Taskly API

Express API for the Taskly React application.

## Local development

1. Copy `.env.example` to `.env`.
2. Leave `MONGODB_URI` empty until MongoDB Atlas is configured.
3. Install dependencies with `npm install`.
4. Start the API with `npm run dev`.
5. Open `http://localhost:3000/api/health`.

The API intentionally starts without MongoDB during the foundation phase. Once
`MONGODB_URI` is configured, startup and health checks verify the connection.
