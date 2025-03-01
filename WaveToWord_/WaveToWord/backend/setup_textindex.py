from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["transcriptionDB"]
collection = db["transcriptions"]

# Create a text index on the transcription_text field
collection.create_index([("transcription_text", "text")])

print("Text index created successfully!")
