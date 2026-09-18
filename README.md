# CareerMatch AI

CareerMatch AI is a client-side career preparation platform built with React and Vite. It brings job discovery, career-fit analysis, personalized learning roadmaps, and AI-assisted interview practice into one focused workspace.

## Features

- **Dashboard** for an overview of career progress and recommended actions
- **Job discovery** with sample roles, difficulty levels, and practice shortcuts
- **Match analysis** for comparing a selected job with a candidate profile
- **Interview practice** with role, difficulty, and focus selections
- **AI-generated questions and feedback** through Google Gemini when configured
- **Local fallback engine** so interview practice still works without an API key
- **Role roadmaps** with progress tracking and task completion controls
- **Responsive interface** designed for desktop and smaller screens

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Google Gemini API integration with a local fallback

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will print the local development URL in the terminal, usually `http://localhost:5173`.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Demo Login

The current prototype includes a local demo login:

- **Username:** `myself123`
- **Password:** `123456`

This authentication is implemented in the frontend for demonstration purposes only. It is not suitable for production use.

## Optional Gemini Configuration

Interview questions and answer evaluations use the local fallback engine by default. To enable Google Gemini requests, create a `.env.local` file in the project root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
```

Restart the development server after changing environment variables. Never commit API keys or other secrets. Vite exposes variables prefixed with `VITE_` to browser code, so a production application should move Gemini requests behind a secure server-side endpoint.

## Project Structure

```text
src/
├── components/       Reusable UI components grouped by feature
├── config/           Application configuration
├── data/             Sample jobs, roles, questions, and roadmap content
├── hooks/            State and behavior hooks, including interview flow
├── pages/            Dashboard, jobs, interview, login, match, and roadmap screens
├── services/         External integrations and fallback logic
├── types/            Shared TypeScript types
└── utils/            Shared utility functions
```

The main application flow is coordinated in `src/App.tsx`, while the Vite entry point is `src/main.tsx`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create a production build |
| `npm run preview` | Serve the production build locally |

## Notes

This repository is currently a frontend prototype. Job listings, role data, roadmap content, and the demo account are stored in the client application. For a production release, add server-side authentication, persistent storage, protected API access, and real job data integrations.
