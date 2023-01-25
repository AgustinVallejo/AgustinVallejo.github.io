let handpose;
let video;
let hands = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("hand", results => {
    hands = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < hands.length; i += 1) {
    const hand = hands[i];

    // Get bounding box
    const bbox = hand.boundingBox;
    const bboxDim = bbox.bottomRight[0] - bbox.topLeft[0];
    const palm = hands[0].landmarks[0];
    for (let j = 0; j < hand.landmarks.length; j += 1) {
      const keypoint = hand.landmarks[j];
      let extended = 0;
      // If distance to palm is greater than x of bounding box, set color red
      const distance = dist(palm[0], palm[1], keypoint[0], keypoint[1]);
      fill(0, 255, 0);
      if ( (distance > bboxDim / 2) ||
       ( ( j == 4 ) && distance > bboxDim / 4) || // Thumb
       ( ( j == 20 ) && distance > bboxDim / 3) ) { // Pinky
        fill(255, 0, 0);
        extended = 1;
      }
      // for every finger in pointOfFinger, if index === j, set extended to its value in extendedCounter
      for (let finger in pointOfFinger) {
        if (pointOfFinger[finger] === j) {
          extendedCounter[finger] = extended;
        }
      }

      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
  if (hands.length > 0) {
    fill(0, 0, 255);
    const palm = hands[0].landmarks[0];
    ellipse( palm[0], palm[1], 10, 10)

    // Display the value of extendedCounter in the screen
    let textFinger = '';
    let power = 0;
    let binary = 0; 
    let decimal = 0;
    for (let finger in extendedCounter) {
      textFinger += `\n${finger}: ${extendedCounter[finger]} `;
      binary += extendedCounter[finger] * Math.pow(2, power);
      decimal += extendedCounter[finger] * Math.pow(10, power);
      power += 1;
    }
    textFinger += `\nBinary= ${decimal} `;
    textFinger += `\nDecimal= ${binary} `;
    fill(255, 0, 0);
    textSize(32);
    text(textFinger, 10, 30);
  }
}

const MESH_ANNOTATIONS = {
  thumb: [1, 2, 3, 4],
  indexFinger: [5, 6, 7, 8],
  middleFinger: [9, 10, 11, 12],
  ringFinger: [13, 14, 15, 16],
  pinky: [17, 18, 19, 20],
  palmBase: [0]
};

const pointOfFinger = {
  thumb: 4,
  indexFinger: 8,
  middleFinger: 12,
  ringFinger: 16,
  pinky: 20
}

const extendedCounter = {
  thumb: 0,
  indexFinger: 0,
  middleFinger: 0,
  ringFinger: 0,
  pinky: 0
}