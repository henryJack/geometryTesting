// declare var THREE: any;

// var scene, camera, controls, renderer;

// var WIDTH: number = window.innerWidth;
// var HEIGHT: number = window.innerHeight;

// var SPEED = 1.2;

// var clock;
// var timeSinceRotation = 0;

// var nodeStore: number[][] = [ //contains each nodes initial (x,y,z) position
//   // Shaft 1
//   [-3, 0, 0],
//   [-2, 0, 0],
//   [-1, 0, 0],
//   [0, 0, 0],
//   [1, 0, 0],
//   [2, 0, 0],
//   [3, 0, 0],
//   // Shaft 2
//   [-3, 2, 2],
//   [-2, 2, 2],
//   [-1, 2, 2],
//   [0, 2, 2],
//   [1, 2, 2],
//   [2, 2, 2],
//   [3, 2, 2],
// ];
// var nodeMass = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
// var eigenValue = 2;
// var eigenVector = [1, 1, 1, 1, 1, 1,
//                       1, 1, 1, 1, 1, 1,
//                       1, 1, 1, 1, 1, 1,
//                       1, 1, 1, 1, 1, 1,
//                       1, 1, 1, 1, 1, 1,
//                       1, 1, 1, 1, 1, 1,
//                       1, 1, 1, 1, 1, 1,
//                       1, 1, 1, 1, 1, 1,
//                       1, 1, 1, 1, 1, 1,
//                       1, 1, 1, 1, 1, 1,
//                       1, 1, 1, 1, 1, 1,
//                       1, 1, 1, 1, 1, 1,
//                       1, 1, 1, 1, 1, 1,
//                       1, 1, 1, 1, 1, 1];

// var nodeGroupGeometry = generateNodeGeometry(nodeStore, nodeMass);


// function init() {
//     scene = new THREE.Scene();
//     initCamera();
//     // initControls();
//     clock = new THREE.Clock();
//     scene.add(nodeGroupGeometry);

//     var testGeometry = new THREE.CubeGeometry(1,1,1);
//     var testMaterial = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
//     var testMesh = new THREE.Mesh(testGeometry, testMaterial);
//     testMesh.position.set(1,1,1);

//     var testInstance = new NodeSetGeometry(nodeStore, nodeMass, 0.5);
//     scene.add(testInstance.positionedNodes);
//     //scene.add(testMesh);
//     initRenderer();
//     document.body.appendChild(renderer.domElement);
// }



// class NodeSetGeometry {  
//     positionedNodes: any; // Returns THREE.Object3D

//     constructor(nodeStore: number[][], nodeMass: Array<number>, nodeSize?: number) {
//       if (nodeStore.length != nodeMass.length) {
//         throw new Error("nodeStore.length and nodeMass.length must be equal")
//       }
//       let geometryContainer = this.populateNodeContainer(nodeStore, nodeMass, nodeSize);
//       this.positionedNodes = this.positionNodes(nodeStore, geometryContainer);
//     }

//     populateNodeContainer(nodeStore: number[][], nodeMass: Array<number>, nodeSize: number) {
//       var geometryContainer = new THREE.Object3D();
//       var geometryScaleFactor = nodeSize || 1;
//       for (var i = 0; i < nodeStore.length; i++) {
//         var nodeSize = geometryScaleFactor * nodeMass[i];
//         var geometry = new THREE.CubeGeometry(nodeSize, nodeSize, nodeSize);
//         var material = new THREE.MeshNormalMaterial({
//           side: THREE.DoubleSide
//         });
//         var nodeGeometryMesh = new THREE.Mesh(geometry, material);
//         geometryContainer.add(nodeGeometryMesh);
//       }
//       return geometryContainer;
//     }

//     positionNodes(nodeStore: number[][], geometryContainer) {
//       for (var i = 0; i < geometryContainer.children.length; i++) {
//         geometryContainer.children[i].position.fromArray(nodeStore[i]);
//       }
//       return geometryContainer;
//     }
// }

// function updatePositionNew(time: number, nodeSetGeometry: any, eigenVector: number[], eigenValue: number) {
//   if (nodeSetGeometry.length != eigenVector.length/6) {
//     throw new Error("nodeSetGeometry.length must equal eigenVector.length/6 - i.e. each node must have 6 degrees of freedom associated with it");
//   }
//   var theta = (eigenValue * time) % (2 * Math.PI);
//   var sinTheta = Math.sin(theta);
//   for (var i = 0; i < nodeSetGeometry.positionedNodes.children.length; i++) {
//     nodeSetGeometry.positionedNodes.children[i].position.x = eigenVector[i] * sinTheta;
//     nodeSetGeometry.positionedNodes.children[i].position.y = eigenVector[i+1] * sinTheta;
//     nodeSetGeometry.positionedNodes.children[i].position.z = eigenVector[i+2] * sinTheta;
//     nodeSetGeometry.positionedNodes.children[i].rotation.x = eigenVector[i+3] * sinTheta;
//     nodeSetGeometry.positionedNodes.children[i].rotation.y = eigenVector[i+4] * sinTheta;
//     nodeSetGeometry.positionedNodes.children[i].rotation.z = eigenVector[i+5] * sinTheta;
//     }
// }

// function generateNodeGeometry(nodeStore: number[][], nodeMass: Array<number>) {
//   var geometryContainer = generateNodeContainer(nodeStore, nodeMass);
//   var positionedGeometryContainer = positionObjects(nodeStore, geometryContainer);

//   return positionedGeometryContainer;
// }

// function generateNodeContainer(nodeStore: number[][], nodeMass: Array<number>) {

//   var geometryContainer = new THREE.Object3D();
//   var geometryScaleFactor = 2;

//   for (var i = 0; i < nodeStore.length; i++) {
//     var nodeSize = geometryScaleFactor * nodeMass[i];
//     var geometry = new THREE.CubeGeometry(nodeSize, nodeSize, nodeSize);
//     var material = new THREE.MeshNormalMaterial({
//       side: THREE.DoubleSide
//     });

//     var nodeGeometryMesh = new THREE.Mesh(geometry, material);

//     geometryContainer.add(nodeGeometryMesh); // add the mesh to Object3D then add the object 3D to a object3D container. 
//   }
//   return geometryContainer;
// }

// function positionObjects(nodeStore: number[][], geometryContainer) {
//   for (var i = 0; i < geometryContainer.children.length; i++) {
//     geometryContainer.children[i].position.fromArray(nodeStore[i]);
//   }
//   return geometryContainer;
// }

// function updatePosition(time: number, nodeGroupGeometry, eigenVector: number[], eigenValue: number) {
//     var theta = (eigenValue * time) % (2 * Math.PI);
//     var sinTheta = Math.sin(theta);
//     for (var i = 0; i < nodeGroupGeometry.children.length; i++) {
//       nodeGroupGeometry.children[i].position.x = eigenVector[i] * sinTheta;
//       nodeGroupGeometry.children[i].position.y = eigenVector[i+1] * sinTheta;
//       nodeGroupGeometry.children[i].position.z = eigenVector[i+2] * sinTheta;
//       nodeGroupGeometry.children[i].rotation.x = eigenVector[i+3] * sinTheta;
//       nodeGroupGeometry.children[i].rotation.y = eigenVector[i+4] * sinTheta;
//       nodeGroupGeometry.children[i].rotation.z = eigenVector[i+5] * sinTheta;
//     }
// }

// function render() {
//     requestAnimationFrame(render);
//     var timeSeconds = clock.getElapsedTime();
//     renderWithTime(timeSeconds, nodeGroupGeometry, eigenValue, eigenVector);
// }

// var timeSinceArrayShift = 0; //is this used? probably not

// function renderWithTime(time, nodeGroupGeometry, EigenValue, EigenVector){
//   // controls.update()
//   updatePosition(time, nodeGroupGeometry, eigenVector, eigenValue);
//   renderer.render(scene, camera);
// }

// function renderWithoutTime(){ // not working :(
//   // controls.update()
//   renderer.render(scene, camera);
// }




// //General Scene setting up stuff

// function initControls() {

//   controls = new THREE.TrackballControls( camera );

//   controls.rotateSpeed = 3.5;
//   controls.zoomSpeed = 1.2;
//   controls.panSpeed = 1.2;

//   controls.noZoom = false;
//   controls.noPan = false;

//   controls.staticMoving = true;
//   controls.dynamicDampingFactor = 0.3;

//   controls.keys = [ 65, 83, 68 ];

//   controls.addEventListener( 'change', render );
// }

// function initCamera() {
//     camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
//     camera.position.set(5, 4.5, 6);
//     camera.lookAt(scene.position);
// }

// function initRenderer() {
//     renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(WIDTH, HEIGHT);
// }

// init();
// render();