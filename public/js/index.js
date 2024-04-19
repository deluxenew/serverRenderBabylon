import {EnvironmentTools} from "../tools/environmentTools.js";
import getWalls from "./objects/getWalls.js";

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
        var scene = new BABYLON.Scene(engine);
        var camera = new BABYLON.ArcRotateCamera(
            'Camera',
            Math.PI / 3,
            Math.PI / 2.1,
            5,
            new BABYLON.Vector3(10, 12, 20),
            scene
        );
        camera.attachControl(canvas, true);


        var light1 = new BABYLON.PointLight("dir01", new BABYLON.Vector3(0, 20, 10), scene);
        light1.position = new BABYLON.Vector3(20, 120, 90);
        light1.shadowMaxZ = 100
        light1.shadowMinZ = 0.01
        light1.intensity = 0.6;


       var light0 = new BABYLON.HemisphericLight("Light", new BABYLON.Vector3(10, 20, 10), scene);
        light0.intensity = 0


        var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -1, -1), scene);
        light.position = new BABYLON.Vector3(1, 20, 5);
        light.intensity = 0.8;



        BABYLON.SceneLoader.Append("./", "City_Mirror-60_600х900.glb", scene, function (scene) {
            const root = scene.meshes.find(({name}) => name === '__root__')
            root.position.set(root.position.x, root.position.y + 15.5, root.position.z - 1.75)

        })


        BABYLON.SceneLoader.Append("./", "CityT-100_1000x600.glb", scene, function (scene) {
            var shadowGenerator1 = new BABYLON.ShadowGenerator(1024, light)
            var shadowGenerator2 = new BABYLON.ShadowGenerator(1024, light1)

            for (let i = 0; i < scene.meshes.length; i++) {
                    var obj = scene.meshes[i]

                if (obj.material && obj.material.name !== 'White_texture') {
                    // console.log(obj.material)

                }
                if (obj.material && obj.material.name === 'White_texture') {
                    console.log(obj.material)
                    var pbr = new BABYLON.PBRMaterial("pbr", scene)

                    // pbr.forceIrradianceInFragment = true;
                    // pbr.bumpTexture = pbr.emissiveTexture = new BABYLON.Texture("js/textures/wood.jpg", scene);
                    // pbr.useRoughnessFromMetallicTextureGreen = true;
                    // pbr.useMetallnessFromMetallicTextureBlue = true;
                    // pbr.useAmbientOcclusionFromMetallicTextureRed = true;
                    // pbr.metallicReflectanceColor = new BABYLON.Color3(0.63, 0.12, 0.12);
                    // pbr.metallicF0Factor = 0.9;
                    pbr.metallic = 0;
                    pbr.roughness = 0.5;
                    // //
                    pbr.clearCoat.isEnabled = true;
                    //
                    pbr.clearCoat.isTintEnabled = true;
                    pbr.clearCoat.tintColor = BABYLON.Color3.White();
                    pbr.clearCoat.tintColorAtDistance = 1;
                    pbr.clearCoat.tintThickness = 1.5;
                    obj.material = pbr
                }

                     shadowGenerator1.addShadowCaster(obj, true);
                     shadowGenerator2.addShadowCaster(obj, true);
                shadowGenerator1.useBlurExponentialShadowMap = true;
                shadowGenerator1.useContactHardeningShadow = true
                shadowGenerator1.useBlurCloseExponentialShadowMap = true
                shadowGenerator1.usePoissonSampling = true;
                shadowGenerator1.frustumEdgeFalloff = 3;
                shadowGenerator1.useKernelBlur = true;
                shadowGenerator1.blurKernel = 80;

                shadowGenerator2.useBlurExponentialShadowMap = true;
                shadowGenerator2.useContactHardeningShadow = true
                shadowGenerator2.useBlurCloseExponentialShadowMap = true
                shadowGenerator2.usePoissonSampling = true;
                shadowGenerator2.frustumEdgeFalloff = 3;
                shadowGenerator2.useKernelBlur = true;
                shadowGenerator2.blurKernel = 80;

                // shadowGenerator1.bias = 0.001;
                // shadowGenerator1.normalBias = 0.02;
                // light.shadowMaxZ = 100;
                // light.shadowMinZ = 10;
                // shadowGenerator1.useContactHardeningShadow = true;
                // shadowGenerator1.contactHardeningLightSizeUVRatio = 0.15;
                // shadowGenerator1.setDarkness(1.5);
                obj.receiveShadows = true;
            }
            const root = scene.meshes.filter(({name}) => name === '__root__')[1]
            root.position.set(root.position.x, root.position.y + 5, root.position.z)
        })

        getWalls(scene)

        scene.environmentTexture = EnvironmentTools.LoadSkyboxPathTexture(scene)
        return scene;
    };


    var scene = createScene()

    // window.scene = scene
    engine.runRenderLoop(function () {
        scene.render();
    });
});
