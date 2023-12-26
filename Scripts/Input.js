export class Input {
  static mouseX = 0;
  static isMouseLeftPressed = false;
  static MouseDeltaX = 0;

  static mouseTimer = 0;
  static delay = 10;

  static SetInput = () => {
    document.addEventListener("mousedown", Input.handleMouseDown);
    document.addEventListener("mouseup", Input.handleMouseUp);

    document.addEventListener('mousemove', function (event) {
      clearTimeout(Input.mouseTimer);
      Input.handleMouseMove(event);
      Input.mouseTimer = setTimeout(function () {
        Input.MouseDeltaX = 0;
      }, Input.delay);
    }, false);

    document.addEventListener("touchmove", Input.handleTouchMove, { passive: false });
  };

  static handleMouseDown(event) {
    // Check Click Down
    if (event.button === 0) {
      Input.isMouseLeftPressed = true;
      Input.mouseX = event.clientX;
    }
  }

  static handleMouseUp(event) {
    // Check Click Up
    if (event.button === 0) {
      Input.isMouseLeftPressed = false;
    }
  }

  static handleMouseMove = (event) => {
    if (!Input.isMouseLeftPressed) return;

    // Calculate Mouse Change
    var deltaX = event.clientX - Input.mouseX;

    Input.MouseDeltaX = deltaX;
    // Update Mouse Position
    Input.mouseX = event.clientX;
  };

  static handleTouchMove(event) {
    event.preventDefault();

    // Calculate Change Touch
    var touch = event.touches[0];
    var deltaX = touch.clientX - Input.mouseX;

    // var speed = 0.01;
    // Set Rotation
    // object.rotation.y += deltaX * speed;
    Input.MouseDeltaX = deltaX;

    // Update Touch Position
    Input.mouseX = touch.clientX;
  }
}
