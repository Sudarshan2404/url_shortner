🔗 URL Shortener API with Authentication

A secure and scalable URL shortener backend built with Express, TypeScript, MongoDB, and JWT authentication.
Includes features like user registration, login, protected routes, rate limiting, and custom short URLs.

🚀 Features
🔐 User Authentication (Register & Login)
🍪 JWT stored in HTTP-only cookies
🔗 URL Shortening (auto-generated codes)
✏️ Custom Short URLs
📈 Click Tracking
🚫 Rate Limiting (anti-abuse)
🛡️ Protected Routes with Middleware
⚡ Fast redirection using HTTP 302
🛠️ Tech Stack
Backend: Express.js (TypeScript)
Database: MongoDB (via Mongoose)
Validation: Zod
Auth: JWT + Cookies
Security: bcrypt (password hashing)
📂 Project Structure
├── controllers/
│ ├── Authcontrollers.ts
│ ├── urlcontrollers.ts
│
├── models/
│ ├── users.ts
│ ├── urls.ts
│
├── routes/
│ ├── authRoutes.ts
│ ├── urlRoutes.ts
│
├── services/
│ ├── genreatetoken.services.ts
│ ├── url.services.ts
│
├── middlewares/
│ ├── authMiddleware.ts
│ ├── ratelimiter.ts
│
├── config/
│ ├── db.ts
│
├── app.ts / server.ts
🔑 API Endpoints
🧑‍💻 Auth Routes
Register User
POST /api/auth/register

Body:

{
"username": "john123",
"email": "john@example.com",
"password": "password123",
"name": "John Doe"
}
Login User
POST /api/auth/login

Body:

{
"username": "john123",
"password": "password123"
}
🔗 URL Routes

⚠️ Requires authentication (cookie-based JWT)

Shorten URL
POST /shortenurl

Body:

{
"url": "https://example.com"
}
Custom Short URL
POST /cmshortenurl

Body:

{
"url": "https://example.com",
"customName": "my-link"
}
Visit Short URL
GET /:code

➡️ Redirects to original URL
➡️ Increments click count

🔐 Authentication Flow
User logs in / registers
Server generates JWT
Token stored in HTTP-only cookie
Protected routes verify token via middleware
⚙️ Environment Variables

Create a .env file:

PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
DEVLOPMENT=Development
🧠 Important Notes / Improvements
⚠️ Bugs to Fix
❌ bcrypt.compare is missing await:
const passCompare = await bcrypt.compare(password, userExist.password);
❌ Zod email validation should be:
email: z.string().email().toLowerCase()
❌ Typo in env variable:
DEVLOPMENT → DEVELOPMENT
❌ Cookie secure flag:
secure: process.env.DEVELOPMENT === "Production"
🧪 Future Enhancements
📊 Analytics dashboard (clicks, geo, devices)
⏳ Expiring links
📁 User dashboard for managing URLs
🌍 Deploy with custom domain
📡 WebSocket-based real-time click tracking
🔑 OAuth login (Google, GitHub)
🏃‍♂️ Running Locally

# Install dependencies

npm install

# Run dev server

npm run dev
💡 Inspiration

This project is a solid backend system demonstrating:

Auth flows
Middleware design
Scalable API patterns

Perfect for portfolios and real-world backend learning.

👨‍💻 Author

Sudarshan Kulkarni
Building scalable systems, dev tools & startup ideas 🚀
