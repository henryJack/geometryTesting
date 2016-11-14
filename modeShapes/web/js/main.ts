declare var THREE: any;

var stats;
var scene, camera, controls, renderer;

var WIDTH: number = window.innerWidth;
var HEIGHT: number = window.innerHeight;

var clock;

var nodes = new nodeSetGeometry.Cubes(inputData.nodeStore, inputData.nodeMass, 0.5);

function init() {
  scene = new THREE.Scene();
  for (let mesh of nodes.meshArray){
    scene.add(mesh);
  }
  initCamera();
  initControls();
  clock = new THREE.Clock();
  initRenderer();
  document.body.appendChild(renderer.domElement);
}

function initCamera() {
  camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 100);
  camera.position.set(5, 4.5, 6);
  camera.lookAt(scene.position);
}

function initRenderer() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  //window.addEventListener( 'resize', onWindowResize, false ); //Framerate issues
}

function initControls() {
  controls = new THREE.TrackballControls( camera );
  controls.rotateSpeed = 3.5;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 1.2;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;
  controls.keys = [ 65, 83, 68 ];
}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  controls.handleResize();

  render();

}

function animateWithTime(time, nodes, EigenValue, EigenVector){
  controls.update()
  animations.updateNodePositions(time, nodes, inputData.eigenVector, inputData.eigenValue);
  renderer.render(scene, camera);
}

function render() {
  requestAnimationFrame(render);
  var timeSeconds = clock.getElapsedTime();
  animateWithTime(timeSeconds, nodes, inputData.eigenValue, inputData.eigenVector);
}



var a = inputData.eigenVector;
var indexOfMaxValue = a.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
var MaxValue = a[indexOfMaxValue];

// elements of eigenVectors go (x, y, z, Rx, Ry, Rz, ... and repeat) 

if (indexOfMaxValue % 6 == 0 || indexOfMaxValue % 6 == 1 || indexOfMaxValue % 6 == 2) {
  // normalise and scale eigenvector according max value from the positional entries only
  // normalise by diving though by the max value
  // Scale by multiplying through by a geometry scaling factor (average length of bounding box)
}

else if (indexOfMaxValue % 6 == 3 || indexOfMaxValue % 6 == 4) {
  // jiggery pokery normalise according to biggest value with modulo 0,1,2 (just need to know math.max for every 0th, 1st, 2nd element)
  // Scale by multiplying through by a geometry scaling factor (average length of bounding box)

}

else if (indexOfMaxValue % 6 == 5) {
  //normalise using this value 
  //then scale by multiply by Math.Pi for tortional modes

}


console.log("indexOfMaxValue = " + indexOfMaxValue);
console.log("maxValue = " + MaxValue);

init();
render();