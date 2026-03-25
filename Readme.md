# 🔗 URL Shortener API with Authentication

A secure and scalable URL shortener backend built with **Express, TypeScript, MongoDB**, and **JWT authentication**.

---

## 🚀 Features

- 🔐 User Authentication (Register & Login)
- 🍪 JWT stored in HTTP-only cookies
- 🔗 URL Shortening (auto-generated codes)
- ✏️ Custom Short URLs
- 📈 Click Tracking
- 🚫 Rate Limiting
- 🛡️ Protected Routes
- ⚡ Fast redirection (HTTP 302)

---

## 🛠️ Tech Stack

- **Backend:** Express.js (TypeScript)
- **Database:** MongoDB (Mongoose)
- **Validation:** Zod
- **Authentication:** JWT + Cookies
- **Security:** bcrypt

---

## 📂 Project Structure

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
├── app.ts

---

## 🔑 API Endpoints

### 🧑‍💻 Auth Routes

#### Register User

**POST api/auth/register**

```json
{
  "username": "john123",
  "email": "john@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Register User

**POST api/auth/register**

```json
{
  "username": "john123",
  "email": "john@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

#### Shorten Url

**POST /shortenurl**

```json
{
  "url": "https://www.google.com"
}
```

#### Shorten Url with custom name

**GET /cmshortenurl**

```json
{
  "CustomName": "ShortenUrl",
  "url": "https://www.google.com"
}
```

#### Visit Shortened Url

**GET /:code**

- Redirects to original URL
- Increments click count
