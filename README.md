# Internship Hub

A full-stack platform for college students and companies/startups to connect for internship hiring.

Features:
- Student signup/login
- Company signup/login
- Internship posting by companies
- Internship list and filtering by skills
- Student and company dashboards
- JWT authentication
- MongoDB integration

Project structure:
- `server/` - Node.js + Express + MongoDB backend
- `client/` - React + Vite frontend

## Tech stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Auth: JWT

## Setup

1. Start MongoDB locally
2. Configure server environment
3. Install and run server
4. Install and run client

## Server setup

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

## Client setup

```bash
cd client
npm install
npm run dev
```

Open the frontend at `http://localhost:5173` and the backend at `http://localhost:5000`.

## Example roles
- Student: create an account, add skills, browse internships
- Company: create an account, post internships, review applicants

## Notes
This is an MVP starter project for internship hiring. A production version would include resume upload, applicant tracking, payments, notifications, and admin moderation.
