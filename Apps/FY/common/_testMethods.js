function isPointInViewport(viewer, point) {
    const { planes: planceVec4 } = viewer.scene.frameState.cullingVolume;

    // 获取视锥体的6个平面
    const planes = [];
    for (let i = 0; i < planceVec4.length; i++) {
        const tempPlane = new Cesium.Plane(new Cesium.Cartesian3(1.0, 0.0, 0.0), 0.0);
        planes.push(Cesium.Plane.fromCartesian4(planceVec4[i], tempPlane));
    }

    // 检查点是否在每个平面内部
    for (let i = 0; i < planes.length; i++) {
        const plane = planes[i];
        if (Cesium.Plane.getPointDistance(plane, point) < 0) {
            // 点在某个平面外
            return false;
        }
    }

    return true; // 点在视口内
}