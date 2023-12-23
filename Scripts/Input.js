import * as THREE from "three";
var mouseX = 0;
export var isMouseLeftPressed = false;
export var MouseDeltaX = 0;

let mouseTimer;
const delay = 10;
export const SetInput = (objectRotate) => {
  document.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mouseup", handleMouseUp);

  document.addEventListener('mousemove', function(event){
      clearTimeout(mouseTimer);
      handleMouseMove(event);
      mouseTimer = setTimeout(function(){
          MouseDeltaX = 0;
      }, delay);
  }, false);

  document.addEventListener("touchmove", handleTouchMove, { passive: false });
};

function handleMouseDown(event) {
  // Check Click Down
  if (event.button === 0) {
    isMouseLeftPressed = true;
    mouseX = event.clientX;
  }
}

function handleMouseUp(event) {
  // Check Click Up
  if (event.button === 0) {
    isMouseLeftPressed = false;
  }
}

export const handleMouseMove = (event) => {
  if (!isMouseLeftPressed) return;

  // Calculate Mouse Change
  var deltaX = event.clientX - mouseX;

  MouseDeltaX = deltaX;
  // Update Mouse Position
  mouseX = event.clientX;
};

function handleTouchMove(event) {
  event.preventDefault();

  // Calculate Change Touch
  var touch = event.touches[0];
  var deltaX = touch.clientX - mouseX;

  //var speed = 0.01;
  // Set Rotation
  //object.rotation.y += deltaX * speed;
  MouseDeltaX = deltaX;

  // Update Touch Position
  mouseX = touch.clientX;
}
