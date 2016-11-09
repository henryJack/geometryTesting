declare var THREE: any;

namespace nodeSetGeometry {
  export class Cubes {  
      meshArray: Array<any>; // Returns array with positioned cubes

      constructor(nodeStore: number[][], nodeMass: Array<number>, nodeSize?: number) {
        if (nodeStore.length != nodeMass.length) {
          throw new Error("nodeStore.length and nodeMass.length must be equal")
        }
        let meshArray = this.populateNodeContainer(nodeStore, nodeMass, nodeSize);
        this.meshArray = this.positionNodes(nodeStore, meshArray);
      }

      populateNodeContainer(nodeStore: number[][], nodeMass: Array<number>, nodeSize: number) {
        var meshArray = [];
        var geometryScaleFactor = nodeSize || 1;
        for (var i = 0; i < nodeStore.length; i++) {
          var nodeSize = geometryScaleFactor * nodeMass[i];
          var geometry = new THREE.CubeGeometry(nodeSize, nodeSize, nodeSize);
          var material = new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide
          });
          var nodeGeometryMesh = new THREE.Mesh(geometry, material);
          meshArray.push(nodeGeometryMesh);
        }
        return meshArray;
      }

      positionNodes(nodeStore: number[][], meshArray) {
        for (var i = 0; i < meshArray.length; i++) {
          meshArray[i].position.fromArray(nodeStore[i]);
        }
        return meshArray;
      }
  }

  export class ContiniuousShaft {
  }
  
}




