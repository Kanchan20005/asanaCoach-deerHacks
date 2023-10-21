let recordedVideo = document.getElementById('recordedVideo');
let startButton = document.getElementById('startButton');
let stopButton = document.getElementById('stopButton');
let mediaRecorder;
let recordedChunks = [];
let mediaStream = null;
let youtubeVideo = document.getElementById('youtubeVideo1');
let player;

//if user click start it will record the video
startButton.addEventListener('click', function () {
  startButton.disabled = true;
  stopButton.disabled = false;

  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(function (stream) {
    stream.getAudioTracks().forEach(track => {
      track.enabled = false;
    });

    cameraStream.srcObject = stream;
    mediaStream = stream;
    mediaRecorder = new MediaRecorder(stream);
    recordedChunks = [];

    mediaRecorder.ondataavailable = function (e) {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }
    };

    mediaRecorder.onstop = function () {
      let blob = new Blob(recordedChunks, { type: 'video/webm' });
      let videoURL = URL.createObjectURL(blob);
      recordedVideo.src = videoURL;
    };

    mediaRecorder.start();
    document.getElementById("video_recording").innerHTML = "Video Recording \(Video is being recorded\).";
  })
  .catch(function (error) {
    console.error('Error accessing the camera and microphone:', error);
  });
});

//if the user click stop, the recording will stop and show the video that the user displayed
stopButton.addEventListener('click', function () {
  startButton.disabled = false;
  stopButton.disabled = true;
  mediaRecorder.stop();
  mediaStream.getTracks().forEach(track => track.stop());
  mediaStream = null;
  document.getElementById("video_recording").innerHTML = "Video Recording \(Video recording ends\).";
  document.getElementById("status").innerHTML = "Recording completed.";
});
