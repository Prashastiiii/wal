import cv2
import pyttsx3
import time

thres = 0.45  # Threshold to detect object

# Initialize text-to-speech engine
engine = pyttsx3.init()
engine.setProperty('rate', 150)  # Speed of speech
engine.setProperty('volume', 0.9)  # Volume level

# Try with the default camera index 0
cap = cv2.VideoCapture(0)
cap.set(3, 1280)  # Width
cap.set(4, 720)  # Height
cap.set(10, 70)  # Brightness

# Load class names
classNames = []
classFile = 'coco.names'
with open(classFile, 'rt') as f:
    classNames = f.read().rstrip('\n').split('\n')

# Set up the model configuration and weights
configPath = 'ssd_mobilenet_v3_large_coco_2020_01_14.pbtxt'
weightsPath = 'frozen_inference_graph.pb'

net = cv2.dnn_DetectionModel(weightsPath, configPath)
net.setInputSize(320, 320)
net.setInputScale(1.0 / 127.5)
net.setInputMean((127.5, 127.5, 127.5))
net.setInputSwapRB(True)

# Variable to keep track of the last announced object and time
last_announced = ""
last_time = time.time()

# Start video capture loop
while True:
    success, img = cap.read()
    if not success or img is None:
        print("Failed to capture image. Check camera connection or index.")
        break

    classIds, confs, bbox = net.detect(img, confThreshold=thres)

    if len(classIds) != 0:
        # Find the detection with the highest confidence
        max_conf_idx = confs.argmax()
        max_confidence = confs[max_conf_idx]
        box = bbox[max_conf_idx]
        classId = classIds[max_conf_idx]
        detected_object = classNames[classId - 1].upper()

        # Draw the bounding box and label for the most confident detection
        cv2.rectangle(img, box, color=(0, 255, 0), thickness=2)
        cv2.putText(img, detected_object, (box[0] + 10, box[1] + 30),
                    cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)
        cv2.putText(img, str(round(max_confidence * 100, 2)), (box[0] + 200, box[1] + 30),
                    cv2.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0), 2)

        # Announce the detected object if it's different from the last one or enough time has passed
        current_time = time.time()
        if detected_object != last_announced or current_time - last_time > 10:
            engine.say(detected_object)
            engine.runAndWait()
            last_announced = detected_object
            last_time = current_time

    cv2.imshow("Output", img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
