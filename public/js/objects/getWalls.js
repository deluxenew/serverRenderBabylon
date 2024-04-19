export default function (scene) {
    const wallParams = [
        {
            size: {height: 30, width: 40},
            rotateAmount: Math.PI,
            rotateVector: new BABYLON.Vector3(0, 1.0, 0),
            position: [0, 15, -2.25]
        },
        {
            size: {height: 30, width: 40},
            rotateAmount: Math.PI / 2,
            rotateVector: new BABYLON.Vector3(0, 1.0, 0),
            position: [20, 15, 20 -2.25],
        },
        {
            size: {height: 30, width: 40},
            rotateAmount: -Math.PI / 2,
            rotateVector: new BABYLON.Vector3(0, 1.0, 0),
            position: [-20, 15,  20 -2.25]
        },
        {
            size: {height: 40, width: 40},
            rotateAmount: Math.PI/2 ,
            rotateVector: new BABYLON.Vector3(1, 0, 0),
            position: [0, 0, 20 - 2.25]
        },
        {
            size: {height: 40, width: 40},
            rotateAmount: -Math.PI /2,
            rotateVector: new BABYLON.Vector3(1, 0, 0),
            position: [0, 30, 20 - 2.25]
        }
    ]


    return wallParams.map((el) => {
        var marbleMaterial = new BABYLON.StandardMaterial("mirrorMaterial", scene);
        var marbleTexture = new BABYLON.MarbleProceduralTexture("mirrorMaterial", 1024, scene); //8192
        marbleTexture.numberOfTilesHeight = 16;
        marbleTexture.numberOfTilesWidth = 8;
        marbleMaterial.ambientTexture = marbleTexture;

        var plane = BABYLON.MeshBuilder.CreatePlane("plane", el.size, scene);

        plane.material = marbleMaterial;
        plane.position = new BABYLON.Vector3(el.position[0], el.position[1], el.position[2] );
        plane.rotate(el.rotateVector, el.rotateAmount, BABYLON.Space.LOCAL);

        // plane.material.reflectionTexture = new BABYLON.MirrorTexture("mirrorTexture", 512, scene, false);
        plane.receiveShadows = true;
        return plane
    })
}
