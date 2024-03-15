window.addEventListener('DOMContentLoaded', function() {
     var canvas = document.getElementById('canvas');
     var engine = new BABYLON.Engine(canvas, true);


     var createScene = function() {
          // Create the scene space
          var scene = new BABYLON.Scene(engine);

          // add a camera to the scene and attach it to the canvas
          var camera = new BABYLON.ArcRotateCamera(
               'Camera',
               Math.PI / 2,
               Math.PI / 4,
               5,
               BABYLON.Vector3.Zero(),
               scene
          );
          camera.attachControl(canvas, true);

          //Add lights to scene
          var light1 = new BABYLON.HemisphericLight(
               'hemiLight',
               new BABYLON.Vector3(-1, 1, 0),
               scene
          );
          light1.diffuse = new BABYLON.Color3(1, 1, 1);
          // // light1.intensity = 1;
          //
          var light2 = new BABYLON.PointLight(
               'light2',
               new BABYLON.Vector3(-1, 0, -1),
               scene
          );
          // light2.intensity = 2;



          BABYLON.SceneLoader.Append("./", "BigTriplexHouseVilla.glb", scene, function (scene) {

               const materials = scene.materials
               const doorMaterial = materials.find(({name}) => name === "MI_CupboardDoor")
               const meshes = scene.meshes
               const dishwasher = meshes.find(({name}) => name === "SM_Dishwasher_68_StaticMeshComponent0")

               // dishwasher.material = new BABYLON.StandardMaterial("mirrorMaterial", scene);
               // dishwasher.material.reflectionTexture = new BABYLON.MirrorTexture("mirrorTexture", 512, scene, true);
               // dishwasher.material.reflectionTexture.mirrorPlane = BABYLON.Plane.FromPositionAndNormal(
               //     dishwasher.position, mesh.getFacetNormal(0).scale(-1));
               // dishwasher.material.reflectionTexture.renderList = meshes
               meshes.forEach((el) => {
                    var mat1 = new BABYLON.StandardMaterial("mat0", scene);
                    mat1.ambientColor = new BABYLON.Color3(0.8,1,1)
                    // mat0.bumpTexture = new BABYLON.Texture("https://cdn.shopify.com/s/files/1/0228/1393/3604/products/2020-01-29_23_25_30-Candium___Helena_Flooring_1200x1200.png", scene)
                    mat1.diffuseColor = new BABYLON.Color3(1,1,1)
                    el.material = mat1
               })
               var mat0 = new BABYLON.StandardMaterial("mat0", scene);
               mat0.diffuseTexture = new BABYLON.Texture("https://cdn.shopify.com/s/files/1/0228/1393/3604/products/2020-01-29_23_25_30-Candium___Helena_Flooring_1200x1200.png", scene)
               mat0.diffuseColor = new BABYLON.Color3(1,1,1)
               dishwasher.material = mat0
               console.log(dishwasher)
          });



          return scene;
     };


     var scene = createScene()

     // window.scene = scene
     engine.runRenderLoop(function() {
          scene.render();
     });
});
