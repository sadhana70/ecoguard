import cv2
import numpy as np
import imutils
import time
from imutils.video import VideoStream
import tensorflow as tf 
from tensorflow.keras.models import load_model

# Load the pre-trained model
model = load_model('poachingdetectionVER7.h5',compile=False)

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
    vs = VideoStream(0).start()
    time.sleep(2.0)

    # OpenCV window
    cv2.namedWindow("Poacher Detection")

    while True:
        frame = vs.read()
        frame = imutils.resize(frame, width=400)
        original_frame = frame.copy()

        # Detect poacher
        poacher = is_poacher(original_frame)

        # Display frame with poacher status
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

    # Clean up
    cv2.destroyAllWindows()
    vs.stop()
