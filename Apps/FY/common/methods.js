const { Framebuffer, Texture, PixelFormat, PixelDatatype } = Cesium;

// 创建一个FBO
function createFrameBuffer(context) {
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
