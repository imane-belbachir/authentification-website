# Authentication Website (MERN Stack)

This is a full-stack authentication website built using the **MERN** (MongoDB, Express, React, Node.js) stack. It includes user authentication with **JWT** and a **password reset feature** using **NodeMailer**.

## 🚀 Features
- User Signup & Login (JWT Authentication)
- Secure password hashing
- CRUD API for managing users
- Password reset functionality via email (NodeMailer)
- Separate **frontend** and **backend** architecture

---

## 🏗️ Tech Stack
### **Frontend:**
- React.js (ES Modules syntax)
- Axios for API calls
- Tailwind CSS (optional, if used for styling)

### **Backend:**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT (JSON Web Tokens) for authentication
- NodeMailer for password reset functionality
- bcrypt.js for password hashing

---

## 📂 Project Structure
```
/auth-mern-project
│── /backend   # Node.js + Express.js (API)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│
│── /frontend  # React.js (Client)
│   ├── src/
│       ├── components
│   ├── App.js
│   ├── index.js
│
│── .gitignore
│── README.md
│── package.json
```

---

## 🔧 Installation & Setup

### **1. Clone the Repository**
```sh
git clone https://github.com/your-username/auth-mern-project.git
cd auth-mern-project
```

### **2. Backend Setup**
```sh
cd backend
npm install
```
Create a `.env` file in the backend folder and add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```
Run the backend server:
```sh
npm start
```

### **3. Frontend Setup**
```sh
cd frontend
npm install
npm start
```

---

## 🔑 Authentication Workflow
1. User signs up and receives a **JWT token** upon successful registration.
2. The token is stored in **localStorage** and used for protected routes.
3. If the user forgets their password, they can request a **password reset link** via email (NodeMailer).
4. The user receives an email with a unique token to set a new password.

---

## 📩 API Endpoints (Backend)

### **Auth Routes** (`/api/auth`)
- `POST /register` → User registration
- `POST /login` → User login (returns JWT)
- `POST /forgot-password` → Sends password reset link (NodeMailer)
- `POST /reset-password/:token` → Resets password

### **User Routes** (`/api/users`)
- `GET /` → Fetch all users (admin only)
- `GET /:id` → Fetch user by ID
- `PUT /:id` → Update user details
- `DELETE /:id` → Delete user

---

## 🔒 Security Measures
- **JWT Authentication** for user sessions
- **bcrypt.js** to hash passwords before saving them
- **Nodemailer** for secure password reset emails
- **CORS** enabled to allow frontend-backend communication

---

## 📌 Future Improvements
- Implement role-based authentication (admin/user)
- Add multi-factor authentication (MFA)
- Improve UI/UX with better styling

---

## 🎯 Contributing
Feel free to fork this repo and submit pull requests!

---

## 📜 License
This project is **open-source** under the MIT License.

---

🔗 **Follow me on GitHub**: [Your GitHub Profile](https://github.com/imane-belbachir) 🚀

