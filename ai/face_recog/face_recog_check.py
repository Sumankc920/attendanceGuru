import cv2
import datetime
import json
import time
from collections import Counter
import requests
import os

# Load the trained LBPH face recognizer model
#recognizer = cv2.face_LBPHFaceRecognizer_create()
recognizer = cv2.face_LBPHFaceRecognizer.create()
recognizer.read("lbph_face_recognizer.xml")  # Replace with the path to your trained model




# Initialize the webcam
cap = cv2.VideoCapture(0)


# Specify the total duration (in seconds) for running the model
total_duration = 30

# Initialize variables for data capture
captured_data = []

# Start time for running the model
start_time = time.time()
recognition_interval = 1  # Recognize faces every 1 second

while time.time() - start_time < total_duration:
# while True:
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Convert the frame to grayscale for face recognition
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    #if int(time.time() - start_time) % recognition_interval == 0:
        # Detect faces in the frame
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    for (x, y, w, h) in faces:
        # Extract the detected face region
        face = gray[y:y + h, x:x + w]

        # Recognize the face
        label, confidence = recognizer.predict(face)

        if confidence < 100:
            roll_no = label
        else:
            roll_no = "Unknown"

        # Get the current date and time
        # current_time = result_time.strftime("%H:%M:%S")
        
       

        current_time = datetime.datetime.now().strftime("%H:%M")
        current_day = datetime.datetime.now().strftime("%A")
        
        
        # Prepare the data as a dictionary
        data = {
            "rollNo": roll_no,
            "roomNo": 901,
            "day": current_day.upper(),
            "time":current_time
        }

        captured_data.append(data)
	
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
        # label_text = f"Roll: {roll_no}"
        # cv2.putText(frame, label_text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

    # Display the frame
    cv2.imshow('Face Recognition', frame)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

    # Wait for a brief moment to control the frame rate
    #time.sleep(0.1)

# Release the webcam and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()

# Remove duplicates from captured_data
captured_data = [dict(t) for t in {tuple(d.items()) for d in captured_data}]


with open("captured_data.json", "w") as json_file:
    json.dump(captured_data, json_file, indent=4)

print("Data capture complete.")

# Load the captured data from the JSON file
with open("captured_data.json", "r") as json_file:
    captured_data = json.load(json_file)

# Calculate the number of occurrences for each roll number
roll_counts = {}
for data in captured_data:
    if data["rollNo"] != "Unknown":
        roll = str(data["rollNo"])  # Convert to a string to ensure consistent keys
        roll_counts[roll] = roll_counts.get(roll, 0) + 1

# Initialize the list of present students
present_students = []

# Add roll numbers with more than 20 occurrences to present_students
for roll, count in roll_counts.items():
    if count > 0:
        # Find one data entry for this roll number
        present_data = next(data for data in captured_data if str(data["rollNo"]) == roll)
        present_students.append(present_data)

# Save the list of present students in a JSON file
with open("present_students.json", "w") as present_file:
    json.dump(present_students, present_file, indent=4)

print("Present students data saved in present_students.json.")

with open("present_students.json", "r") as json_file:
    present_students = json.load(json_file)

# Define the URL where you want to send the POST request
post_url = "https://meaty-person-production.up.railway.app/attendance/set_attendance"

# Loop through each present student's data and send a POST request
for student_data in present_students:
    # Send a POST request with the student data
    response = requests.post(post_url, json=student_data)
    
    # Check if the request was successful (you can customize this check)
    if response.status_code == 200:
        print(f"Data sent successfully for student with roll: {student_data['rollNo']}")
    else:
        print(f"Failed to send data for student with roll: {student_data['rollNo']}")

# # Delete the captured data file
# if os.path.exists("captured_data.json"):
#    os.remove("captured_data.json")

# # Delete the present students data file
# if os.path.exists("present_students.json"):
#    os.remove("present_students.json")

print("Files deleted.")



# import cv2
# import datetime
# import json
# import time

# # Load the trained LBPH face recognizer model
# recognizer = cv2.face_LBPHFaceRecognizer.create()
# recognizer.read("lbph_face_recognizer.xml")  # Replace with the path to your trained model

# # Initialize the webcam
# cap = cv2.VideoCapture(0)

# # Specify the total duration (in seconds) for running the model
# total_duration = 90

# # Initialize variables for data capture
# captured_data = []
# capture_count = 0

# # Start time for running the model
# start_time = time.time()

# while True:
#     # Capture frame-by-frame
#     ret, frame = cap.read()

#     # Convert the frame to grayscale for face recognition
#     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

#     # Detect faces in the frame
#     face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
#     faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

#     for (x, y, w, h) in faces:
#         # Extract the detected face region
#         face = gray[y:y + h, x:x + w]

#         # Recognize the face
#         label, confidence = recognizer.predict(face)

#         if confidence < 100:
#             roll_no = label
#         else:
#             roll_no = "Unknown"

#         # Get the current date and time
#         current_time = datetime.datetime.now().strftime("%H:%M:%S")
#         current_day = datetime.datetime.now().strftime("%A")

#         # Prepare the data as a dictionary
#         data = {
#             "roll": roll_no,
#             "time": current_time,
#             "room_no": 902,
#             "day": current_day
#         }

#         captured_data.append(data)
#         capture_count += 1
#         for (x, y, w, h) in faces:
#             cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
#             label_text = f"Roll: {roll_no}"
#             cv2.putText(frame, label_text, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)


#     cv2.imshow('Face Recognition', frame)
    
    
# # Release the webcam and close all OpenCV windows
# cap.release()
# cv2.destroyAllWindows()

# # Save the captured data as a single JSON file
# with open("captured_data.json", "w") as json_file:
#     json.dump(captured_data, json_file, indent=4)

# print("Data capture complete.")
# 