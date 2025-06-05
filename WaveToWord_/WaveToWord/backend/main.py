from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import upload, transcribe, transcription

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router)  
app.include_router(transcribe.router)  
app.include_router(transcription.router)  

@app.get("/")
def home():
    return {"message": "Transcription API is running!"}  

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
