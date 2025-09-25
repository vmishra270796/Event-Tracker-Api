# Event-Tracker-Api

git clone https://github.com/vmishra270796/Event-Tracker-Api.git
cd Event-Tracker-Api
cp  .env
npm install
npm run dev

# ENV Data
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://localhost:27017/mini_event_tracker
JWT_SECRET=your_super_secret_here
CLIENT_ORIGIN=http://localhost:5173



# StartUp

npm run dev



# Tech Stack & Reasoning

1. Node.js + Express → lightweight, modular REST API.

2. MongoDB (Mongoose) → flexible schema for events, quick iteration.

3. JWT in HttpOnly cookies → secure, stateless authentication.

4. express-validator → input validation.

5. bcryptjs → password hashing.


# Trade‑offs & Assumptions

1. MongoDB chosen for speed/flexibility (SQL would be stricter but slower to iterate).
2. JWT in cookies (simpler than sessions for stateless APIs).

3. Events belong to a single user.
4. Share links expire automatically after event datetime.


# Endpoints

POST /api/auth/signup → create user

POST /api/auth/login → login, sets cookie

GET /api/auth/me → current user

POST /api/auth/logout → clear cookie

GET /api/events?filter=upcoming|past → list events

POST /api/events → create event

PUT /api/events/:id → update event

DELETE /api/events/:id → delete event

POST /api/events/:id/share → enable share link

DELETE /api/events/:id/share → disable share link

GET /api/events/shared/:slug → public view (expires after event datetime)