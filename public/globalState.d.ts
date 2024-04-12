import { Observable } from "core/Misc/observable";
import type { Scene } from "core/scene";
import type { FilesInput } from "core/Misc/filesInput";
import "@dev/inspector";
export declare class GlobalState {
    currentScene: Scene;
    onSceneLoaded: Observable<{
        scene: Scene;
        filename: string;
    }>;
    onError: Observable<{
        scene?: Scene | undefined;
        message?: string | undefined;
    }>;
    onEnvironmentChanged: Observable<string>;
    onRequestClickInterceptor: Observable<void>;
    onClickInterceptorClicked: Observable<void>;
    glTFLoaderExtensions: {
        [key: string]: import("loaders/glTF/index").IGLTFLoaderExtension;
    };
    filesInput: FilesInput;
    isDebugLayerEnabled: boolean;
    commerceMode: boolean;
    reflector?: {
        hostname: string;
        port: number;
    };
    skybox: boolean;
    showDebugLayer(): void;
    hideDebugLayer(): void;
}
