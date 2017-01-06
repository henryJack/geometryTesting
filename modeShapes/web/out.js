var animations;
(function (animations) {
    function updateNodePositions(time, nodeSetGeometry, eigenVector, eigenValue) {
        if (nodeSetGeometry.meshArray.length != eigenVector.length / 6) {
            throw new Error("nodeSetGeometry.length must equal eigenVector.length/6 - i.e. each node must have 6 degrees of freedom associated with it");
        }
        var theta = (eigenValue * time) % (2 * Math.PI);
        var sinTheta = Math.sin(theta);
        for (var i = 0; i < nodeSetGeometry.meshArray.length; i++) {
            var eigOffset = i * 6; //probably a more elegant method, James?
            nodeSetGeometry.meshArray[i].position.x = inputData.nodeStore[i][0] + eigenVector[eigOffset] * sinTheta;
            nodeSetGeometry.meshArray[i].position.y = inputData.nodeStore[i][1] + eigenVector[eigOffset + 1] * sinTheta;
            nodeSetGeometry.meshArray[i].position.z = inputData.nodeStore[i][2] + eigenVector[eigOffset + 2] * sinTheta;
            nodeSetGeometry.meshArray[i].rotation.x = eigenVector[eigOffset + 3] * sinTheta;
            nodeSetGeometry.meshArray[i].rotation.y = eigenVector[eigOffset + 4] * sinTheta;
            nodeSetGeometry.meshArray[i].rotation.z = eigenVector[eigOffset + 5] * sinTheta;
        }
    }
    animations.updateNodePositions = updateNodePositions;
    function updateShaftProfile() {
    }
    animations.updateShaftProfile = updateShaftProfile;
})(animations || (animations = {}));
var inputData;
(function (inputData) {
    inputData.nodeStore = [
        // Shaft 1
        [-3, 0, 0],
        [-2, 0, 0],
        [-1, 0, 0],
        [0, 0, 0],
        [1, 0, 0],
        [2, 0, 0],
        [3, 0, 0],
        // Shaft 2
        [-3, 2, 2],
        [-2, 2, 2],
        [-1, 2, 2],
        [0, 2, 2],
        [1, 2, 2],
        [2, 2, 2],
        [3, 2, 2],
    ];
    inputData.nodeMass = [0.5, 0.7, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    inputData.eigenValue = 2;
    inputData.eigenVector = [1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1,
        1, 1, 1, 10, 10, 1,
        1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1,
        1, 1, 1, 5, 1, 1,
        1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 10, 1,
        1, 1, 2, 1, 2, 2];
})(inputData || (inputData = {}));
var nodeSetGeometry;
(function (nodeSetGeometry) {
    var Cubes = (function () {
        function Cubes(nodeStore, nodeMass, nodeSize) {
            if (nodeStore.length != nodeMass.length) {
                throw new Error("nodeStore.length and nodeMass.length must be equal");
            }
            var meshArray = this.populateNodeContainer(nodeStore, nodeMass, nodeSize);
            this.meshArray = this.positionNodes(nodeStore, meshArray);
        }
        Cubes.prototype.populateNodeContainer = function (nodeStore, nodeMass, nodeSize) {
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
        };
        Cubes.prototype.positionNodes = function (nodeStore, meshArray) {
            for (var i = 0; i < meshArray.length; i++) {
                meshArray[i].position.fromArray(nodeStore[i]);
            }
            return meshArray;
        };
        return Cubes;
    }());
    nodeSetGeometry.Cubes = Cubes;
    var ContiniuousShaft = (function () {
        function ContiniuousShaft() {
        }
        return ContiniuousShaft;
    }());
    nodeSetGeometry.ContiniuousShaft = ContiniuousShaft;
})(nodeSetGeometry || (nodeSetGeometry = {}));
var stats;
var scene, camera, controls, renderer;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var clock;
var nodes = new nodeSetGeometry.Cubes(inputData.nodeStore, inputData.nodeMass, 0.5);
var modeShapeScaleFactor = 1; //should be based on bounding box of scene
var tortionalScaleFactor = Math.PI;
var scaledEigenValue = 1; // essentially the speed of the animation, default sahould be 1 but we should show the normalised value on screen
var scaledEigenVector = scaleEigenVector(inputData.eigenVector, modeShapeScaleFactor, tortionalScaleFactor);
function init() {
    scene = new THREE.Scene();
    for (var _i = 0, _a = nodes.meshArray; _i < _a.length; _i++) {
        var mesh = _a[_i];
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
    controls = new THREE.TrackballControls(camera);
    controls.rotateSpeed = 3.5;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 1.2;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [65, 83, 68];
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
    render();
}
function animateWithTime(time, nodes, EigenVector, EigenValue) {
    controls.update();
    animations.updateNodePositions(time, nodes, EigenVector, EigenValue);
    renderer.render(scene, camera);
}
function render() {
    requestAnimationFrame(render);
    var timeSeconds = clock.getElapsedTime();
    animateWithTime(timeSeconds, nodes, scaledEigenVector, scaledEigenValue);
}
function scaleEigenVector(eigenVector, geometricScaleFactor, tortionalScaleFactor) {
    var indexOfMaxValue = eigenVector.reduce(function (iMax, x, i, arr) { return x > arr[iMax] ? i : iMax; }, 0);
    var maxValue = eigenVector[indexOfMaxValue];
    if (indexOfMaxValue % 6 == 0 || indexOfMaxValue % 6 == 1 || indexOfMaxValue % 6 == 2) {
        var normalisedEigenVector = scalarMultiply(inputData.eigenVector, 1 / maxValue);
        var scaledEigenVector = scalarMultiply(normalisedEigenVector, geometricScaleFactor);
        return scaledEigenVector;
    }
    else if (indexOfMaxValue % 6 == 3 || indexOfMaxValue % 6 == 4) {
        var maxXYZValue = maxValueXYZ(inputData.eigenVector);
        var normalisedEigenVector = scalarMultiply(inputData.eigenVector, 1 / maxXYZValue);
        var scaledEigenVector = scalarMultiply(normalisedEigenVector, geometricScaleFactor);
        return scaledEigenVector;
    }
    else if (indexOfMaxValue % 6 == 5) {
        var normalisedEigenVector = scalarMultiply(inputData.eigenVector, 1 / maxValue);
        var scaledEigenVector = scalarMultiply(normalisedEigenVector, tortionalScaleFactor);
        return scaledEigenVector;
    }
}
function scalarMultiply(arr, multiplier) {
    for (var i = 0; i < arr.length; i++) {
        arr[i] *= multiplier;
    }
    return arr;
}
function maxValueXYZ(sixDOFEigenVector) {
    var XYZContainer = [];
    for (var i = 0; i < sixDOFEigenVector.length;) {
        XYZContainer.push(sixDOFEigenVector[i]);
        XYZContainer.push(sixDOFEigenVector[i + 1]);
        XYZContainer.push(sixDOFEigenVector[i + 2]);
        i += 6;
    }
    return Math.max.apply(null, XYZContainer);
}
init();
render();
//# sourceMappingURL=out.js.map