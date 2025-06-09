#!/bin/bash

# Backend changes
git add backend/src/controllers/message.controller.js
git commit -m "feat(backend): Enhance message controller with AI functionality
- Add OpenAI integration for AI message generation
- Implement function-based response handling
- Add message preview endpoint
- Improve socket event handling for real-time updates
- Add proper error handling for AI responses"

git add backend/src/models/message.model.js
git commit -m "feat(backend): Update message model schema
- Add isAI flag to identify AI-generated messages
- Maintain backward compatibility with existing messages
- Add proper schema validation for AI messages"

git add backend/src/routes/message.route.js
git commit -m "feat(backend): Add AI message routes
- Add /ai/preview endpoint for message previews
- Add /ai/send endpoint for sending AI messages
- Implement proper route protection
- Add route documentation"

# Frontend changes
git add frontend/index.html
git commit -m "feat(frontend): Update application branding
- Change app title to LG Connect
- Update favicon and metadata
- Improve SEO settings"

git add frontend/src/components/ChatContainer.jsx
git commit -m "feat(frontend): Enhance chat container component
- Improve message display for AI messages
- Add proper message alignment based on sender
- Update profile picture handling
- Add timestamp formatting
- Improve message scrolling behavior"

git add frontend/src/store/useChatStore.js
git commit -m "feat(frontend): Implement robust message handling
- Add real-time message updates
- Implement proper socket event handling
- Add message state management
- Improve error handling
- Add loading states for messages"

git add frontend/src/components/AISidebar.jsx
git commit -m "feat(frontend): Add AI assistant sidebar
- Implement message preview functionality
- Add accept/reject message options
- Add loading states for AI generation
- Improve error handling
- Add proper UI feedback"

git add frontend/src/pages/Credits.jsx
git commit -m "feat(frontend): Add Credits page
- Create new Credits page component
- Implement black and white theme
- Add developer cards with skills
- Add social media links
- Add responsive grid layout"

git add frontend/src/App.jsx
git commit -m "feat(frontend): Add Credits route
- Add Credits page route
- Implement proper route protection
- Maintain existing authentication flow"

git add frontend/src/pages/Welcome.jsx
git commit -m "feat(frontend): Add Credits button
- Add Credits button to Welcome page
- Maintain existing styling
- Add proper button transitions"

# Add and commit package files
git add frontend/package.json frontend/package-lock.json
git commit -m "chore(frontend): Update dependencies
- Add required packages for Credits page
- Update package versions"

# Push all changes
git push origin main 