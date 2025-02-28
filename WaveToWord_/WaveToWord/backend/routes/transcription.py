from fastapi import APIRouter, HTTPException
from pymongo import MongoClient
from pydantic import BaseModel

router = APIRouter()

MONGO_URI = "mongodb://localhost:27017/"
mongo_client = MongoClient(MONGO_URI)
db = mongo_client["transcriptionDB"]
collection = db["transcriptions"]

# Define the request model for updating transcription
class UpdateTranscriptionRequest(BaseModel):
    transcription_text: str

# Fetches the transcription from MongoDB using requestID
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

# Updates the transcription in MongoDB with requestID and updated_text
@router.put("/update_transcription/{request_id}")
async def update_transcription(request_id: str, request: UpdateTranscriptionRequest):
    """Updates the transcription text with user edits from the frontend text editor."""
    
    transcription = collection.find_one({"request_id": request_id})
    if not transcription:
        raise HTTPException(status_code=404, detail="Transcription not found")

    # Update the transcription text
    result = collection.update_one(
        {"request_id": request_id},
        {"$set": {"transcription_text": request.transcription_text}}
    )

    if result.modified_count == 0:
        raise HTTPException(status_code=500, detail="Failed to update transcription")

    return {"message": "Transcription updated successfully"}
