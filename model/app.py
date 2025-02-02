# import logging  # Import the logging module
# import os
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from gpt4all import GPT4All

# # Configure logging
# logging.basicConfig(
#     level=logging.INFO,  # Set the logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
#     format="%(asctime)s - %(levelname)s - %(message)s",  # Log format
#     handlers=[
#         logging.FileHandler("chatbot.log", encoding="utf-8"),  # Log to a file
#         logging.StreamHandler()  # Log to the console
#     ]
# )

# logger = logging.getLogger(__name__)

# # Initialize the FastAPI app
# app = FastAPI()
# # Load the GPT4All model
# # try:
# #     logger.info("Loading GPT4All model...")
# #     model = GPT4All("mistral-7b-instruct-v0.1.Q4_0.gguf")
# #     logger.info("Model loaded successfully.")
# # except Exception as e:
# #     logger.error(f"Failed to load GPT4All model: {str(e)}")
# #     raise RuntimeError(f"Failed to load GPT4All model: {str(e)}")

# # Load the smaller GPT4All model
# try:
#     logger.info("Loading GPT4All-J model...")
#     p = "D:/ProtFolioWebsite/model/ggml-gpt4all-j-v1.3-groovy.bin"
#     model = GPT4All(model_name="ggml-gpt4all-j-v1.3-groovy.bin", model_path="D:/ProtFolioWebsite/model/")
#     # model = GPT4All("ggml-gpt4all-j-v1.3-groovy.bin",model_path=path)  # Load from local folder
#     logger.info("Model loaded successfully.")
# except Exception as e:
#     logger.error(f"Failed to load GPT4All model: {str(e)}")
#     raise RuntimeError(f"Failed to load GPT4All model: {str(e)}")

# # Sample chatbot data
# chatbot_data = """
# Sion Chowdhury is a Java Backend Developer with over 2 years of experience at Nisum.
# He specializes in building scalable, high-performance applications using Java, Spring Boot, Kafka, SQL Server, and WebFlux.
# He has contributed to enhancing ecommerce platforms and participated in greenfield projects, leveraging modern technologies to ensure scalability and performance.

# Professional Experience:

# Nisum, Backend Developer (Aug 2022 - Present):

# Worked on the "Schedule & Save" feature for Albertsons' ecommerce website, focusing on development, support, and adding new features to the existing code.

# Contributed to a greenfield project, developing a new platform from scratch using modern technologies and best practices to ensure scalability, performance, and maintainability.

# Developed an in-house platform that saved the client approximately $1M by eliminating dependency on third-party solutions.

# Actively participated in API development, code enhancements, and implementing new functionalities for Safeway's ecommerce experience.

# Tech Stack: Java 17, Reactive Programming, Spring WebFlux, MS SQL, Kafka, Azure, Spring Cloud.

# Received the 'Excellence Award' from Nisum and the Rockstar Award from the client for outstanding contributions and dedication to project success.

# Projects:
# 1️⃣ URL Shortener Service - Developed a full-stack URL shortener application using Spring Boot and PostgreSQL. The service includes generating unique short URLs, redirecting to original URLs, and managing link expiration. Nginx was used for load balancing to optimize performance and scalability.
# 2️⃣ Smart Resume Picker - A job application portal that allows candidates to upload resumes in PDF format. The system securely stores resumes and is working on implementing a feature to automatically suggest candidates based on their experience and skill set.

# Education:

# Bachelor of Computer Engineering from Savitribai Phule Pune University (D.Y. Patil College of Engineering) with a CGPA of 8.96/10.
# """

# # Define the request body structure
# class QuestionRequest(BaseModel):
#     question: str

# # Define the API endpoint
# @app.post("/ask")
# def ask_question(request: QuestionRequest):
#     """Generate a response using the GPT4All model"""
#     logger.info("Received a new question.")
#     try:
#         # Generate the response
#         prompt = "\n\nQ: " + request.question + "\nA:"
#         logger.info(f"Prompt: {prompt}")
#         response = model.generate(prompt)
#         logger.info(f"Response generated: {response}")
#         return {"answer": response}
#     except Exception as e:
#         logger.error(f"Error generating response: {str(e)}")
#         raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")
# @app.get("/test")
# def check():
#     logger.info("FastAPI working.")
#     return {"answer": "Hello World"}

# # Run the application
# if __name__ == "__main__":
#     import uvicorn
#     port = int(os.environ.get("PORT", 8000))
#     logger.info(f"Starting FastAPI server on port {port}...")
#     uvicorn.run(app, host="0.0.0.0", port=port)



import os
import logging
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai

# from dotenv import load_dotenv

# if not load_dotenv():
#     logging.warning("No .env file found or it is empty. Proceeding with system environment variables.")

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI
app = FastAPI()

# Set up Google API Key
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise RuntimeError("Google API key not found. Set GOOGLE_API_KEY in environment or .env file.")

genai.configure(api_key=GOOGLE_API_KEY)

# Load the Smallest Gemini Model (for Speed & Cost Efficiency)
try:
    logger.info("Initializing Gemini model...")
    model = genai.GenerativeModel("gemini-1.5-flash-001")  # Fastest & cheapest
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
