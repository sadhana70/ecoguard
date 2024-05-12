
import cv2
import numpy as np
import imutils
import time
from imutils.video import VideoStream
import tensorflow as tf 
from tensorflow.keras.models import load_model
from PIL import Image
import io
import requests
import json

# Define the URL of the FastAPI server
UPLOAD_URL = "http://127.0.0.1:8000/upload/"



model = load_model('poachingdetectionVER7.h5', compile=False)

# Function to detect poacher
def is_poacher(testingimg):
    pic1 = tf.image.resize(testingimg, (256, 256))
    solution = model.predict(np.expand_dims(pic1, 0))
    if solution > 0.5:
        print("Poacher")
        return True
    else:
        print("No poacher")
        return False

if __name__ == "__main__":
    # Start the video stream
    vs = cv2.VideoCapture(0)
    time.sleep(2.0)

    while True:
        ret, frame = vs.read()
        frame = imutils.resize(frame, width=400)
        original_frame = frame.copy()

        # Detect poacher
        poacher = is_poacher(original_frame)

        # If poacher is detected, upload the image to the server
        if poacher:
            # Convert frame to PIL Image
            pil_image = Image.fromarray(cv2.cvtColor(original_frame, cv2.COLOR_BGR2RGB))
            # Encode image to JPEG format
            img_byte_array = io.BytesIO()
            pil_image.save(img_byte_array, format='JPEG')
            img_byte_array = img_byte_array.getvalue()
            # Prepare the data to be sent in the POST request
            files = {"files": ("poacher.jpg", img_byte_array, "image/jpeg")}
            # print("hi from ai")
            # Send POST request to the server to upload the image
            response = requests.post(UPLOAD_URL, files=files)

        
            print("Raw response:", response.text)

            try:
        # Try to decode the response as JSON
                response_json = response.json()
                print(response_json)
            except json.decoder.JSONDecodeError:
        # If decoding fails, print the raw response
                print("Error decoding JSON. Raw response:", response.text)

        # Display frame with poacher status (for demonstration)
        if poacher:
            cv2.putText(frame, "Poacher Detected", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 0, 255), 2)
        else:
            cv2.putText(frame, "No Poacher Detected", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.8, (0, 255, 0), 2)

        # Show the frame
        cv2.imshow("Poacher Detection", frame)

        # Wait for 'q' key press to exit
        key = cv2.waitKey(1) & 0xFF
        if key == ord("q"):
            break
        #time.sleep(30.0)
    # Clean up
    cv2.destroyAllWindows()
    vs.release()
