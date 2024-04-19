export class EnvironmentTools {
     static SkyboxPath = "";
     static Skyboxes = ["https://assets.babylonjs.com/environments/environmentSpecular.env", "https://assets.babylonjs.com/environments/studio.env"];

     static SkyboxesNames = ["Default", "Studio"];

     static LoadSkyboxPathTexture(scene) {

        const path = this.SkyboxPath || this.Skyboxes[1];
        if (path.indexOf(".hdr") === path.length - 1) {
            return new BABYLON.HDRCubeTexture(path, scene, 256, false, true, true, true);
        }
        return BABYLON.CubeTexture.CreateFromPrefilteredData(path, scene);
    }
}
