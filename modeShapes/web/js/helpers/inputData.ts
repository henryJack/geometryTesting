namespace inputData {
    export var nodeStore: number[][] = [ //contains each nodes initial (x,y,z) position
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

    export var nodeMass = [0.5, 0.7, 0.9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    export var eigenValue = 2;

    export var eigenVector = [1, 1, 1, 1, 1, 1, //14 nodes x 6 degree of freedom
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
}
