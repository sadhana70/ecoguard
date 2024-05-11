
from fastapi import FastAPI, File, UploadFile, Depends, HTTPException, status, WebSocket
from fastapi.responses import JSONResponse
from typing import List
from PIL import Image
import io
import sqlite3
from datetime import datetime, timedelta, timezone
from fastapi.middleware.cors import CORSMiddleware
# from chainsaw import main

from pydantic import BaseModel
import os
from fastapi.responses import FileResponse
import crud, models, schemas

from passlib.context import CryptContext
from models import User
from database import SessionLocal, engine
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
# from fastapi import FastAPI, WebSocket
# from starlette.applications import WebSocketApp



app = FastAPI()
'''app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This allows requests from any origin
    allow_credentials=True,
    allow_methods=["*"],  # This allows all HTTP methods
    allow_headers=["*"],  # This allows all headers
)'''
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# websocket_connections = []

# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     websocket_connections.append(websocket)
#     try:
#         while True:
#             # Handle WebSocket communication here
#             data = await websocket.receive_text()
#             await websocket.send_text(f"Received: {data}")
#     finally:
#         websocket_connections.remove(websocket)


# websocket_connections = []

# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     websocket_connections.append(websocket)
#     try:
#         while True:
#             # You can send data to the client here if needed
#             pass
#     finally:
#         websocket_connections.remove(websocket)

# async def send_notification_to_clients(notification: str):
#     for websocket in websocket_connections:
#         await websocket.send_text(notification)


class PoacherImage(BaseModel):
    id: int
    filename: str
    timestamp: str
    camera: str
    image_url: str
    
origins = [
    "http://localhost:3000",  # Origins for authentication
    "http://localhost:5173",  # Origins for image recognition
    "http://localhost:5174"   # Additional origins if any
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#login dependencies

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Your JWT secret and algorithm
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


class UserCreate(BaseModel):
    username: str
    password: str

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def create_user(db: Session, user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    return "complete"
# app = FastAPI()

# Connect to SQLite database
conn = sqlite3.connect('poacher_images.db')
cursor = conn.cursor()

conn1 = sqlite3.connect('audio_data.db')
cursor1 = conn1.cursor()
# Create table if not exists
cursor.execute('''CREATE TABLE IF NOT EXISTS poacher_images
                  (id INTEGER PRIMARY KEY AUTOINCREMENT, filename TEXT, timestamp TEXT, camera TEXT)''')

@app.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return create_user(db=db, user=user)

# Authenticate the user
def authenticate_user(username: str, password: str, db: Session):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    if not pwd_context.verify(password, user.hashed_password):
        return False
    return user

# Create access token
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=403, detail="Token is invalid or expired")
        return payload
    except JWTError:
        raise HTTPException(status_code=403, detail="Token is invalid or expired")

@app.get("/verify-token/{token}")
async def verify_user_token(token: str):
    verify_token(token=token)
    return {"message": "Token is valid"}


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
    cursor.execute("SELECT * FROM poacher_images ORDER BY id DESC")
    rows = cursor.fetchall()

    # Create a set to store unique timestamps
    unique_timestamps = set()

    # Convert data to a list of dictionaries
    poacher_images = []
    for row in rows:
        timestamp = row[2]  # Assuming timestamp is at index 2
        if timestamp not in unique_timestamps:
            unique_timestamps.add(timestamp)

            image_filename = row[1]

            poacher_images.append({
                "id": row[0],
                "filename": row[1],
                "timestamp": timestamp,
                "camera": row[3],  # Assuming camera is at index 3
                "image_url": f"http://localhost:8000/assets/{image_filename[len('assets/'):]}",
            })

    return {"poacher_images": poacher_images}


@app.get("/assets/{image_filename}")
async def get_image(image_filename: str):
    # Assuming images are stored in an 'assets' directory
    image_path = os.path.join("assets", image_filename)
    if os.path.exists(image_path):
        return FileResponse(image_path)
    else:
        return JSONResponse(status_code=404, content={"message": "Image not found."})





# Add a new table for storing audio data
cursor1.execute('''CREATE TABLE IF NOT EXISTS audio_data
                  (id INTEGER PRIMARY KEY AUTOINCREMENT, filename TEXT, timestamp TEXT, location TEXT)''')

@app.post("/upload_audio/")
async def upload_audio(files: List[UploadFile] = File(...)):
    print("hiiiii")
    try:
        if not files:
            print("nohi")
            return JSONResponse(status_code=400, content={"message": "No files provided."})

        for file in files:
            print("himain")
            if file.content_type.startswith("audio"):
                print(f"Processing audio file: {file.filename}")

                # Extract timestamp and location from the filename or any other metadata
                timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                print("hi")
                #location = "Unknown"  # Extract location from metadata if available

                # Save the audio file
                audio_path = f"audio/{file.filename}"
                print("hi1")
                with open(audio_path, "wb") as audio_file:
                    audio_file.write(await file.read())
                    print("hi2")
                    # return{"message":"hiiiii"}

                # Insert data into the database
                cursor1.execute("INSERT INTO audio_data (filename, timestamp) VALUES (?, ?)", (audio_path, timestamp))
                conn1.commit()
                # return{"message":"hiiiii"}
                print("Data inserted into SQLite database.")


        return {"message": f"{len(files)} audio file(s) uploaded successfully."}

    except Exception as e:
        print(f"An error occurred: {e}")
        return JSONResponse(status_code=500, content={"message": "An error occurred during file upload."})

@app.get("/audio_data/")
async def get_audio_data():
    cursor1.execute("SELECT * FROM audio_data")
    rows = cursor1.fetchall()

    audio_data = []
    for row in rows:
        audio_data.append({
            "id": row[0],
            "filename": row[1],
            "timestamp": row[2],
            # "location": row[3],
        })

    return {"audio_data": audio_data}

def fetch_poacher_data():
    conn = sqlite3.connect("poacher_images.db")
    cursor = conn.cursor()

    # Fetch data from the database
    cursor.execute("SELECT camera, COUNT(*) FROM poacher_images GROUP BY camera")
    data = cursor.fetchall()

    # Close the database connection
    conn.close()

    return data

@app.get("/poacher-data")
async def get_poacher_data():
    try:
        # Fetch poacher data from the database
        poacher_data = fetch_poacher_data()
        return JSONResponse(status_code=200, content={"poacher_data": poacher_data})
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": f"An error occurred: {e}"})
    
@app.on_event("shutdown")
def shutdown_event():
    conn.close()
    conn1.close()




# @app.get("/new_data")
# def get_new_data(db: Session):
#     new_data = crud.get_new_data(db)
#     return new_data

# if __name__ == "__main__":
#     import uvicorn

#     # Run FastAPI and WebSocket servers concurrently
#     uvicorn.run(app, host="0.0.0.0", port=8000)
    
    

    