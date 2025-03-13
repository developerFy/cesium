/*eslint-disable*/
const { Framebuffer, Texture, PixelFormat, PixelDatatype } = Cesium;

// 创建一个FBO
const createFrameBuffer = (context) => {
  const width = context.canvas.clientWidth;
  const height = context.canvas.clientHeight;

  return new Framebuffer({
    context: context,
    colorTextures: [new Texture({
      context: context,
      width: width,
      height: height,
      pixelFormat: PixelFormat.RGBA,
      pixelDatatype: PixelDatatype.UNSIGNED_BYTE
    })],
    depthTexture: new Texture({
      context: context,
      width: width,
      height: height,
      pixelFormat: PixelFormat.DEPTH_COMPONENT,
      pixelDatatype: PixelDatatype.UNSIGNED_SHORT
    })
  });
}

// 将FBO的纹理渲染到Canvas中
const renderFBOToCanvas = (viewer, fbo, canvas = document.getElementById("outputCanvas")) => {
  const ctx = canvas.getContext("2d");

  const { drawingBufferWidth, drawingBufferHeight } = viewer.scene.context;
  const pixels = viewer.scene.context.readPixels({
    x: 0,
    y: 0,
    width: drawingBufferWidth,
    height: drawingBufferHeight,
    framebuffer: fbo,
  });
  canvas.width = drawingBufferWidth;
  canvas.height = drawingBufferHeight;

  const imgData = new ImageData(
    new Uint8ClampedArray(pixels),
    drawingBufferWidth,
    drawingBufferHeight
  );
  ctx.putImageData(imgData, 0, 0, 0, 0, drawingBufferWidth, drawingBufferHeight);
  ctx.translate(0, drawingBufferHeight);
  ctx.scale(1, -1);
  ctx.drawImage(canvas, 0, 0);
  canvas.style.height = (drawingBufferHeight * 0.3) + "px";
  canvas.style.width = (drawingBufferWidth * 0.3) + "px";
}
