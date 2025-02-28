from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path
import shutil
import uuid

router = APIRouter()

TEMP_DIR = Path("./temp")
TEMP_DIR.mkdir(exist_ok=True)

MAX_FILE_SIZE_MB = 5
MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

# Uploads an audio file and stores it temporarily.
# Checks if the file is an .mp3 and is not more than 5MB
# Finally returns requestID and filename
@router.post("/upload/")
async def upload_audio(file: UploadFile = File(...)):    
    if not file.filename.endswith(".mp3"):
        raise HTTPException(status_code=400, detail="Only MP3 files are allowed")

    file.file.seek(0, 2)  # Move cursor to the end of the file
    file_size = file.file.tell()  # Get file size
    file.file.seek(0)  # Reset cursor
    
    if file_size > MAX_FILE_SIZE_BYTES:
        raise HTTPException(status_code=400, detail=f"File size exceeds {MAX_FILE_SIZE_MB}MB limit")

    request_id = str(uuid.uuid4())  
    temp_file_path = TEMP_DIR / f"{request_id}_{file.filename}"

    with temp_file_path.open("wb") as temp_file:
        shutil.copyfileobj(file.file, temp_file)

    return {
        "message": "File uploaded successfully",
        "request_id": request_id,
        "filename": file.filename
    }
