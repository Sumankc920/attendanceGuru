import os
import numpy as np
import cv2

# Create an LBPH Face Recognizer


# In[32]:


recognizer = cv2.face_LBPHFaceRecognizer.create()


# In[33]:




# In[10]:


faces =[]
labels = []


# In[11]:


data_dir = "./FaceData/train/"


# In[12]:


for folder_name in os.listdir(data_dir):
    print(folder_name)
    person_dir = os.path.join(data_dir, folder_name)

    # Load up to 10 photos of the person
    image_filenames = [os.path.join(person_dir, img_name) for img_name in os.listdir(person_dir)[:10]]

    for image_filename in image_filenames:
        image = cv2.imread(image_filename, cv2.IMREAD_GRAYSCALE)

        # Append the face and its label (person's identifier)
        faces.append(image)
        labels.append(int(folder_name))


# In[17]:


labels = np.array(labels)


# In[ ]:


recognizer.train(faces, labels)


# In[19]:


recognizer.save("lbph_face_recognizer.xml")

print("Training complete.")