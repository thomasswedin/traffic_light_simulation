import { inject, injectable } from "inversify";
import {Assets, Container, Graphics, Point, Sprite} from 'pixi.js';
import { TYPES } from "../../Types";
import type { IEventDispatcher } from "../../common/event/IEventDispatcher";

@injectable()
export class TrafficLightView {
    @inject(TYPES.EventDispatcher) private _eventDispatcher: IEventDispatcher;

    protected _view: Container;
    private _trafficLight: Sprite;

    private _redLightOff: Sprite;
    private _yellowLightOff: Sprite;
    private _greenLightOff: Sprite;

    private _redLightOn: Sprite;
    private _yellowLightOn: Sprite;
    private _greenLightOn: Sprite;

    private _redLightPos: Point = new Point(165,172);
    private _yellowLightPos: Point = new Point(165,382);
    private _greenLightPos: Point = new Point(165,592);

    public setup(): void {
        this._view = new Container();
        this._view.position.set(0, 0);
        this.createBackground();
    }

    protected createBackground():void {
        const sheet = Assets.get('traffic-lightJSON');
        this._trafficLight = Sprite.from(sheet.textures["background.png"]);

        this._redLightOff = Sprite.from(sheet.textures["off.png"]);
        this._yellowLightOff = Sprite.from(sheet.textures["off.png"]);
        this._greenLightOff = Sprite.from(sheet.textures["off.png"]);

        this._redLightOn = Sprite.from(sheet.textures["red.png"]);
        this._yellowLightOn = Sprite.from(sheet.textures["yellow.png"]);
        this._greenLightOn = Sprite.from(sheet.textures["green.png"]);

        this._redLightOff.position.set(this._redLightPos.x, this._redLightPos.y);
        this._yellowLightOff.position.set(this._yellowLightPos.x, this._yellowLightPos.y);
        this._greenLightOff.position.set(this._greenLightPos.x, this._greenLightPos.y);

        this._redLightOn.position.set(this._redLightPos.x, this._redLightPos.y);
        this._yellowLightOn.position.set(this._yellowLightPos.x, this._yellowLightPos.y);
        this._greenLightOn.position.set(this._greenLightPos.x, this._greenLightPos.y);

        this._view.addChild(this._trafficLight);

        this._view.addChild(this._redLightOff);
        this._view.addChild(this._yellowLightOff);
        this._view.addChild(this._greenLightOff);

        this._view.addChild(this._redLightOn);
        this._view.addChild(this._yellowLightOn);
        this._view.addChild(this._greenLightOn);
    }

    public restart(): void {
        //TODO
    }

    public get view():Container {
        return this._view;
    }
}