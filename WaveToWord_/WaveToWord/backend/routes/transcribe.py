from fastapi import APIRouter, HTTPException
from openai import OpenAI
from pymongo import MongoClient
from pathlib import Path
from dotenv import load_dotenv
import os
import logging

load_dotenv()

print("API Key from .env:", os.getenv("OPENAI_API_KEY"))  # Debugging


router = APIRouter()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

MONGO_URI = "mongodb://localhost:27017/"
mongo_client = MongoClient(MONGO_URI)
db = mongo_client["transcriptionDB"]
collection = db["transcriptions"]

TEMP_DIR = Path("./temp")

# Processes the uploaded file and transcribes it using OpenAI Whisper.
# Stores the requestID, filename and transcription text in MongoDB
# If successful, returns transcription successful message with details
@router.post("/transcribe/{request_id}")
async def transcribe_audio(request_id: str):
    logging.info(f"Received transcription request for: {request_id}")
    matching_files = list(TEMP_DIR.glob(f"{request_id}_*.mp3"))
    if not matching_files:
        raise HTTPException(status_code=404, detail="Audio file not found")

    file_path = matching_files[0]

    try:
        with file_path.open("rb") as audio_file:
            transcription_response = client.audio.transcriptions.create(
                model="whisper-1", 
                file=audio_file
            )

        transcription_data = {
            "request_id": request_id,
            "filename": file_path.name.split("_", 1)[1],
            "transcription_text": transcription_response.text
        }
        collection.insert_one(transcription_data)

        return {
            "message": "Transcription successful",
            "request_id": request_id,
            "filename": transcription_data["filename"],
            "transcription_text": transcription_data["transcription_text"]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in transcription: {str(e)}")

    finally:
        if file_path.exists():
            file_path.unlink()
