import {injectable } from "inversify";

@injectable()
export class TrafficLightModel {

    private _level: number;

    constructor() {
        this._level = 1;
    }

    public get level(): number {
        return this._level;
    }
    public set level(value: number) {
        this._level = value;
    }
}