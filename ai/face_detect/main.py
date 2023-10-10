import subprocess
import os

# Run the image capture program
image_capture_script = "capture_video.py"
subprocess.run(["python", image_capture_script])

# Check if the image capture program completed successfully
image_dir = "captured_images/"
a =len(os.listdir(image_dir))
if(a!=0):
    print("Image capture program completed successfully.")

    # Run the face detection program
    face_detection_script = "face_detect.py"
    subprocess.run(["python", face_detection_script])
else:
    print("Image capture program encountered an error.")


