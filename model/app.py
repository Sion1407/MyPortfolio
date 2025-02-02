from gpt4all import GPT4All
import sys
import logging
import traceback

# Configure logging
logging.basicConfig(
    level=logging.INFO,  # Set the logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
    format="%(asctime)s - %(levelname)s - %(message)s",  # Log format
    handlers=[
        logging.FileHandler("chatbot.log"),  # Log to a file
        logging.StreamHandler(sys.stdout)  # Log to the console
    ]
)

logger = logging.getLogger(__name__)

def generate_response(question):
    """Generate a response using the GPT4All model"""
    try:
        logger.info("Loading GPT4All model...")
        model = GPT4All("mistral-7b-instruct-v0.1.Q4_0.gguf")
        logger.info("Model loaded successfully.")

        # Sample chatbot data
        chatbot_data = """
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

        logger.info("Generating response...")
        prompt = chatbot_data + "\n\nQ: " + question + "\nA:"
        response = model.generate(prompt)
        logger.info("Response generated successfully.")
        return response
    except Exception as e:
        logger.error(f"Error in generate_response: {str(e)}")
        logger.error(traceback.format_exc())  # Log the full traceback
        return f"Error in Python script: {str(e)}"

if __name__ == "__main__":
    try:
        logger.info("Starting chatbot script...")
        # Read the user's message from command-line arguments
        if len(sys.argv) > 1:
            user_message = sys.argv[1]
            logger.info(f"User message received: {user_message}")
            response = generate_response(user_message)
            logger.info(f"Response: {response}")
            print(response)
        else:
            logger.error("Error: No message provided.")
            print("Error: No message provided.")
    except Exception as e:
        logger.error(f"Error in __main__: {str(e)}")
        logger.error(traceback.format_exc())  # Log the full traceback
        print(f"Error: {str(e)}")