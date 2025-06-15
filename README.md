# 🕒 Miqat - Doctor Appointment Booking App

**Miqat** is a full-stack web application that allows users to book appointments with doctors online. It aims to simplify the process of scheduling medical visits by offering an intuitive platform for both patients and doctors.

---

## 📌 Features

### 👤 Patients
- Register and log in securely
- Search for doctors by specialty
- View doctor profiles
- Book, view, or cancel appointments
- Manage appointment history

### 👨‍⚕️ Doctors
- Register and log in
- Set availability
- View and manage booked appointments
- Customize profile (specialty, description, etc.)

### 💡 Admin (Future Scope)
- Manage users and appointments
- Oversee platform activity

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- React Router
- Axios
- React Bootstrap or Tailwind CSS

### Backend
- **Node.js** + **Express.js**
- MongoDB (via Mongoose)
- JWT Authentication
- bcrypt.js for password hashing

### Tools
- Postman (API testing)
- Nodemailer (optional: email reminders)
- Stripe or PayPal (optional: payments)

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)
- Git

---

### 1. Clone the Repo

```bash
git clone https://github.com/ikramzai/Miqat.git
cd miqat
2. Backend Setup
bash
Copy code
cd backend
npm install
Create a .env file and add the following:

ini
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the server:

bash
Copy code
npm run dev
3. Frontend Setup
bash
Copy code
cd ../frontend
npm install
npm start
The frontend will run at http://localhost:3000
The backend will run at http://localhost:5000

📁 Project Structure
arduino
Copy code
miqat/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
📦 Future Features
Chatbot support

Video consultations

AI-powered doctor recommendations

SMS & email reminders

Admin dashboard

📄 License
This project is open-source and available under the MIT License.

🙋‍♀️ About the Author
Developed by Ikrame Zaikou
Miqat is a learning and development project aiming to bring accessible digital healthcare scheduling to users.