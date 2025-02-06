# AI Email Writer Extension  

This project is a web-based AI-powered email assistant designed to generate professional replies based on email content. It consists of three main components:  

- Backend: A Spring Boot REST API that processes email content and generates responses.  
- Frontend: A React-based UI that provides a user-friendly interface for managing email responses.  
- Browser Extension: A Chrome extension that integrates directly into Gmail, allowing users to generate AI-powered replies with a single click.  

# Features  

- AI-Powered Email Replies: Automatically generates email responses based on context.  
- Gmail Integration: Adds an "AI Reply" button to the Gmail compose window.  
- Spring Boot Backend: Handles AI response generation and API requests.  
- React Frontend: Provides an interface for managing AI responses.  

# Setup Instructions  

# Backend (Spring Boot)  

1. Clone the repository.  
2. Navigate to the backend directory.
3. Add your gemini API key in `application.properties`. 
4. Run `mvn clean install` to build the project.  
5. Start the Spring Boot application using `mvn spring-boot:run`.  

# Frontend (React)  

1. Navigate to the frontend directory.  
2. Run `npm install` to install dependencies.  
3. Start the frontend using `npm start`.  

### Browser Extension  

1. Navigate to `chrome://extensions/`.  
2. Enable "Developer mode."  
3. Click "Load unpacked" and select the extension folder.  

# API Endpoints  

- `POST /api/email/generate` – Accepts email content and generates a reply.  

# Technologies Used  

- Spring Boot (Java) – Backend API  
- React – Frontend UI  
- JavaScript (Chrome Extension) – Gmail integration  

Let me know if you need modifications! 🚀
