let capture;
let posenet;
let singlePose
let skeleton;

let 

function setup() {
    createCanvas(800, 500);
    capture = createCapture(VIDEO)
    capture.hide();

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose',receivedPoses);

}

function receivedPoses(poses){
    console.log(poses);

    if(poses.length > 0){
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log('Model has loaded');
}

function writeOnRightSide(text) {
    // Create a new div element
    const div = document.createElement('div');
    
    // Set the text for the div
    div.textContent = text;
    
    // Style the div to position it on the right side
    div.style.position = 'absolute';
    div.style.right = '10px';   // 10px from the right edge
    div.style.top = '50%';      // Vertically center it
    div.style.transform = 'translateY(-50%)';  // Adjust for the div's height to truly center it
    div.style.backgroundColor = 'white';  // Background to make the text visible
    div.style.padding = '5px';  // Some padding for aesthetics
    div.style.border = '1px solid black';  // A border to visualize the element
    
    // Append the div to the body
    document.body.appendChild(div);
}

function draw() {

    image(capture, 0, 0);
    fill(20,60,86);

    if(singlePose){
        for(let i=0; i<singlePose.keypoints.length; i++){
            ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y,10);

            // textSize(12);
            // fill(255);
            // text(`x: ${keypoints[i].position.x.toFixed(2)}`, keypoints[i].position.x + 15, keypoints[i].position.y - 5);
            // text(`y: ${keypoints[i].position.y.toFixed(2)}`, keypoints[i].position.y + 15, keypoints[i].position.y + 15);
        }
        // if ()
        writeOnRightSide(singlePose.nose.x);
        stroke(255,255,255);
        strokeWeight(2);
        for(let j=0; j<skeleton.length; j++){
            line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y)

        }
    }
}



// Example usage:




