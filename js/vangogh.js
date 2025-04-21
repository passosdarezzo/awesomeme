
var myCanvas = document.querySelector("#vangogh");
var vangogh = myCanvas.getContext("2d");

function textChangeListener (evt) {
  var id = evt.target.id;
  var text = evt.target.value;

  if (id == "topLineText") {
    window.topLineText = text;
  } else {
    window.bottomLineText = text;
  }

  redrawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}

function redrawMeme(image, topLine, bottomLine) {
  // Get Canvas2DContext
  var canvas = document.querySelector('canvas');
  var vangogh = canvas.getContext("2d");
  // Your code here
  console.log("Loaded Image");
  if(image != null){
    vangogh.drawImage(image, 0, 0, canvas.width, canvas.height);
  }

  // Text Attributes
  vangogh.font = "30pt Impact";
  vangogh.textAlign = "center";
  vangogh.strokeStyle = "black";
  vangogh.lineWidth = 3;
  vangogh.fillStyle = "white";

  if(topLine != null){
    vangogh.fillText(topLine, canvas.width/2, 40);
    vangogh.strokeText(topLine, canvas.width/2, 40);
  }

  if(bottomLine != null){
    vangogh.fillText(bottomLine, canvas.width/2, canvas.height -20);
    vangogh.strokeText(bottomLine, canvas.width/2, canvas.height -20);
  }
}

function saveFile() {
  window.open(document.querySelector('canvas').toDataURL());
}

function handleFileSelect(evt) {
  var canvasWidth = 500;
  var canvasHeight = 500;
  var file = evt.target.files[0];

  var reader = new FileReader();
  reader.onload = function(fileObject) {
  var data = fileObject.target.result;

  // Create an image object
  var image = new Image();
  image.onload = function() {

  window.imageSrc = this;
  redrawMeme(window.imageSrc, null, null);
  }

  // Set image data to background image.
  image.src = data;
  console.log(fileObject.target.result);
  };
  reader.readAsDataURL(file);
}

window.topLineText = "";
window.bottomLineText = "";
var input1 = document.getElementById('topLineText');
var input2 = document.getElementById('bottomLineText');
input1.oninput = textChangeListener;
input2.oninput = textChangeListener;
document.getElementById('inputFile').addEventListener('change', handleFileSelect, false);
document.querySelector('button').addEventListener('click', saveFile, false);
