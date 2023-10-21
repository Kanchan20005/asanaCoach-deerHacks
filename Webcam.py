import cv2

# Create a VideoCapture object
cap = cv2.VideoCapture(0)  # 0 represents the default camera (usually the built-in webcam)

# Check if the camera opened successfully
if not cap.isOpened():
    print("Error: Could not open camera.")
    exit()

# Create a window for displaying the webcam feed
cv2.namedWindow("Webcam")

while True:
    # Read a frame from the camera
    ret, frame = cap.read()

    # Check if the frame was read successfully
    if not ret:
        print("Error: Could not read frame.")
        break

    # Display the frame in the "Webcam" window
    cv2.imshow("Webcam", frame)

    # Check for a key press event
    key = cv2.waitKey(1) & 0xFF

    # Capture an image when the 'c' key is pressed
    if key == ord('c'):
        # Save the captured frame as an image
        cv2.imwrite("captured_image.jpg", frame)
        print("Image captured as 'captured_image.jpg'.")

    # Break the loop if the 'q' key is pressed or if the window is closed
    if key == ord('q') or cv2.getWindowProperty("Webcam", cv2.WND_PROP_VISIBLE) < 1:
        break

# Release the VideoCapture and close the window
cap.release()
cv2.destroyAllWindows()
