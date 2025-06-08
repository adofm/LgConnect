# LG Connect Documentation

This document provides detailed information about setting up, installing, and using LG Connect.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [AI Assistant Features](#ai-assistant-features)
- [Contributing](#contributing)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- OpenAI API Key
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lg-connect.git
cd lg-connect
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Configuration

### Backend Configuration

Create a `.env` file in the backend directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

### Frontend Configuration

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
  - Request body: `{ username, email, password }`
  - Response: `{ token, user }`

- `POST /api/auth/login` - Login user
  - Request body: `{ email, password }`
  - Response: `{ token, user }`

- `GET /api/auth/me` - Get current user
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ user }`

### Message Endpoints

- `GET /api/messages/:userId` - Get messages between users
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ messages: [] }`

- `POST /api/messages` - Send a new message
  - Headers: `Authorization: Bearer <token>`
  - Request body: `{ receiverId, content }`
  - Response: `{ message }`

- `POST /api/messages/ai/preview` - Get AI message preview
  - Headers: `Authorization: Bearer <token>`
  - Request body: `{ prompt }`
  - Response: `{ preview }`

- `POST /api/messages/ai/send` - Send AI-generated message
  - Headers: `Authorization: Bearer <token>`
  - Request body: `{ receiverId, prompt }`
  - Response: `{ message }`

## AI Assistant Features

### Message Generation
The AI assistant can generate contextual responses based on the conversation history and user prompts.

### Message Summarization
Users can request summaries of long conversations or specific message threads.

### Message Translation
The AI can translate messages between different languages while maintaining context.

### Message Formatting
The AI can format messages professionally, including:
- Business communication
- Casual conversation
- Formal letters
- Technical documentation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write tests for new features
- Update documentation for API changes
- Ensure all tests pass before submitting PR

### Code Style

- Use ESLint for frontend code
- Use Prettier for code formatting
- Follow the Airbnb JavaScript Style Guide
- Use meaningful variable and function names

## Troubleshooting

### Common Issues

1. **Socket Connection Failed**
   - Check if backend server is running
   - Verify CORS settings
   - Check network connectivity

2. **AI Message Generation Fails**
   - Verify OpenAI API key
   - Check API rate limits
   - Ensure proper request format

3. **Authentication Issues**
   - Verify JWT token
   - Check token expiration
   - Ensure proper headers

For more help, please open an issue in the repository. 