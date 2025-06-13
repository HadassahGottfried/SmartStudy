# 📚 SmartStudy — AI-Driven Learning Platform

SmartStudy is a mini learning platform that allows users to register, choose a category and sub-category, send prompts to OpenAI to receive personalized AI-generated lessons, and track their learning history. An admin dashboard provides insights into all users and their interactions.

---

## 🚀 Live Demo
*(Not deployed yet – feel free to add a Vercel/Netlify/Heroku link if available)*

---

## 🛠️ Technologies Used

### 🔙 Backend
- **Node.js** + **Express**
- **TypeScript**
- **Prisma** (ORM for PostgreSQL)
- **Zod** – input validation
- **OpenAI SDK**
- **JWT** – authentication
- **dotenv** – environment config
- **Swagger (via swagger-jsdoc)**

### 🖥️ Frontend
- **React**
- **TypeScript**
- **Redux Toolkit** – state management
- **Axios** – HTTP client
- **React Router** – page navigation
- **React Markdown** – for rendering AI responses

### 🧪 Dev Tools
- **Docker** + **Docker Compose**
- **PostgreSQL**

---

## 📂 Project Structure

### Backend (`/backend`)
```
src/
├── app.ts
├── main.ts
├── middlewares/
│   └── authMiddleware.ts
├── prisma/
│   └── seed.ts
├── resources/
│   ├── auth/
│   │   └── api.ts
│   ├── categories/
│   │   └── api.ts
│   ├── prompts/
│   │   └── api.ts
│   ├── subCategories/
│   │   └── api.ts
│   └── users/
│       └── api.ts
├── utils/
│   ├── openaiService.ts
│   └── db.ts
.env
docker-compose.yml
```

### Frontend (`/client`)
```
src/
├── App.tsx
├── App.css
├── index.tsx
├── index.css
├── app/
│   └── store.ts
├── components/
│   └── promptForm.tsx
├── features/
│   └── auth/
│       └── authSlice.ts
├── pages/
│   └── dashboard.tsx
├── services/
│   └── prompt.ts
.env
```

---

## 🧪 Running the Project Locally

### 🔧 Prerequisites
- Node.js (>= 18)
- Docker & Docker Compose

---

### ⚙️ Backend Setup

1. Clone the repository and navigate to `backend/`
2. Create a `.env` file:

```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/ai_learning"
OPENAI_API_KEY=your_openai_key
JWT_SECRET=my_super_secret_key
ADMIN_PHONE=0504108541
```

3. Start PostgreSQL using Docker Compose:

```bash
docker-compose up -d
```

4. Install backend dependencies:

```bash
cd backend
npm install
```

5. Reset the database and apply all migrations (with seed data):

```bash
npx prisma migrate reset
```

✅ This will also run the `seed.ts` script automatically and insert:
- Predefined categories like `Math`, `Science`, `Geography`, etc.
- 7 sub-categories under each category
- A default **admin user** with:
  - Name: `HADASSAH`
  - Phone: `0504108541`

6. Start the server:

```bash
npx ts-node src/main.ts
```

Swagger docs available at: `http://localhost:4000/api-docs`

---

### 🖥️ Frontend Setup

1. Navigate to `client/`

```bash
cd ../client
```

2. Create `.env` file with:

```env
REACT_APP_API_URL=http://localhost:4000
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm start
```

---

## 👤 User Features

- Register/Login using name and phone
- Choose category and sub-category
- Submit a learning prompt
- Receive AI-generated lesson
- View personal learning history

---

## 🛡️ Admin Dashboard

- View all users
- Click any user to view their full learning history
- Admin identified by specific phone number (from `.env`: `ADMIN_PHONE`)

---

## ✅ Completed Features

- RESTful API with modular structure
- PostgreSQL with Prisma
- JWT-based authentication
- Zod input validation
- Swagger/OpenAPI 3.0 documentation
- Admin dashboard
- Docker Compose for DB setup

---

## 🔐 Swagger Documentation

Available at `http://localhost:4000/api-docs`

---

## 👩‍💻 Author

**Your Name Here**  
GitHub: https://github.com/HadassahGottfried/SmartStudy.git
Email: hadasa3281@gmail.com

---

## 📜 License

This project is licensed under the MIT License.