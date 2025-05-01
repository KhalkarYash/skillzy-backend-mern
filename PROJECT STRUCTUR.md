````markdown
// filepath: d:\Projects\Skillzy\server\PROJECT-STRUCTURE.md
# Project Structure

```
📁 server
├── 📁 src
│   ├── 📁 config
│   │   └── 📄 database.js
│   ├── 📁 controllers
│   │   ├── 📄 admin.controller.js
│   │   ├── 📄 course.controller.js
│   │   ├── 📄 payment.controller.js
│   │   └── 📄 user.controller.js
│   ├── 📁 middlewares
│   │   ├── 📄 admin.auth.js
│   │   └── 📄 user.auth.js
│   ├── 📁 models
│   │   ├── 📄 admin.model.js
│   │   ├── 📄 course.model.js
│   │   ├── 📄 payment.model.js
│   │   └── 📄 user.model.js
│   ├── 📁 routes
│   │   ├── 📄 admin.routes.js
│   │   ├── 📄 course.routes.js
│   │   ├── 📄 payment.routes.js
│   │   └── 📄 user.routes.js
│   └── 📁 utils
│       └── 📄 razorpay.js
├── 📄 .env
├── 📄 [.env.example](http://_vscodecontentref_/1)
├── 📄 .gitignore
├── 📄 [API.md](http://_vscodecontentref_/2)
├── 📄 [package.json](http://_vscodecontentref_/3)
├── 📄 PROJECT-STRUCTURE.md
└── 📄 [README.md](http://_vscodecontentref_/4)

## Directory Details

### /src
Main source code directory containing all application logic

### /config
Configuration files for database, environment variables, etc.

### /controllers
Request handlers and business logic for different routes

### /middlewares
Authentication and other middleware functions

### /models
Database models and schemas

### /routes
Route definitions and API endpoints

### /utils
Utility functions and helper modules