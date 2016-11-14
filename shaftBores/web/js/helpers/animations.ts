namespace animations {
  export function updateNodePositions(time: number, nodeSetGeometry: nodeSetGeometry.Cubes, eigenVector: number[], eigenValue: number) {
    if (nodeSetGeometry.meshArray.length != eigenVector.length/6) {
      throw new Error("nodeSetGeometry.length must equal eigenVector.length/6 - i.e. each node must have 6 degrees of freedom associated with it");
    }
    var theta = (eigenValue * time) % (2 * Math.PI);
    var sinTheta = Math.sin(theta);
    for (var i = 0; i < nodeSetGeometry.meshArray.length; i++) {
      var eigOffset = i*6; //probably a more elegant method, James?
      nodeSetGeometry.meshArray[i].position.x = inputData.nodeStore[i][0] + eigenVector[eigOffset] * sinTheta;
      nodeSetGeometry.meshArray[i].position.y = inputData.nodeStore[i][1] + eigenVector[eigOffset+1] * sinTheta;
      nodeSetGeometry.meshArray[i].position.z = inputData.nodeStore[i][2] + eigenVector[eigOffset+2] * sinTheta;
      nodeSetGeometry.meshArray[i].rotation.x = eigenVector[eigOffset+3] * sinTheta;
      nodeSetGeometry.meshArray[i].rotation.y = eigenVector[eigOffset+4] * sinTheta;
      nodeSetGeometry.meshArray[i].rotation.z = eigenVector[eigOffset+5] * sinTheta;
    }
  }

  export function updateShaftProfile() {
  }
}
