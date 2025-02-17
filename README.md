# CRUD App (React, Node.js, MongoDB)

This is a full-stack CRUD (Create, Read, Update, Delete) application built using React for the frontend and Node.js with MongoDB for the backend.

## Project Structure
```
main-folder/
│-- backend/      # Node.js & Express server
│-- frontend/     # React application
│-- README.md     # Project documentation
```

## Features
- Create, Read, Update, and Delete operations
- RESTful API built with Node.js and Express
- MongoDB for database storage
- React frontend with Axios for API requests

## Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB (local or cloud, e.g., MongoDB Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/crud-app.git
cd crud-app
```

### 2. Setup Backend
```bash
cd backend
npm install  # Install dependencies
```

#### Configure Environment Variables
Create a `.env` file in the `backend` folder and add:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

#### Start Backend Server
```bash
npm start
```
The backend will run on `http://localhost:5000`.

### 3. Setup Frontend
```bash
cd ../frontend
npm install  # Install dependencies
```

#### Configure API Endpoint
Edit `frontend/src/config.js` and set the API base URL:
```js
export const API_BASE_URL = "http://localhost:5000";
```

#### Start Frontend Server
```bash
npm start
```
The frontend will run on `http://localhost:3000`.

## API Routes
| Method | Route          | Description             |
|--------|--------------|-------------------------|
| GET    | /api/items   | Get all items           |
| POST   | /api/items   | Create a new item       |
| GET    | /api/items/:id | Get a single item       |
| PUT    | /api/items/:id | Update an item         |
| DELETE | /api/items/:id | Delete an item         |

## Technologies Used
- **Frontend:** React, Axios, Bootstrap/Tailwind (optional)
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Other:** dotenv, cors, nodemon

## License
This project is open-source and available under the MIT License.

---
Feel free to contribute and improve this project!

