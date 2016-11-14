declare var THREE: any;

var scene, camera, controls, renderer;

var WIDTH: number = window.innerWidth;
var HEIGHT: number = window.innerHeight;

var nodes = new nodeSetGeometry.Cubes(inputData.nodeStore, inputData.nodeMass, 0.5);

function init() {
  scene = new THREE.Scene();
  for (let mesh of nodes.meshArray){
    scene.add(mesh);
  }
  initCamera();
  initControls();
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

function render() {
  requestAnimationFrame(render);
  controls.update()
  renderer.render(scene, camera);
}

init();
render();