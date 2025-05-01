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
```

2. API.md file:

````markdown
// filepath: [API.md](http://_vscodecontentref_/0)
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
Content-Type: application/json
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
Content-Type: application/json
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
Authorization: Bearer {token}
```

**Response:**
```json
{
  "message": "User logged out successfully!"
}
```

## Admin Endpoints

### 1. Admin Signup
```http
POST /admin/signup
Content-Type: application/json
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
Content-Type: application/json
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

## Payment Endpoints

### 1. Create Payment Order
```http
POST /payment/create
Content-Type: application/json
Authorization: Bearer {token}
```

**Request:**
```json
{
  "courseId": "string"
}
```

**Response:**
```json
{
  "orderId": "string",
  "amount": "number",
  "currency": "string",
  "receipt": "string",
  "key": "string",
  "notes": {
    "courseTitle": "string"
  }
}
```

### 2. Verify Payment
```http
GET /payment/verify
Authorization: Bearer {token}
```

**Query Parameters:**
```
orderId: string
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "order": {
    "id": "string",
    "status": "string"
  }
}
```

### 3. Payment Webhook
```http
POST /payment/webhook
X-Razorpay-Signature: {signature}
```

**Response:**
```json
{
  "received": true
}
```

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "message": "Error message here",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error information"
  }
}
```

## Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
```
