function resizeCanvas(canvasDom, width, height) {
  const canvasDomContext = canvasDom.getContext('2d');

  // Give each device pixel an element and drawing surface pixel.
  // This should make it bigger for retina displays for example.
  canvasDom.width = width * window.devicePixelRatio;
  canvasDom.height = height * window.devicePixelRatio;

  // Scale only the element's size down to the given width on the site.
  canvasDom.style.width = `${width}px`;
  canvasDom.style.height = `${height}px`;

  // Scale the drawing surface (up).
  canvasDomContext.scale(window.devicePixelRatio, window.devicePixelRatio);
}

export {resizeCanvas};
