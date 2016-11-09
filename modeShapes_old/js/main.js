// declare var THREE: any;
// var scene, camera, controls, renderer;
// var WIDTH: number = window.innerWidth;
// var HEIGHT: number = window.innerHeight;
// var SPEED = 1.2;
// var clock;
// var timeSinceRotation = 0;
// var cube = new THREE.Mesh(new THREE.CubeGeometry(0.5, 0.5, 0.5), new THREE.MeshNormalMaterial());
// var cube2 = new THREE.Mesh(new THREE.CubeGeometry(0.5, 0.5, 0.5), new THREE.MeshNormalMaterial());
// var cube3 = new THREE.Mesh(new THREE.CubeGeometry(0.5, 0.5, 0.5), new THREE.MeshNormalMaterial());
// var object = new THREE.Object3D();
// var object2 = new THREE.Object3D();
// var object3 = new THREE.Object3D();
// object.add(cube);
// object2.add(cube2);
// object3.add(cube3);
// var eigenValue = 2; // i.e Rate of oscilations in Hz
// var eigenVector = [-0.5, -0.5, 0, 0.1, 0.3, 0, // 2 nodes, each has six d.o.f (x,y,z,Rx,Ry,Rz)
//                     0, 1, 0, 1, 1, 0.5,
//                     0.2, 0.2, -0.1, 0.3, 1, 1];
// var nodeStore: number[][] = [ //contains each nodes (x,y,z) position
//   // Shaft 1
//   [0, 0, -3],
//   [0, 0, -2],
//   [0, 0, -1],
//   [0, 0, 0],
//   [0, 0, 1],
//   [0, 0, 2],
//   [0, 0, 3],
//   // Shaft 2
//   [2, 2, -2],
//   [2, 2, -1],
//   [2, 2, 0],
//   [2, 2, 1],
//   [2, 2, 2],
//   [2, 2, 3],
//   [2, 2, 4],
//   [2, 2, 5]
// ];
// var nodeMass = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
// function init() {
//     scene = new THREE.Scene();
//     scene.add(object);
//     scene.add(object2);
//     scene.add(object3);
//     object.position.set(-1, 0, 0);
//     object2.position.set(0, 0, 0);
//     object3.position.set(1, 0, 0);
//     initCamera();
//     // initControls();
//     clock = new THREE.Clock();
//     var nodeGeometry = generateNodeGeometry(nodeStore, nodeMass);
//     debugger;
//     initRenderer();
//     document.body.appendChild(renderer.domElement);
// }
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
//     camera.position.set(0, 3.5, 5);
//     camera.lookAt(scene.position);
// }
// function initRenderer() {
//     renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(WIDTH, HEIGHT);
// }
// function generateNodeGeometry(nodeStore: number[][], nodeMass: Array<number>) {
//   var geometryContainer = generateNodeContainer(nodeStore, nodeMass);
//   geometryContainer = positionObjects(nodeStore, geometryContainer);
//   return geometryContainer;
// }
// function generateNodeContainer(nodeStore: number[][], nodeMass: Array<number>) {
//   var geometryContainer = new THREE.Object3D();
//   var geometryScaleFactor = 0.5;
//   for (var i = 0; i < nodeStore.length; i++) {
//     var nodeSize = geometryScaleFactor * nodeMass[i];
//     var nodeGeometryMesh = new THREE.Mesh(new THREE.CubeGeometry(nodeSize, nodeSize, nodeSize), new THREE.MeshNormalMaterial());
//     var nodeGeometryObject = new THREE.Object3D();
//     nodeGeometryObject.add(nodeGeometryMesh);
//     geometryContainer.add(nodeGeometryObject); // add the mesh to Object3D then add the object 3D to a object3D container. 
//   }
//   return geometryContainer;
// }
// function positionObjects(nodeStore: number[][], geometryContainer) {
//   for (var i = 0; i < geometryContainer.children.length; i++) {
//     geometryContainer.children[i].position.set(nodeStore[i]);
//   }
//   return geometryContainer;
// }
// function updateCube(time, cube, cube2, cube3) {
//     var theta = (eigenValue * time) % (2 * Math.PI);
//     var sinTheta = Math.sin(theta);
//     cube.position.x = eigenVector[0] * sinTheta;
//     cube.position.y = eigenVector[1] * sinTheta;
//     cube.position.z = eigenVector[2] * sinTheta;
//     cube.rotation.x = eigenVector[3] * sinTheta;
//     cube.rotation.y = eigenVector[4] * sinTheta;
//     cube.rotation.z = eigenVector[5] * sinTheta;
//     cube2.position.x = eigenVector[6] * sinTheta;
//     cube2.position.y = eigenVector[7] * sinTheta;
//     cube2.position.z = eigenVector[8] * sinTheta;
//     cube2.rotation.x = eigenVector[9] * sinTheta;
//     cube2.rotation.y = eigenVector[10] * sinTheta;
//     cube2.rotation.z = eigenVector[11] * sinTheta;
//     cube3.position.x = eigenVector[12] * sinTheta;
//     cube3.position.y = eigenVector[13] * sinTheta;
//     cube3.position.z = eigenVector[14] * sinTheta;
//     cube3.rotation.x = eigenVector[15] * sinTheta;
//     cube3.rotation.y = eigenVector[16] * sinTheta;
//     cube3.rotation.z = eigenVector[17] * sinTheta;
// }
// function render() {
//     requestAnimationFrame(render);
//     var timeSeconds = clock.getElapsedTime();
//     renderWithTime(timeSeconds, cube, cube2, cube3);
// }
// var timeSinceArrayShift = 0;
// function renderWithTime(time, cube, cube2, cube3){
//   // controls.update()
//   updateCube(time, cube, cube2, cube3);
//   renderer.render(scene, camera);
// }
// init();
// render();
//# sourceMappingURL=main.js.map