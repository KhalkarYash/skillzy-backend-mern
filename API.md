# Skillzy API Documentation

## Base URL
```
http://localhost:6969
```

## Authentication
All protected routes require a JWT token sent in an HTTP-only cookie.

## User Endpoints

### 1. User Signup
```http
POST /user/signup
```

**Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "name": "string",
  "mobile": "string"
}
```

**Response:**
```json
{
  "message": "User created successfully!",
  "data": {
    "username": "string",
    "name": "string",
    "mobile": "string",
    "purchasedCourses": []
  }
}
```

### 2. User Login
```http
POST /user/login
```

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "User logged in successfully!",
  "data": {
    "username": "string",
    "name": "string",
    "mobile": "string"
  }
}
```

### 3. User Logout
```http
POST /user/logout
```

**Response:**
```json
{
  "message": "User logged out successfully!"
}
```

### 4. Purchase Course
```http
POST /user/purchase-course/:courseId
```

**Parameters:**
- courseId: MongoDB ObjectId

**Response:**
```json
{
  "message": "Course purchased successfully!"
}
```

### 5. My Courses
```http
GET /user/my-courses
```

**Response:**
```json
{
  "courses": [
    {
      "title": "string",
      "description": "string",
      "price": "number",
      "imageLink": "string"
    }
  ]
}
```

## Admin Endpoints

### 1. Admin Signup
```http
POST /admin/signup
```

**Request Body:**
```json
{
  "username": "string",
  "password": "string",
  "name": "string",
  "mobile": "string"
}
```

**Response:**
```json
{
  "message": "Admin created successfully!",
  "data": {
    "username": "string",
    "name": "string",
    "mobile": "string"
  }
}
```

### 2. Admin Login
```http
POST /admin/login
```

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Admin logged in successfully!",
  "data": {
    "username": "string",
    "name": "string",
    "mobile": "string"
  }
}
```

### 3. Admin Logout
```http
POST /admin/logout
```

**Response:**
```json
{
  "message": "Admin logged out successfully!"
}
```

### 4. Add Course
```http
POST /admin/add-course
```

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "price": "number",
  "imageLink": "string"
}
```

**Response:**
```json
{
  "message": "Course created successfully!"
}
```

## Payment Endpoints

### 1. Create Payment
```http
POST /payment/create
```

**Request Body:**
```json
{
  "courseId": "string",
  "amount": "number"
}
```

### 2. Payment Webhook
```http
POST /payment/webhook
```

### 3. Verify Payment
```http
POST /payment/verify
```

**Request Body:**
```json
{
  "razorpay_order_id": "string",
  "razorpay_payment_id": "string",
  "razorpay_signature": "string"
}
```

## Public Endpoints

### 1. List All Courses
```http
GET /courses
```

**Response:**
```json
{
  "courses": [
    {
      "title": "string",
      "description": "string",
      "price": "number",
      "imageLink": "string"
    }
  ]
}
```

## Error Responses
All endpoints return error responses in the following format:

```json
{
  "message": "ERROR: {error message}"
}
```

## Status Codes
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found