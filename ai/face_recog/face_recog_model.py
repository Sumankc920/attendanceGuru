import cv2
import numpy as np
import joblib
import pickle
from numpy import asarray
from mtcnn.mtcnn import MTCNN
from PIL import Image
from keras_facenet import FaceNet
from numpy import expand_dims



# from face_recog_test import get_embedding

address="https://172.16.12.180:8080//video"

#Load the SVM model, label encoder and normalize
def load_models(svm_model_filename, label_encoder_filename, normalize_encoder_filename):
    model = joblib.load(svm_model_filename)
    with open(label_encoder_filename, 'rb') as le_file:
        out_encoder = pickle.load(le_file)
    with open(normalize_encoder_filename, 'rb') as le_file:
        in_encoder = pickle.load(le_file)
    return model, out_encoder, in_encoder


# # Load the SVM model and label encoder and normalize encoder
svm_model_filename = 'svm_model.sav'
label_encoder_filename = 'label_encoder.pkl'
normalize_encoder_filename = 'normalize_encoder.pkl'
svc_model, out_encoder, in_encoder = load_models(svm_model_filename, label_encoder_filename, normalize_encoder_filename)

from sklearn.preprocessing import Normalizer



# # Load the face cascade
# face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def capture_and_save_photo(filename):
    # Open a connection to the webcam (usually 0 or 1)
    cap = cv2.VideoCapture(0)
    cap.open(address)


    # Check if the webcam opened successfully
    if not cap.isOpened():
        print("Error: Could not open webcam.")
        return

    # Capture a frame from the webcam
    ret, frame = cap.read()

    # Check if the frame was captured successfully
    if not ret:
        print("Error: Could not capture frame.")
        cap.release()
        return

    # Save the frame as an image
    cv2.imwrite(filename, frame)
    print("Photo saved as", filename)

    # Release the webcam and close any OpenCV windows
    cap.release()
    cv2.destroyAllWindows()

from PIL import Image


if __name__ == "__main__":
    # Specify the filename to save the photo
    filename = "captured_photo1.jpg"

    # Capture and save the photo
    # capture_and_save_photo(filename)

    image = Image.open(filename)
	# convert to RGB, if needed
    image = image.convert('RGB')

    pixels = asarray(image)

    detector = MTCNN()

    results = detector.detect_faces(pixels)

    # extract the bounding box from the first face
    x1, y1, width, height = results[0]['box']
	# bug fix
    x1, y1 = abs(x1), abs(y1)
    x2, y2 = x1 + width, y1 + height
	# extract the face
    face = pixels[y1:y2, x1:x2]
	# resize pixels to the model size
    image = Image.fromarray(face)
    face_array = asarray(image)

    model = FaceNet()

    face_array = face_array.astype('float32')
    mean, std = face_array.mean(), face_array.std()
    face_array = (face_array - mean) / std
    samples = expand_dims(face_array, axis=0)
    yhat = model.embeddings(samples)
    embedding = yhat[0].reshape(1,512)
    embedding = asarray(embedding)
    print("Embedding shape", embedding.shape)


    yhat_result = svc_model.predict(embedding)
    print("Yhat result", yhat_result)

# get roll
    class_index = yhat_result
    predict_roll = out_encoder.inverse_transform(yhat_result)
    print('Predicted: %s ' % (predict_roll))

    from flask import Flask, request, jsonify
    import requests
    from datetime import datetime

    app = Flask(__name__)

    URL = "https://meaty-person-production.up.railway.app/attendance/set_attendance"

    @app.route('/send_data', methods=['POST'])
    def send_data():
        # Get the current day and time
        current_day = datetime.now().strftime('%A')
        current_time = datetime.now().strftime('%H:%M')

        data = {
            "rollNo": predict_roll,
            "roomNo": 901,
            "day": current_day,
            "time": current_time
        }

        # Send the data to the specified URL
        response = requests.post(URL, json=data)

        if response.status_code == 200:
            return jsonify({"message": "Data sent successfully!"}), 200
        else:
            return jsonify({"message": "Failed to send data"}), response.status_code

        app.run(debug=True)




