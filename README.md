# Taskly

Taskly is a full-stack task management application built to help users organize their daily workflow through intuitive dashboards, filtered task views, notifications, profile management, and secure personal workspaces. Originally developed as a frontend interface, the project evolved into a complete MERN application with persistent data, authentication, and production deployment.

## 🚀 Live Demo

**Application:**
https://taskly-taha.vercel.app/

## ✨ Features

* User registration, email verification, login, and logout
* Secure authentication and protected user workspaces
* Complete task management (Create, Read, Update, Delete)
* Task completion, archiving, and restoration
* Dashboard statistics and categorized task views
* Profile management with avatar uploads
* Responsive design for desktop and mobile devices
* Light and dark theme support
* Persistent cloud-based data storage

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Zustand
* React Hook Form
* Zod

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Cloudinary
* Gmail SMTP

### Deployment

* Vercel (Frontend & Backend)

## 💡 Development Challenge

One of the biggest challenges was transforming a static task management interface into a fully authenticated application that could securely manage user-specific data while maintaining a smooth and responsive user experience.

## ✅ Solution

This was achieved by building a dedicated backend, integrating persistent MongoDB storage, implementing protected user access, connecting the frontend to real API endpoints, and synchronizing all task and profile data across the application. The result is a production-ready task management platform that maintains user data across sessions and devices.

## 🏗️ Architecture Overview

```text
React + Vite
      │
      ▼
Express.js API
      │
      ▼
MongoDB Atlas

Cloudinary → Avatar Storage
Gmail SMTP → Email Verification
```

## 📈 Project Status

Taskly is actively maintained as a portfolio project and demonstrates modern full-stack development practices, responsive UI design, secure authentication, cloud storage integration, and production deployment.

## 📄 Usage

This repository is publicly available for portfolio and learning purposes. Please do not redistribute, rebrand, or deploy this project as your own without permission.
