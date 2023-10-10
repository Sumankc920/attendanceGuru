import cv2
import time

# Set up the video capture
url = "http://192.168.1.66:8080/shot.jpg"

video_capture = cv2.VideoCapture(0)

# Define the output directory for captured images
output_dir = "captured_images/"

# Initialize counters
image_count = 0
detection_count = 0

# Capture images for 1 minute
start_time = time.time()
while time.time() - start_time < 5:
    # Capture frame from video
    ret, frame = video_capture.read()

    # Display the video feed
   
   

    # Save the captured image
    image_count += 1
    image_path = output_dir + f"image_{image_count}.jpg"
    cv2.imwrite(image_path, frame)

    # Print image count
    print(f"Captured Image: {image_count}")

    # Delay for 5 seconds
    time.sleep(1)

# Release the video capture
video_capture.release()
cv2.destroyAllWindows()

