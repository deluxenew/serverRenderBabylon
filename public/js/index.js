import {EnvironmentTools} from "../tools/environmentTools.js";

window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('canvas');
    var engine = new BABYLON.Engine(canvas, true, {
        useHighPrecisionMatrix: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: true,
        antialias: true,
        forceSRGBBufferSupportState: true,
    });

    var createScene = function () {
        // Create the scene space
        var scene = new BABYLON.Scene(engine);

        // add a camera to the scene and attach it to the canvas
        var camera = new BABYLON.ArcRotateCamera(
            'Camera',
            Math.PI / 2,
            Math.PI / 2,
            5,
            new BABYLON.Vector3(0, 5, 20),
            scene
        );
        camera.attachControl(canvas, true);
        var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);

        light.position = new BABYLON.Vector3(20, 40, 20);
        light.intensity = 0.5;


        BABYLON.SceneLoader.Append("./", "City_Mirror-60_600х900.glb", scene)


        BABYLON.SceneLoader.Append("./", "CityT-100_1000x600.glb", scene, function (scene) {
            scene.meshes.forEach((mesh, index) => index === 2 && mesh.position.set(mesh.position.x, mesh.position.y + 10, mesh.position.z))
            var shadowGenerator1 = new BABYLON.ShadowGenerator(1024, light)
            for (let i = 0; i < scene.meshes.length; i++) {
                if (i !== 0) {
                    var obj = scene.meshes[i]
                    console.log(obj)
                    shadowGenerator1.addShadowCaster(obj);
                }
            }
            shadowGenerator1.useExponentialShadowMap = true;
            shadowGenerator1.usePoissonSampling = true;
        })


        var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "https://lh3.googleusercontent.com/WhCXUdhXb5DNHxIWCVrJW9J90EUEB3o_EojNoutYAv6zX6HQJUHP0tYpPDFq4JEZIYtsGE0ZOzkpAinVqitBa6vO=w640-h400-e365-rj-sc0x00ffffff", 100, 100, 100, 0, 10, scene, false);
        var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("https://lh3.googleusercontent.com/WhCXUdhXb5DNHxIWCVrJW9J90EUEB3o_EojNoutYAv6zX6HQJUHP0tYpPDFq4JEZIYtsGE0ZOzkpAinVqitBa6vO=w640-h400-e365-rj-sc0x00ffffff", scene);
        groundMaterial.diffuseTexture.uScale = 6;
        groundMaterial.diffuseTexture.vScale = 6;
        groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
        ground.position.y = -2.05;
        ground.material = groundMaterial;
        ground.position = new BABYLON.Vector3(0, -8, 0);


        scene.environmentTexture = EnvironmentTools.LoadSkyboxPathTexture(scene)


        ground.receiveShadows = true;


        return scene;
    };


    var scene = createScene()

    // window.scene = scene
    engine.runRenderLoop(function () {
        scene.render();
    });
});
