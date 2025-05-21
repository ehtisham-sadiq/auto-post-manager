# Linkedin-CMS Frontend

This is the frontend for the Linkedin-CMS project, a modern LinkedIn content management and scheduling platform. It is built with Next.js (App Router), React, and Tailwind CSS.

## Features
- User authentication (NextAuth.js)
- Protected routes
- Post creation, editing, scheduling, and analytics
- Bulk upload and CSV import
- Template management
- Responsive, modern UI

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm or pnpm

### Installation

1. Install dependencies:
   ```sh
   npm install
   # or
   pnpm install
   ```

2. Create a `.env` file in the `frontend` directory (see `.env.example` if available):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_here
   ```

3. Start the development server:
   ```sh
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable UI and feature components
- `services/` - API service modules
- `hooks/` - Custom React hooks
- `public/` - Static assets
- `styles/` - Global and component styles

## Authentication
This project uses [NextAuth.js](https://next-auth.js.org/) for authentication. Credentials provider is set up for demo purposes. Update `lib/auth.ts` to connect to your backend or use other providers.

## License
MIT