import * as React from "react";
import type { GlobalState } from "../globalState";
import { Scene } from "core/scene";
import type { Vector3 } from "core/Maths/math.vector";
import "core/Helpers/sceneHelpers";
import "../scss/renderingZone.scss";
interface IRenderingZoneProps {
    globalState: GlobalState;
    assetUrl?: string;
    autoRotate?: boolean;
    cameraPosition?: Vector3;
    expanded: boolean;
}
export declare class RenderingZone extends React.Component<IRenderingZoneProps> {
    private _currentPluginName?;
    private _engine;
    private _scene;
    private _canvas;
    constructor(props: IRenderingZoneProps);
    initEngine(): Promise<void>;
    prepareCamera(): void;
    handleErrors(): void;
    prepareLighting(): void;
    onSceneLoaded(filename: string): void;
    loadTextureAsset(url: string): Scene;
    loadAssetFromUrl(): void;
    loadAsset(): void;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: IRenderingZoneProps): boolean;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
