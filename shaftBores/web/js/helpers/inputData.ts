namespace inputData {

    export var sectionData:number[][] = [   //(right_OR, left_OR, right_IR, left_IR, length, offset)
    [20, 10, 15, 8, 30, 0],
    [10, 20, 5, 15, 20, 30],
    [8, 10, 0, 0, 10, 50]
    ];

    export var nodeStore: number[][] = [ 

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

    export var nodeMass = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    export var eigenValue = 2;

    export var eigenVector = [1, 1, 1, 1, 1, 1,
                        1, 1, 1, 1, 1, 1,
                        1, 1, 1, 10, 1, 1,
                        1, 1, 1, 1, 1, 1,
                        1, 1, 1, 1, 1, 1,
                        1, 1, 1, 1, 1, 1,
                        1, 1, 1, 1, 1, 1,
                        1, 1, 1, 1, 1, 1,
                        1, 1, 1, 5, 1, 1,
                        1, 1, 1, 1, 1, 1,
                        1, 1, 1, 1, 1, 1,
                        1, 1, 1, 1, 1, 1,
                        1, 1, 1, 1, 1, 1,
                        1, 1, 1, 1, 1, 1];
}
