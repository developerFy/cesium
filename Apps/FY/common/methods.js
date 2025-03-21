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
      pixelDatatype: PixelDatatype.UNSIGNED_BYTE // 0-255，GPU传递过程中存在归一化
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

const defaultMeshUrl = "http://114.242.26.126:7000/examples/examples/1.%20%E6%95%99%E7%A8%8B%E7%A4%BA%E4%BE%8B/1.%20%E5%9F%BA%E7%A1%80%E5%9C%BA%E6%99%AF%E5%AF%B9%E8%B1%A1%E7%A4%BA%E4%BE%8B/1.%203dtiles%E6%95%B0%E6%8D%AE%E5%8A%A0%E8%BD%BD%E7%A4%BA%E4%BE%8B20241118//revit_school_3dtiles1.1/tileset.json"
// 加载3DTiles
const addTileset = async (url = defaultMeshUrl, options = {}, isZoomTo = true) => {
  const _tileset = await Cesium.Cesium3DTileset.fromUrl(
    url,
    options,
  );
  tileset = viewer.scene.primitives.add(_tileset);
  viewer.zoomTo(tileset);
  return tileset;
};
