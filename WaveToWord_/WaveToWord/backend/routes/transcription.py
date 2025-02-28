from fastapi import APIRouter, HTTPException
from pymongo import MongoClient

router = APIRouter()

MONGO_URI = "mongodb://localhost:27017/"
mongo_client = MongoClient(MONGO_URI)
db = mongo_client["transcriptionDB"]
collection = db["transcriptions"]

# Fetches the transcription from MongoDB using requestID
# this is for displaying transcription text in Editor in frontend
@router.get("/transcription/{request_id}")
async def get_transcription(request_id: str):
    
    transcription = collection.find_one({"request_id": request_id})
    if not transcription:
        raise HTTPException(status_code=404, detail="Transcription not found")

    return {
        "request_id": transcription["request_id"],
        "filename": transcription["filename"],
        "transcription_text": transcription["transcription_text"]
    }

# Updates the transcription in MongoDB with requestID and updated_text
# Once the text is updated in frontend it is stored in the MongoDB
@router.put("/update_transcription/{request_id}")
async def update_transcription(request_id: str, updated_text: dict):
    """Updates the transcription text with user edits from the frontend text editor."""
    
    transcription = collection.find_one({"request_id": request_id})
    if not transcription:
        raise HTTPException(status_code=404, detail="Transcription not found")

    collection.update_one(
        {"request_id": request_id},
        {"$set": {"transcription_text": updated_text["transcription_text"]}}
    )

    return {"message": "Transcription updated successfully"}
