function rotate_point(pointX, pointY, originX, originY, angle) {
  angle = 0-angle * Math.PI / 180.0;
  return {
      x: Math.cos(angle) * (pointX-originX) - Math.sin(angle) * (pointY-originY) + originX,
      y: Math.sin(angle) * (pointX-originX) + Math.cos(angle) * (pointY-originY) + originY
  };
};


console.log(rotate_point(16,-3,0,0,540))