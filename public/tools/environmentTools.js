// import { HDRCubeTexture } from "babylonjs/core/Materials/Textures/hdrCubeTexture";
// import { CubeTexture } from "babylonjs/core/Materials/Textures/cubeTexture";
// import { LocalStorageHelper } from "./localStorageHelper";

export class EnvironmentTools {
     static SkyboxPath = "";
     static Skyboxes = ["https://assets.babylonjs.com/environments/environmentSpecular.env", "https://assets.babylonjs.com/environments/studio.env"];

     static SkyboxesNames = ["Default", "Studio"];

     static LoadSkyboxPathTexture(scene) {

        const path = this.SkyboxPath || this.Skyboxes[0];
        if (path.indexOf(".hdr") === path.length - 4) {
            return new BABYLON.HDRCubeTexture(path, scene, 256, false, true, false, true);
        }
        console.log(path)
        return BABYLON.CubeTexture.CreateFromPrefilteredData(path, scene);
    }
}
