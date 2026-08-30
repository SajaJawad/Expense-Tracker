# 💰 Expense Tracker - Full-Stack Personal Finance Platform

A production-ready, full-stack Expense Tracking & Personal Finance application built with React 19, Vite, Tailwind CSS, Node.js, Express 5, and Supabase / MongoDB.

---

## 🌟 Key Features

### 🛡️ Security & Authorization
- **Strict Data Isolation**: All read, update, delete operations are strictly scoped to the authenticated user ID (`user_id`).
- **Sanitized Auth Responses**: Passwords and password hashes are never returned in API payloads.
- **JWT Authentication**: Secure token-based session verification with protected client routes.
- **Protected File Uploads**: File type restrictions (`.jpg`, `.png`, `.webp`), 5 MB upload limit, and randomized unique filenames.
- **Security Headers & Rate Limiting**: Powered by `helmet` and `express-rate-limit` for DDoS and brute-force protection.

### 📊 Dashboard & Financial Analytics
- **Overview Metrics**: Total Balance, Total Income, Total Expense, Net Savings, and Savings Rate.
- **Month-over-Month Growth**: Percentage growth comparison against previous month data.
- **Monthly Budget System**: Set custom spending limits with real-time status indicators (*Safe*, *Approaching Limit*, *Over Budget*).
- **Category Breakdown Chart**: Visual expense distribution powered by Recharts.
- **Deterministic Financial Insights**: Automated financial tips generated directly from your transaction history.

### 💳 Income & Expense Management
- **Transaction CRUD**: Full capability to Add, Read, Edit, and Delete transactions.
- **Preset Categories & Sources**: Pre-configured categories (Food, Rent, Salary, Freelance, etc.) with custom icon selectors.
- **Search, Filter & Sort**: Search by keyword, filter by date range, min/max amount, category/source, and sort by date or amount.
- **In-Memory Excel Exports**: Instant `.xlsx` exports generated dynamically in memory without saving temporary files to disk.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Vanilla CSS + Tailwind CSS
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **Icons**: React Icons

### Backend
- **Runtime**: Node.js
- **Framework**: Express 5
- **Database**: Supabase (PostgreSQL) / MongoDB Mongoose
- **Security**: Helmet, Express Rate Limit, BcryptJS, JSONWebToken
- **File Processing**: Multer, XLSX

---

## ⚙️ Environment Configuration

### Backend `.env`
```env
PORT=8000
JWT_SECRET=your_jwt_secret_key
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_KEY=your_supabase_key
CLIENT_URL=http://localhost:5173
```

### Frontend `.env`
```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## 🛠️ Local Development Setup

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
The server will run on `http://localhost:8000`.

### 2. Frontend Setup
```bash
cd frontend/expense-tracker
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

---

## 📡 API Routes Overview

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Register new user account | ❌ |
| `POST` | `/api/v1/auth/login` | Login user and issue JWT | ❌ |
| `GET` | `/api/v1/auth/getUser` | Get authenticated user profile | ✅ |
| `POST` | `/api/v1/auth/upload-image` | Upload profile image | ✅ |
| `GET` | `/api/v1/dashboard` | Fetch dashboard analytics | ✅ |
| `GET` | `/api/v1/income/get` | Search, filter, and paginate income | ✅ |
| `POST` | `/api/v1/income/add` | Add income record | ✅ |
| `PUT` | `/api/v1/income/:id` | Update income record | ✅ |
| `DELETE` | `/api/v1/income/:id` | Delete income record | ✅ |
| `GET` | `/api/v1/income/downloadexcel` | Download income Excel report | ✅ |
| `GET` | `/api/v1/expense/get` | Search, filter, and paginate expense | ✅ |
| `POST` | `/api/v1/expense/add` | Add expense record | ✅ |
| `PUT` | `/api/v1/expense/:id` | Update expense record | ✅ |
| `DELETE` | `/api/v1/expense/:id` | Delete expense record | ✅ |
| `GET` | `/api/v1/expense/downloadexcel` | Download expense Excel report | ✅ |
| `GET` | `/api/v1/budget` | Fetch monthly budget | ✅ |
| `POST` | `/api/v1/budget` | Update monthly budget | ✅ |

---

## 🌐 Deployment Guidelines

- **Vercel Frontend**: Set `VITE_API_BASE_URL` in Vercel Environment Variables.
- **Vercel Backend**: Export Express app (`module.exports = app`) and configure `vercel.json` as a serverless function.
