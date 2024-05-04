from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from typing import List
from detect_poacher import is_poacher
from PIL import Image
import io
import sqlite3
import os
from datetime import datetime

app = FastAPI()

# Connect to SQLite database
conn = sqlite3.connect('poacher_images.db')
cursor = conn.cursor()


new_poachers = []
# Create table if not exists
cursor.execute('''CREATE TABLE IF NOT EXISTS poacher_images
                  (id INTEGER PRIMARY KEY AUTOINCREMENT, filename TEXT, timestamp TEXT, camera TEXT)''')

@app.post("/upload/")
async def upload_image(files: List[UploadFile] = File(...)):
    # Check if no files are provided
    if not files:
        return JSONResponse(status_code=400, content={"message": "No files provided."})

    # Iterate over each uploaded file
    if files[0].content_type.startswith("image"):
        # Read the image file
        content = await files[0].read()

        # Convert bytes to PIL Image
        pil_image = Image.open(io.BytesIO(content))
        poacher = is_poacher(pil_image)

        # Save image with timestamp and camera identifier if poacher is detected
        if poacher:
            timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
            filename = f"assets/poacher_{timestamp}.jpg"
            #TODO: this filename's location is to be made such that frontend can access it too. 
            camera = "cam1"  # Change this to the appropriate camera identifier
            pil_image.save(filename)
            new_poachers.append({"cam": camera, "time":timestamp, "img_path":filename})
            # Insert data into SQLite database
            cursor.execute("INSERT INTO poacher_images (filename, timestamp, camera) VALUES (?, ?, ?)", (filename, timestamp, camera))
            conn.commit()

            return {"message": "Poacher detected and image saved."}
        else:
            return {"message": "No poacher detected."}

    return JSONResponse(status_code=400, content={"message": "No image files provided."})

@app.get('/new_info')
async def get_new_poachers():
    global new_poachers  
    temp = new_poachers
    new_poachers = []
    return {"info": temp}
    
# Close SQLite connection when application stops
@app.on_event("shutdown")
def shutdown_event():
    conn.close()
