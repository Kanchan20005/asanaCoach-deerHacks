import cv2
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np

# Load the MoveNet model
model_path = hub.load("https://tfhub.dev/google/movenet/singlepose/lightning/4")

# Define the input size expected by the model
input_size = 192  # Adjust the input size as needed

# Confidence score threshold to determine reliable keypoints
MIN_CROP_KEYPOINT_SCORE = 0.2

def detect_poses(frame, model, input_size):
    # Resize the frame to the desired input size
    frame = cv2.resize(frame, (input_size, input_size))

    # Convert the frame to RGB format
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Perform pose detection
    keypoints_with_score = model(tf.convert_to_tensor([frame_rgb], dtype=tf.int32))

    # Extract keypoints and scores
    keypoints_with_score = keypoints_with_score[0].numpy()

    return keypoints_with_score

# Open the webcam
cap = cv2.VideoCapture(0)  # 0 represents the default camera (change if necessary)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Detect poses in the frame
    keypoints = detect_poses(frame, model_path, input_size)

    for keypoint in keypoints:
        if keypoint[2] > MIN_CROP_KEYPOINT_SCORE:
            x, y, score = int(keypoint[1] * frame.shape[1]), int(keypoint[0] * frame.shape[0]), keypoint[2]
            cv2.circle(frame, (x, y), 5, (0, 255, 0), -1)  # Draw keypoints on the frame

    # Display the frame
    cv2.imshow("MoveNet Pose Detection", frame)

    # Press 'q' to exit the loop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close OpenCV windows
cap.release()
cv2.destroyAllWindows()
