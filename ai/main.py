
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from typing import List
from PIL import Image
import io
import sqlite3
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel
import os
from fastapi.responses import FileResponse






# from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This allows requests from any origin
    allow_credentials=True,
    allow_methods=["*"],  # This allows all HTTP methods
    allow_headers=["*"],  # This allows all headers
)

class PoacherImage(BaseModel):
    id: int
    filename: str
    timestamp: str
    camera: str
    image_url: str
origins = [
    "http://localhost:5173",  # Replace with the URL of your React app
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# app = FastAPI()

# Connect to SQLite database
conn = sqlite3.connect('poacher_images.db')
cursor = conn.cursor()

# Create table if not exists
cursor.execute('''CREATE TABLE IF NOT EXISTS poacher_images
                  (id INTEGER PRIMARY KEY AUTOINCREMENT, filename TEXT, timestamp TEXT, camera TEXT)''')



@app.get("/test/")
async def test_endpoint():
    # print("came here")
    # return {"message": "This is a test endpoint. It's working!"}
    return JSONResponse(content={"message": "hi"})

@app.post("/upload/")
async def upload_image(files: List[UploadFile] = File(...)):
    print("hi")
    try:
        # Check if no files are provided
        if not files:
            print("No files provided.")
            return JSONResponse(status_code=400, content={"message": "No files provided."})

        # Iterate over each uploaded file
        for file in files:
            if file.content_type.startswith("image"):
                print(f"Processing file: {file.filename}")

                # Read the image file
                content = await file.read()
                print("File read successfully.")

                # Convert bytes to PIL Image
                pil_image = Image.open(io.BytesIO(content))
                print("Image converted to PIL format.")

                # Save image with timestamp and camera identifier
                timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
                filename = f"assets/poacher_{timestamp}.jpg"
                pil_image.save(filename)
                print(f"Image saved as {filename}")

                # Insert data into SQLite database
                cursor.execute("INSERT INTO poacher_images (filename, timestamp, camera) VALUES (?, ?, ?)", (filename, timestamp, file.filename))
                conn.commit()
                print("Data inserted into SQLite database.")

        return {"message": f"{len(files)} image(s) uploaded successfully."}

    except Exception as e:
        # Print the exception if any error occurs
        print(f"An error occurred: {e}")
        return JSONResponse(status_code=500, content={"message": "An error occurred during file upload."})


@app.get('/poacher_images')
async def get_poacher_images():
    # Fetch data from SQLite database
    cursor.execute("SELECT * FROM poacher_images")
    rows = cursor.fetchall()

    # Convert data to a list of dictionaries
    poacher_images = []
    # for row in rows:
    #     poacher_images.append({
    #         "id": row[0],
    #         "filename": row[1],
    #         "timestamp": row[2],
    #         "camera": row[3]
    #     })
    for row in rows:
        image_filename = row[1]
        # image_url = f"/assets/{image_filename}"  # Construct the URL for the image
        # image_url = f"http://localhost:8000/image/{image_filename}"

        poacher_images.append({
            "id": row[0],
            "filename": row[1],
            "timestamp": row[2],
            "camera": row[3],
            # "image_url": image_url  # Include the image URL in the response
        })
        for image in poacher_images:
            image_filename = image['filename']
            # Remove the 'assets/' prefix from the filename
            if image_filename.startswith("assets/"):
                image_filename = image_filename[len("assets/"):]
            image['image_url'] = f"http://localhost:8000/assets/{image_filename}"
        # for image in poacher_images:
        #     image_filename = image['filename']
        #     image['image_url'] = f"http://localhost:8000/assets/{image_filename}"
            # image['image_url'] = f"http://localhost:8000/assets/poacher_2024-05-04_18-22-10.jpg"


    return {"poacher_images": poacher_images}

@app.get("/assets/{image_filename}")
async def get_image(image_filename: str):
    # Assuming images are stored in an 'assets' directory
    image_path = os.path.join("assets", image_filename)
    if os.path.exists(image_path):
        return FileResponse(image_path)
    else:
        return JSONResponse(status_code=404, content={"message": "Image not found."})



@app.on_event("shutdown")
def shutdown_event():
    conn.close()
