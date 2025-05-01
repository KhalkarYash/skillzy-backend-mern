# Skillzy - Course Management System

A robust backend API for an online learning platform built with Node.js, Express, and MongoDB.

## Features

- **User Management**
  - User registration and authentication
  - JWT-based authentication
  - Protected user routes
  - Course purchase functionality
  - View purchased courses

- **Admin Management**
  - Admin registration and authentication
  - Protected admin routes
  - Course creation and management

- **Course Management**
  - List all courses
  - Course purchase handling
  - Course details management

- **Payment Integration**
  - Razorpay payment gateway integration
  - Payment verification
  - Webhook handling

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt.js for password hashing
- Razorpay Payment Gateway
- Cookie Parser
- CORS

## API Endpoints

### User Routes
```http
POST /user/signup     # Register new user
POST /user/login      # User login
POST /user/logout     # User logout
POST /user/purchase-course/:courseId  # Purchase a course
GET  /user/my-courses # Get user's purchased courses
```

### Admin Routes
```http
POST /admin/signup    # Register new admin
POST /admin/login     # Admin login
POST /admin/logout    # Admin logout
POST /admin/add-course # Add new course
```

### Payment Routes
```http
POST /payment/create   # Create payment
POST /payment/webhook  # Payment webhook
POST /payment/verify  # Verify payment
```

### Public Routes
```http
GET /courses         # Get all courses
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGO_URL=your_mongodb_url
PORT=6969
JWT_SECRET=your_jwt_secret
CLIENT=http://localhost:5173
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
SERVER=development
```

## Installation

1. Clone the repository
```bash
git clone <repository-url>
```

2. Install dependencies
```bash
cd server
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Start the server
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## Database Models

### User Model
```javascript
{
  username: String, // unique
  password: String,
  name: String,
  mobile: String, // unique
  purchasedCourses: [CourseId]
}
```

### Admin Model
```javascript
{
  username: String, // unique
  password: String,
  name: String,
  mobile: String // unique
}
```

### Course Model
```javascript
{
  title: String,
  description: String,
  price: Number,
  imageLink: String
}
```

### Payment Model
```javascript
{
  userId: ObjectId,
  courseId: ObjectId,
  paymentId: String,
  orderId: String,
  amount: Number,
  currency: String,
  status: String,
  notes: Object
}
```

## Project Structure

```
📁 server
├── 📁 src
│   ├── 📁 config
│   ├── 📁 controllers
│   ├── 📁 middleware
│   ├── 📁 models
│   └── 📁 routes
├── 📄 .env
├── 📄 package.json
└── 📄 server.js
```

## API Documentation

Detailed API documentation can be found in the [API.md](API.md) file.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Node.js community
- Express.js framework
- MongoDB team
- Razorpay payment gateway
