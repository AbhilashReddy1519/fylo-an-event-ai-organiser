# 🎉 Fylo — AI Event Organiser

**Fylo** is an AI-powered event planning platform designed to simplify how events are created, managed, and experienced. It helps users generate smart event plans, manage attendees efficiently, and explore events through a modern real-time interface.

Fylo combines **AI automation, real-time syncing, QR-based check-ins, and secure authentication** into a scalable developer-friendly architecture.

---

# 📌 Project Overview

Fylo enables users to:

* Generate events using AI assistance
* Discover nearby or trending events
* Manage attendees with QR check-in
* Collaborate with team members
* Sync updates in real-time
* Access secure authentication workflows

The platform is designed for **speed, scalability, and developer productivity** using a modern full-stack architecture.

---

# 🚀 Key Features

### 🤖 AI Event Generation

Automatically generate structured event plans including:

* Event title suggestions
* Description generation
* Schedule planning
* Task breakdown

---

### 📅 Smart Event Management

Users can:

* Create events
* Edit events
* Share events
* Track attendees
* Monitor engagement

---

### 📷 QR Code Check-In System

Enables:

* Secure attendee verification
* Fast check-ins
* Contactless entry workflow

---

### 🔍 Event Discovery

Users can:

* Explore trending events
* Search events by category
* Discover nearby activities
* Join public communities

---

### 👥 Collaboration Tools

Supports:

* Multi-user event editing
* Shared event dashboards
* Team-based planning

---

### 🔐 Authentication System

Powered by **Clerk**

Includes:

* Secure login/signup
* OAuth provider support
* Session persistence
* Role-based access control

---

# 💻 Tech Stack

## Frontend

* Next.js (App Router)
* React 19
* Tailwind CSS
* TypeScript

## Backend

* Convex (Realtime Database + API Layer)
* Serverless Functions

## Authentication

* Clerk Authentication

## AI Integration

* AI-powered event generation workflows

---

# 📂 Project Structure

```
fylo-an-event-ai-organiser/

├── app/                # Next.js App Router pages & layouts
│
├── components/         # Reusable UI components
│
├── convex/             # Backend database schema & API functions
│
├── hooks/              # Custom React hooks
│
├── lib/                # Utility helpers & shared logic
│
├── public/             # Static assets (images, icons)
│
├── .env.local          # Environment variables
│
├── package.json        # Dependencies & scripts
│
└── README.md           # Project documentation
```

---

# ⚙️ Installation & Setup

Follow these steps to run Fylo locally.

---

## 1️⃣ Clone Repository

```
git clone https://github.com/AbhilashReddy1519/fylo-an-event-ai-organiser.git
cd fylo-an-event-ai-organiser
```

---

## 2️⃣ Install Dependencies

```
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a file:

```
.env.local
```

Add required variables:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

OPENAI_API_KEY=
```

---

## 4️⃣ Run Development Server

Start the application:

```
npm run dev
```

---

## 🌐 Open Application

Visit:

```
http://localhost:3000
```

---

# 📦 Project Dependencies

Major dependencies used in this project:

```
next
react
react-dom
typescript
tailwindcss
convex
@convex-dev/react
@clerk/nextjs
openai
zustand / redux (if configured)
```

Install additional dependencies if prompted:

```
npm install
```

---

# 🧾 Available Scripts

Run development server:

```
npm run dev
```

Build production app:

```
npm run build
```

Start production server:

```
npm run start
```

Run lint checks:

```
npm run lint
```

---

# 📄 File Documentation

## app/

Contains:

* Layout definitions
* Page routes
* Navigation structure
* Server components

---

## components/

Reusable UI elements like:

* Buttons
* Cards
* Event forms
* Modals
* Navigation menus

---

## convex/

Handles:

* Database schema
* Queries
* Mutations
* Server-side logic

Acts as **backend API layer**

---

## hooks/

Custom React hooks such as:

* authentication helpers
* event state management
* realtime listeners

---

## lib/

Utility helpers:

Examples:

* API wrappers
* validation logic
* formatting helpers

---

## public/

Stores static assets:

* logos
* icons
* illustrations
* metadata images

---

# 🧪 Local Development Workflow

Typical workflow:

```
Start Convex backend
↓
Run Next.js frontend
↓
Authenticate via Clerk
↓
Generate event with AI
↓
Manage attendees
↓
Scan QR check-ins
```

---

# 🤝 Contributing

We welcome contributors of all experience levels 💙

Steps to contribute:

### 1️⃣ Fork Repository

Click **Fork**

---

### 2️⃣ Create Branch

```
git checkout -b feature/your-feature-name
```

---

### 3️⃣ Commit Changes

```
git commit -m "Added new feature"
```

---

### 4️⃣ Push Changes

```
git push origin feature/your-feature-name
```

---

### 5️⃣ Open Pull Request

Submit PR with description of improvements.

---

# 🛠 Development Best Practices

Before submitting PR:

* Ensure project builds successfully
* Follow folder structure
* Write clean commit messages
* Avoid unnecessary dependencies

Example:

```
feat: added AI event suggestion engine
fix: resolved QR check-in validation bug
refactor: optimized event query performance
```

---

# 🗺️ Future Roadmap

Upcoming enhancements:

* Smart attendee analytics dashboard
* Calendar integrations
* Email automation workflows
* Event monetization tools
* Mobile responsive enhancements

---

# 📝 License

This project is licensed under the **MIT License**

You are free to:

* Use
* Modify
* Distribute
* Contribute

See LICENSE file for details.

---

# 🌟 Vision

Fylo aims to become a **next-generation AI-powered event planning ecosystem**

Designed for:

* creators
* organizers
* communities
* developer contributors

Built with scalability, intelligence, and collaboration at its core.
