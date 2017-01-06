declare var THREE: any;

var stats;
var scene, camera, controls, renderer;

var WIDTH: number = window.innerWidth;
var HEIGHT: number = window.innerHeight;

var clock;

var nodes = new nodeSetGeometry.Cubes(inputData.nodeStore, inputData.nodeMass, 0.5);

var modeShapeScaleFactor = 1;  //should be based on bounding box of scene
var tortionalScaleFactor = Math.PI;

var scaledEigenValue = 1; // essentially the speed of the animation, default sahould be 1 but we should show the normalised value on screen
var scaledEigenVector = scaleEigenVector(inputData.eigenVector, modeShapeScaleFactor, tortionalScaleFactor);


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

function animateWithTime(time, nodes, EigenVector: number[], EigenValue: number){
  controls.update()
  animations.updateNodePositions(time, nodes, EigenVector, EigenValue);
  renderer.render(scene, camera);
}

function render() {
  requestAnimationFrame(render);
  var timeSeconds = clock.getElapsedTime();
  animateWithTime(timeSeconds, nodes, scaledEigenVector, scaledEigenValue);
}


function scaleEigenVector(eigenVector: number[], geometricScaleFactor: number, tortionalScaleFactor: number) {

  var indexOfMaxValue = eigenVector.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
  var maxValue = eigenVector[indexOfMaxValue];

  if (indexOfMaxValue % 6 == 0 || indexOfMaxValue % 6 == 1 || indexOfMaxValue % 6 == 2) {
    var normalisedEigenVector = scalarMultiply(inputData.eigenVector, 1/maxValue);
    var scaledEigenVector = scalarMultiply(normalisedEigenVector, geometricScaleFactor);

    return scaledEigenVector;
  }

  else if (indexOfMaxValue % 6 == 3 || indexOfMaxValue % 6 == 4) {
    var maxXYZValue = maxValueXYZ(inputData.eigenVector);
    var normalisedEigenVector = scalarMultiply(inputData.eigenVector, 1/maxXYZValue);
    var scaledEigenVector = scalarMultiply(normalisedEigenVector, geometricScaleFactor);

    return scaledEigenVector;
  }

  else if (indexOfMaxValue % 6 == 5) {
    var normalisedEigenVector = scalarMultiply(inputData.eigenVector, 1/maxValue);
    var scaledEigenVector = scalarMultiply(normalisedEigenVector, tortionalScaleFactor);

    return scaledEigenVector;
  }
}

function scalarMultiply(arr: number[], multiplier: number) {
   for (var i = 0; i < arr.length; i++)
   {
      arr[i] *= multiplier;
   }
   return arr;
}

function maxValueXYZ(sixDOFEigenVector: number[]){
  var XYZContainer = [];
  for (var i = 0; i < sixDOFEigenVector.length)
   {
      XYZContainer.push(sixDOFEigenVector[i]);
      XYZContainer.push(sixDOFEigenVector[i+1]);
      XYZContainer.push(sixDOFEigenVector[i+2]);
      i += 6;
   }
   return Math.max.apply(null, XYZContainer);
}



init();
render();