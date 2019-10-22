var mic;
var take;
var voice;

function preload(){

}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);

  mic = new p5.AudioIn();
  mic.start();

  var lang = navigator.language || 'en-US';
  voice = new p5.SpeechRec(lang, showResult);
  voice.continuous = true;
  voice.interimResults = true;
  voice.onResult = showResult;
  voice.start();

  take = createCapture(VIDEO);
  take.size(windowWidth, windowHeight);
  take.hide();
  pixelDensity(0.4);
}

function draw() {
  var vol = mic.getLevel();

  var myCatch = take.loadPixels();
  image(myCatch, 0, 0, windowWidth, windowHeight);
  filter(GRAY);

  push();
  var talkText = 'take a moment, talk to yourself';
  fill('white');
  textFont('Jomolhari');
  textAlign(CENTER, TOP);
  textSize(40);
  text(talkText,width/2, 60);
  pop();

  push();
  var underText = 'press enter to screenshot';
  fill('white');
  textFont('Jomolhari');
  textAlign(CENTER, TOP);
  textSize(30);
  text(underText,width/2, 100);
  pop();

  push();
  fill('yellow');
  textFont('Jomolhari');
  textAlign(CENTER, CENTER);
  textStyle(BOLDITALIC);
  textSize(150);
  text(voice.resultString, width/2, height/2);
  pop();
}

function showResult() {
  if (voice.resultValue){
  createP(voice.resultString);
}
}

function keyPressed() {
  if (keyCode === ENTER) {
  saveCanvas('slitScan', 'png');
}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
