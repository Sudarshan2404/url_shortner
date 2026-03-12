# 🔗 URL Shortener

A simple and fast **URL shortening service** built with **Node.js, Express, TypeScript, and MongoDB**.

This application converts long URLs into short, shareable links and redirects users to the original URL while tracking how many times each link has been visited.

---

## 🚀 Features

- Shorten long URLs into compact links
- Redirect users to the original URL
- Track number of visits (click analytics)
- RESTful API design
- Built with TypeScript for type safety
- MongoDB database integration

---

## 🛠 Tech Stack

**Backend**

- Node.js
- Express.js
- TypeScript

**Database**

- MongoDB
- Mongoose

**Utilities**

- dotenv
- nodemon / ts-node

---

## 📂 Project Structure

```
src
│
├── controllers
│   └── urlcontrollers.ts
│
├── models
│   └── urlmodel.ts
│
├── routes
│   └── urlroutes.ts
│
├── config
│   └── db.ts
│
├── app.ts
└── server.ts
```

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

### 2️⃣ Install dependencies

```
npm install
```

### 3️⃣ Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
BASE_URL=http://localhost:5000
```

### 4️⃣ Run the server

```
npm run dev
```

Server will start at:

```
http://localhost:3000
```

---

## 📡 API Endpoints

### Create Short URL

```
POST /api/shortenurl
```

Request body:

```json
{
  "url": "https://google.com"
}
```

Response:

```json
{
  "shortUrl": "http://localhost:5000/abc123"
}
```

---

### Redirect to Original URL

```
GET /:code
```

Example:

```
http://localhost:5000/abc123
```

This endpoint:

- Finds the URL in the database
- Increments the click counter
- Redirects the user to the original URL

---

### Get URL Analytics

```
GET /api/url/:code
```

Example response:

```json
{
  "originalUrl": "https://google.com",
  "clicks": 12
}
```

---

## 📊 Example Database Record

```json
{
  "_id": "65f123abc...",
  "code": "abc123",
  "originalUrl": "https://google.com",
  "clicks": 5,
  "createdAt": "2026-03-12T10:00:00Z"
}
```

---

## 🔧 Future Improvements

- Custom short URLs
- URL expiration support
- QR code generation
- Analytics dashboard
- Rate limiting
- Redis caching for faster redirects

---

## 📚 What I Learned

- Designing REST APIs with Express
- Working with MongoDB and Mongoose
- Implementing redirect logic
- Handling click analytics efficiently
- Structuring scalable backend projects

---

## 👨‍💻 Author

**Sudarshan Kulkarni**

GitHub: https://github.com/Sudarshan2404
X (Twitter): https://x.com/0xSudarshan

---

⭐ If you found this project useful, consider giving the repository a star!
