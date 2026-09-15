SkillXchange
A full-stack mentorship marketplace that helps ambitious learners find experienced practitioners, book focused 1:1 sessions, and make meaningful progress.

Node.js MongoDB Status

SkillXchange turns a difficult question — “who can help me get unstuck?” — into a calm, intentional discovery experience. Learners can browse mentors by discipline, search by topic, save people for later, create an account, and request a mentorship session. Administrators can manage skills, technologies, sessions, requests, and learner progress through protected APIs.

Why this project stands out
Product-minded UI: A custom, responsive interface built around a complete learner journey rather than a generic dashboard.
Real user flows: Sign-up, log-in, saved mentors, and authenticated mentorship requests are functional end-to-end.
Thoughtful backend: JWT-protected routes, role-based admin middleware, password hashing with bcrypt, and Mongoose data models.
Secure configuration: Secrets live in environment variables — never source code.
Graceful local preview: The public discovery experience is usable even before MongoDB is configured.
Features
Learner experience
Browse a curated mentor marketplace
Filter mentors by Engineering, Design, Product, or Data & AI
Search mentors by name, role, or specialty
Save a personal shortlist in local storage
Create an account and securely log in
Send an authenticated mentorship request
Responsive design for desktop and mobile
Platform APIs
User registration, login, profile updates, and password change
Skill and technology catalog management
Free and paid session management
Mentorship request lifecycle and payment state
Learner progress and review tracking
Admin-only management endpoints
Tech stack
Area	Technology
Client	Semantic HTML, modern CSS, vanilla JavaScript
Server	Node.js, Express 5
Database	MongoDB with Mongoose
Authentication	JSON Web Tokens (JWT)
Security	bcrypt password hashing, protected middleware
Developer tooling	Nodemon
Project structure
skillexchange/
├── public/                     # Responsive browser application
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── server/
│   ├── apis/                   # Feature controllers and Mongoose models
│   │   ├── users/  requests/  skill/  technology/
│   │   ├── freesession/  paidsession/  progress/
│   ├── config/                 # Database and optional seed setup
│   ├── middleware/             # JWT and admin authorization
│   └── routes/                 # Public and admin API routes
├── .env.example
├── index.js                    # Express application entry point
└── package.json
Run locally
1. Clone and install
git clone <your-repository-url>
cd skillexchange
npm install
2. Configure environment variables
Create a .env file in the project root. Use .env.example as a guide:

PORT=5055
MONGO_URL=mongodb+srv://<username>:<password>@<cluster>/skillexchange
JWT_SECRET=replace-this-with-a-long-random-secret
MongoDB is required for authentication, bookings, and persistent data. Without MONGO_URL, the landing page and mentor discovery UI still load for a visual preview.

3. Start the application
npm run dev
Open http://localhost:5055 in your browser.

For a non-watching production-style start, run:

npm start
API overview
All API responses use status, success, message, and, where appropriate, data.

Method	Endpoint	Purpose	Auth
POST	/apis/user/register	Create a learner account	No
POST	/apis/user/login	Log in and receive a JWT	No
GET	/apis/user/profile	Load the active user profile	User
POST	/apis/user/update-profile	Update the active user	User
POST	/apis/requests/add	Request a mentorship session	User
POST	/apis/requests	View requests	User
POST	/apis/skills	Browse skills	No
POST	/apis/technologies	Browse technologies	No
POST	/apis/free-sessions	Browse free sessions	No
POST	/apis/paid-sessions	Browse paid sessions	No
GET	/health	Application health check	No
Admin routes are prefixed with /admin and require a JWT for a user with userType: 1.

Example: create an account
curl -X POST http://localhost:5055/apis/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Ayesha Sharma",
    "email": "ayesha@example.com",
    "password": "a-secure-password"
  }'
Quality checks
npm test
This performs JavaScript syntax checks for the server entry point and client application.

Product decisions
Vanilla frontend by design: The client stays fast and dependency-light while demonstrating strong fundamentals in responsive UI, state management, accessibility, and API integration.
Server-owned identity: Booking requests derive the user from the verified JWT rather than accepting a user ID from the browser.
Progressive enhancement: Demo mentor content lets a recruiter experience the product immediately; the database activates real account and booking workflows.
Roadmap
 Mentor availability calendar and time-slot selection
 Payments with Stripe or Razorpay
 Email confirmations and reminders
 Mentor profiles with reviews and ratings
 Learner dashboard for bookings and progress
 API integration tests and CI pipeline
Author
Built by Bhavya Verma. If this project resonates with you, feel free to connect and discuss product engineering, mentorship, or thoughtful web experiences.

Made with intent for people building what’s next.

