import os
import logging
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from fastapi.middleware.cors import CORSMiddleware

# from dotenv import load_dotenv

# if not load_dotenv():
#     logging.warning("No .env file found or it is empty. Proceeding with system environment variables.")

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific origins if needed, e.g., ["http://127.0.0.1:5500"]
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Set up Google API Key
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise RuntimeError("Google API key not found. Set GOOGLE_API_KEY in environment or .env file.")

genai.configure(api_key=GOOGLE_API_KEY)

try:
    logger.info("Initializing Gemini model...")
    model = genai.GenerativeModel("gemini-1.5-flash-001")
    logger.info("Gemini model initialized successfully.")
except Exception as e:
    logger.error(f"Failed to initialize Gemini model: {str(e)}")
    raise RuntimeError(f"Failed to initialize Gemini model: {str(e)}")

# Store Resume Data
resume_data = """
Sion Chowdhury is a Java Backend Developer with over 2 years of experience at Nisum.
He specializes in building scalable, high-performance applications using Java, Spring Boot, Kafka, SQL Server, and WebFlux.
He has contributed to enhancing ecommerce platforms and participated in greenfield projects, leveraging modern technologies to ensure scalability and performance.

Professional Experience:

Nisum, Backend Developer (Aug 2022 - Present):

Worked on the "Schedule & Save" feature for Albertsons' ecommerce website, focusing on development, support, and adding new features to the existing code.

Contributed to a greenfield project, developing a new platform from scratch using modern technologies and best practices to ensure scalability, performance, and maintainability.

Developed an in-house platform that saved the client approximately $1M by eliminating dependency on third-party solutions.

Actively participated in API development, code enhancements, and implementing new functionalities for Safeway's ecommerce experience.

Tech Stack: Java 17, Reactive Programming, Spring WebFlux, MS SQL, Kafka, Azure, Spring Cloud.

Received the 'Excellence Award' from Nisum and the Rockstar Award from the client for outstanding contributions and dedication to project success.

Projects:
1️⃣ URL Shortener Service - Developed a full-stack URL shortener application using Spring Boot and PostgreSQL. The service includes generating unique short URLs, redirecting to original URLs, and managing link expiration. Nginx was used for load balancing to optimize performance and scalability.
2️⃣ Smart Resume Picker - A job application portal that allows candidates to upload resumes in PDF format. The system securely stores resumes and is working on implementing a feature to automatically suggest candidates based on their experience and skill set.

Education:

Bachelor of Computer Engineering from Savitribai Phule Pune University (D.Y. Patil College of Engineering) with a CGPA of 8.96/10.
"""

# Request Model
class QuestionRequest(BaseModel):
    question: str

# API Endpoint for Answering Questions
@app.post("/ask")
def ask_question(request: QuestionRequest):
    """Generates a response using Gemini AI with resume context."""
    try:
        prompt = f"""
        Here is my professional resume:
        {resume_data}
        Answer the following question based on my experience:
        {request.question}
        """
        response = model.generate_content(prompt)
        return {"answer": response.text if response else "No response generated."}
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Error generating response")

# Health Check API
@app.get("/health")
def health_check():
    return {"status": "API is running"}

# Run FastAPI (Uvicorn Server)
if __name__ == "__main__":
    import uvicorn
    logger.info("Starting FastAPI server on port 8000...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
