import {DisplayObject } from "pixi.js";

export interface IScene extends DisplayObject {
    update(framesPassed: number): void;
    resize(width: number, height: number): void;
    //add width and height to the interface
    width: number;
    height: number;
}