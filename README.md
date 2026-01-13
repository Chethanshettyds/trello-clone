# Trello Clone - Full Stack Project Management Application

A fully functional Trello clone built with React, TypeScript, Node.js, Express, and MongoDB. Features drag-and-drop functionality, real-time updates, and a clean, modern UI.

## 🚀 Features

- **Board Management**: Create, edit, and delete boards with custom background colors
- **List Management**: Add, rename, reorder, and delete lists within boards
- **Card Management**: Create, edit, move, and delete cards with descriptions
- **Drag & Drop**: Intuitive drag-and-drop interface for cards and lists
- **Responsive Design**: Works seamlessly on desktop and tablet devices
- **Persistent Storage**: All data stored in MongoDB
- **Type Safety**: Full TypeScript implementation on both frontend and backend
- **Production Ready**: Error handling, validation, and optimized performance

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **React Beautiful DnD** for drag-and-drop
- **Axios** for API calls
- **CSS Modules** for styling

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **Express Validator** for request validation
- **CORS** enabled for cross-origin requests

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd trello-clone
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/trello-clone
NODE_ENV=development" > .env

# Start MongoDB (in a separate terminal)
mongod

# Run backend server
npm run dev
```

The backend server will start on http://localhost:5000

### 3. Frontend Setup
```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Run frontend server
npm start
