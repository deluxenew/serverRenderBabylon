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
               'light1',
               new BABYLON.Vector3(1, 1, 0),
               scene
          );
          var light2 = new BABYLON.PointLight(
               'light2',
               new BABYLON.Vector3(0, -1, -1),
               scene
          );

          BABYLON.SceneLoader.Append("./", "1a.glb", scene, function (scene) {
               console.log(scene)
          });


          return scene;
     };


     var scene = createScene()
     // window.scene = scene
     engine.runRenderLoop(function() {
          scene.render();
     });
});
