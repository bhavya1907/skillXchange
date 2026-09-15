# SkillXchange

SkillXchange is a full-stack mentorship marketplace where people can discover learning paths, book 1:1 guidance, and track their momentum.

## Run locally

1. Copy `.env.example` to `.env` and add a MongoDB connection string and JWT secret.
2. Run `npm install`.
3. Run `npm run dev`, then visit `http://localhost:5055`.

The polished discovery experience works without a database using carefully designed sample content. Authentication, bookings, profile, and admin APIs require MongoDB.

## Highlights

- Responsive, accessible marketplace UI with filtering, saved mentors, and booking flow
- Real API integration for sign-up, sign-in, profile, and booking requests
- JWT-protected user and admin endpoints
- Environment-based configuration; no credentials committed to source
