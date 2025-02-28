from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import upload, transcribe, transcription  # ✅ Import your routes

app = FastAPI()

# ✅ Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Change this if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include your API routes
app.include_router(upload.router)  
app.include_router(transcribe.router)  
app.include_router(transcription.router)  

@app.get("/")
def home():
    return {"message": "Transcription API is running!"}  # ✅ Fixed syntax error

# ✅ Run the server only if this file is executed directly
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
