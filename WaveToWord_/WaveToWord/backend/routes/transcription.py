from fastapi import APIRouter, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel
import openai
import os  # Use environment variables for API keys

# Load OpenAI API key from an environment variable
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OpenAI API key is missing. Set the OPENAI_API_KEY environment variable.")

openai.api_key = OPENAI_API_KEY

# FastAPI router
router = APIRouter()

# MongoDB connection
MONGO_URI = "mongodb://localhost:27017/"
mongo_client = MongoClient(MONGO_URI)
db = mongo_client["transcriptionDB"]
collection = db["transcriptions"]

# Ensure full-text index on transcription_text
collection.create_index([("transcription_text", "text")])

# Function to search transcriptions using full-text search
def search_transcriptions(query):
    results = collection.find(
        {"$text": {"$search": query}},
        {"score": {"$meta": "textScore"}}
    ).sort([("score", {"$meta": "textScore"})]).limit(3)

    return [doc["transcription_text"] for doc in results]

# Function to generate OpenAI response
def get_openai_response(question, context):
    client = openai.OpenAI() 
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful AI assistant."},
            {"role": "user", "content": f"Context: \n{context}\n\nQuestions: {question}"},
        ],
        temperature=0.5
    )
    return response.choices[0].message.content 

# Define request model for updating transcription
class UpdateTranscriptionRequest(BaseModel):
    transcription_text: str

# Endpoint to get transcription by request_id
@router.get("/transcription/{request_id}")
async def get_transcription(request_id: str):
    """Retrieves transcription text from MongoDB for the given request_id."""
    
    transcription = collection.find_one({"request_id": request_id})
    if not transcription:
        raise HTTPException(status_code=404, detail="Transcription not found")

    return {
        "request_id": transcription["request_id"],
        "filename": transcription["filename"],
        "transcription_text": transcription["transcription_text"]
    }

# Endpoint to update transcription text
@router.put("/update_transcription/{request_id}")
async def update_transcription(request_id: str, request: UpdateTranscriptionRequest):
    """Updates the transcription text with user edits from the frontend text editor."""
    
    transcription = collection.find_one({"request_id": request_id})
    if not transcription:
        raise HTTPException(status_code=404, detail="Transcription not found")

    result = collection.update_one(
        {"request_id": request_id},
        {"$set": {"transcription_text": request.transcription_text}}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Failed to update transcription")

    return {"message": "Transcription updated successfully"}

# QnA endpoint using transcriptions
@router.post("/qna")
async def qna_endpoint(data: dict):
    """Answers a question based on stored transcriptions."""
    
    question = data.get("question")
    if not question:
        raise HTTPException(status_code=400, detail="Question is required")

    # Fetch relevant transcriptions
    transcriptions = search_transcriptions(question)
    if not transcriptions:
        return {"answer": "No relevant transcription found."}

    context = "\n".join(transcriptions)  # Merge retrieved text
    answer = get_openai_response(question, context)
    
    return {"answer": answer}