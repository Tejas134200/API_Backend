# 🚀 Backend API (Node.js + Express + MongoDB + Docker)

A scalable backend API built using **Node.js, Express, and MongoDB**, now fully **Dockerized** for easy setup and deployment.

---

## 📌 Features

* 🔐 Authentication (JWT + bcrypt)
* 👨‍🎓 Student management APIs
* ❓ Question management system
* 🗄️ MongoDB integration using Mongoose
* 🌐 RESTful API architecture
* 🐳 Docker support for easy deployment

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Auth:** JWT, bcrypt
* **Dev Tools:** dotenv, cors
* **Containerization:** Docker

---

## 📁 Project Structure

```
BACKEND_API/
│
├── models/
│   ├── admin.js
│   ├── student.js
│   └── question.js
│
├── routes/
│   ├── auth.routes.js
│   ├── student.routes.js
│   └── question.routes.js
│
├── middleware/
├── index.js
├── connection.js
├── Dockerfile
├── .env
└── package.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in root:

```
PORT=3000
MONGO_URI=mongodb://host.docker.internal:27017/API
JWT_SECRET=your_secret_key
```

---

## 🚀 Run Locally (Without Docker)

```bash
npm install
npm start
```

---

## 🐳 Run with Docker

### 1️⃣ Build Image

```bash
docker build -t backend-api .
```

### 2️⃣ Run Container

```bash
docker run -p 3000:3000 --env-file .env backend-api
```

---

## 🔗 API Base URL

```
http://localhost:3000
```

---

## 📌 Important Notes

* Ensure MongoDB is running locally
* Use `host.docker.internal` for DB connection inside Docker
* Maintain consistent file naming (Linux is case-sensitive)

---

## 🚧 Future Improvements

* Add Docker Compose (API + MongoDB)
* Role-based authentication
* API rate limiting
* Logging & monitoring
* Deployment (AWS / Render / VPS)

---

## 🤝 Contributing

Feel free to fork and contribute to the project.

---

## 📄 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

**Tejas Pokalwar**

---

⭐ If you found this useful, give it a star!
