// Ian Mei's AudioVisulizer
// Using P5JS audio library
// Taking insperation from Color Codings Audio Visulizer : https://www.youtube.com/watch?v=uk96O7N1Yo0
// along with Summer Rizzo's DEV post : https://dev.to/rizz0s/creating-an-audio-visualizer-that-can-handle-multiple-audio-sources-dynamically-all-in-vanilla-js-5hfl
// This was made for UMass Amherst's TCSA Cultural Night Market as background vibes
var song;
var fft;
var button;
var radius;

function onTouch() {
  song.play();
}

function preload() {
  img = loadImage('../images/TCSA.png')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
  radius = windowHeight/4;

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8, 256);
  fft.setInput(mic)
  
  // changeImgColor(256,0,10)


}

function draw() {
  background(0);
  var spectrum = fft.analyze();
  
  bass=fft.getEnergy("bass")
  
  noStroke();
  
  translate(width / 2, height / 2);
  
  primary=color(256,0,10)
  bg=color(0,0,0)
  push()
  fill(lerpColor(bg,primary,map(bass,0,255,0,0.02549019607)))
  ellipse(0,0,map(bass,0,255,0,radius*8))
  pop()
  
  push()
  fill(lerpColor(bg,primary,map(bass,0,255,0,0.0431372549)))
  ellipse(0,0,map(bass,0,255,0,radius*7))
  pop()
  
  push()
  fill(lerpColor(bg,primary,map(bass,0,255,0,0.0862745098)))
  ellipse(0,0,map(bass,0,255,0,radius*6))
  pop()	
  
  push()
  fill(lerpColor(bg,primary,map(bass,0,255,0,0.1294117647)))
  ellipse(0,0,map(bass,0,255,0,radius*5))
  pop()
  
  push()
  fill(lerpColor(bg,primary,map(bass,0,255,0,0.1725490196)))
  ellipse(0,0,map(bass,0,255,0,radius*4))
  pop()
  //console.log(spectrum);
  //stroke(255);


  

  var numbars = 100
  //beginShape();
  for(var p = 1; p >-2; p-=2){
  for(var t = 1; t >-2; t-=2){
    for (var i = 0; i < numbars+1; i++) {
      var angle = map(i, 0, numbars, 0, 90);
      var amp = spectrum[i+10];
      var r = map(amp, 0, 256, 160, 300);
      //fill(i, 255, 255);
      var x = r * cos(angle) *-p;
      var y = r * sin(angle) *t *p;
    
      
      strokeCap(SQUARE);

      colorMode(RGB);
      strokeWeight(13)
      stroke(255,255,255);
      // line(0, 0, x , y);


      strokeWeight(1);
      stroke(primary)
      // stroke(0,136,255);
      line(0, 0, x, y);
      //vertex(x, y);
      //var y = map(amp, 0, 256, height, 0);
      //rect(i * w, y, w - 2, height - y);
    }
  }
 }
  colorMode(RGB);
  strokeWeight(1)
  stroke(255, 255, 255);
  fill(0);
  circle(0, 0, 300);
  //endShape();

  tint(primary);
  image(img,-250/2,-250/2,250,250)

}



function touchStarted() {
	getAudioContext().resume();
}

function changeImgColor(r,g,b){
  img.loadPixels(); // Load the pixels of the image for manipulation
  
  // Loop through each pixel of the image
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let index = (x + y * img.width) * 4; // Calculate pixel index
      
      // Modify the color values
      // Here, we'll invert the colors by subtracting them from 255
      let invertedR = r ;
      let invertedG = g ;
      let invertedB = b ;
      
      // Update the pixel values with the modified colors
      img.pixels[index] = invertedR;
      img.pixels[index + 1] = invertedG;
      img.pixels[index + 2] = invertedB;
    }
  }
  
  img.updatePixels(); // Update the image with modified pixels

}