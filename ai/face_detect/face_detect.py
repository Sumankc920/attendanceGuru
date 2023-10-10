from mtcnn import MTCNN
import cv2
import os


detector = MTCNN()


image_dir = "captured_images/"


detection_count = 0


for filename in os.listdir(image_dir):
    if filename.endswith(".jpg"):
     
        image_path = os.path.join(image_dir, filename)
        image = cv2.imread(image_path)

       
        faces = detector.detect_faces(image)

        
        if len(faces) > 0:
            detection_count += 1

        for face in faces:
                x, y, w, h = face['box']
                cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
        cv2.imshow("Face Detection", image)
        cv2.waitKey(0)


       
        os.remove(image_path)

    
    if not os.listdir(image_dir):
        break


print(f"Total Face Detections: {detection_count}")
cv2.destroyAllWindows()

