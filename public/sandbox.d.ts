import * as React from "react";
import type { IScreenshotSize } from "core/Misc/interfaces/screenshotSize";
import "./scss/main.scss";
interface ISandboxProps {
}
export declare class Sandbox extends React.Component<ISandboxProps, {
    isFooterVisible: boolean;
    errorMessage: string;
}> {
    private _globalState;
    private _assetUrl?;
    private _autoRotate?;
    private _cameraPosition?;
    private _dropTextRef;
    private _clickInterceptorRef;
    private _clearColor?;
    private _camera?;
    constructor(props: ISandboxProps);
    checkUrl(): void;
    componentDidUpdate(): void;
    render(): import("react/jsx-runtime").JSX.Element;
    private static _SceneLoadedDeferred;
    static Show(hostElement: HTMLElement): void;
    static CaptureScreenshotAsync(size: IScreenshotSize | number, mimeType?: string): Promise<string>;
}
export {};
