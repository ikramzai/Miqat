# 🚀 Miqat - Setup Guide

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)
- Git

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Miqat
```

### 2. Backend Setup

```bash
cd backend
npm install
```

#### Create Environment File

Create a `.env` file in the `backend` directory with the following content:

```env
# Server Configuration
PORT=5000

# MongoDB Connection
MONGO_URI=mongodb://localhost:27017/miqat
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/miqat

# JWT Secret (Generate a strong secret for production)
JWT_SECRET=your_super_secret_jwt_key_here
```

#### Start Backend Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The backend will run at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

#### Start Frontend Development Server

```bash
npm start
```

The frontend will run at `http://localhost:3000`

## 🔧 Configuration

### MongoDB Setup

#### Option 1: Local MongoDB

1. Install MongoDB on your system
2. Start MongoDB service
3. Create a database named `miqat`

#### Option 2: MongoDB Atlas (Recommended)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace `MONGO_URI` in your `.env` file

### JWT Secret

Generate a strong JWT secret for production:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🧪 Testing the Application

### 1. Register a Doctor

- Go to `http://localhost:3000/signup`
- Select "Doctor" as user type
- Fill in the required information
- Submit the form

### 2. Register a Patient

- Go to `http://localhost:3000/signup`
- Select "Patient" as user type
- Fill in the required information
- Submit the form

### 3. Login and Test

- Login with the created accounts
- Test the dashboard functionality
- Try booking appointments

## 📁 Project Structure

```
Miqat/
├── backend/
│   ├── controllers/          # Route handlers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── server.js            # Main server file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── App.js          # Main app component
│   └── package.json
└── README.md
```

## 🔍 API Endpoints

### Authentication

- `POST /api/doctors/register` - Register a doctor
- `POST /api/doctors/login` - Login a doctor
- `POST /api/patients/register` - Register a patient
- `POST /api/patients/login` - Login a patient

### Doctors

- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/profile/me` - Get current doctor profile
- `PUT /api/doctors/profile/me` - Update doctor profile
- `DELETE /api/doctors/profile/me` - Delete doctor account

### Patients

- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `GET /api/patients/profile/me` - Get current patient profile
- `PUT /api/patients/profile/me` - Update patient profile
- `DELETE /api/patients/profile/me` - Delete patient account

### Appointments

- `POST /api/appointments` - Create appointment
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `PUT /api/appointments/:id` - Update appointment
- `PUT /api/appointments/:id/status` - Update appointment status
- `DELETE /api/appointments/:id` - Delete appointment
- `GET /api/appointments/doctor/:doctorId` - Get doctor's appointments
- `GET /api/appointments/patient/me` - Get patient's appointments

## 🚨 Common Issues & Solutions

### 1. MongoDB Connection Error

- Ensure MongoDB is running
- Check your connection string
- Verify network connectivity (for Atlas)

### 2. Port Already in Use

- Change the PORT in `.env` file
- Kill the process using the port: `lsof -ti:5000 | xargs kill -9`

### 3. CORS Errors

- The backend is configured with CORS
- Ensure frontend is running on the correct port

### 4. JWT Token Issues

- Check JWT_SECRET in `.env`
- Ensure token is being sent in Authorization header

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use strong JWT secrets in production
- Implement rate limiting for production
- Add input validation and sanitization
- Use HTTPS in production

## 🚀 Deployment

### Backend Deployment

1. Set up a cloud server (AWS, DigitalOcean, Heroku)
2. Install Node.js and MongoDB
3. Clone the repository
4. Set up environment variables
5. Run `npm start`

### Frontend Deployment

1. Build the project: `npm run build`
2. Deploy the `build` folder to a static hosting service
3. Configure environment variables for production API URL

## 📞 Support

If you encounter any issues:

1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure MongoDB is running
4. Check network connectivity

## 📝 License

This project is open-source and available under the MIT License.
