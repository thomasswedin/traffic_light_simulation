import {inject, injectable} from "inversify";
import {Assets, Container, Graphics, Point, Sprite} from 'pixi.js';
import {IScene} from "../../common/IScene.ts";
import {AppConstants} from "../../constants/AppConstants.ts";
import {TYPES} from "../../Types";
import type {IEventDispatcher} from "../../common/event/IEventDispatcher";
import {gsap} from "gsap";
//import {PixiPlugin} from "gsap/PixiPlugin";
import {TrafficLightState} from "../controller/TrafficLightState";

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

    private _redLightPos: Point = new Point(165, 172);
    private _yellowLightPos: Point = new Point(165, 382);
    private _greenLightPos: Point = new Point(165, 592);

    public setup(): void {
        this._view = new Container();
        this._view.position.set(0, 0);
        this.createBackground();
        this.turnOffAllLights();
    }

    public switch(state: TrafficLightState, previousState: TrafficLightState): void {
        switch (previousState) {
            case TrafficLightState.Red:
                this.turnLight(this._redLightOn, false);
                break;
            case TrafficLightState.Yellow:
                this.turnLight(this._yellowLightOn, false);
                break;
            case TrafficLightState.Green:
                this.turnLight(this._greenLightOn, false);
                break;
            default:
                console.log("Invalid state");
                break;
        }

        switch (state) {
            case TrafficLightState.Red:
                this.turnLight(this._redLightOn, true);
                break;
            case TrafficLightState.Yellow:
                this.turnLight(this._yellowLightOn, true);
                break;
            case TrafficLightState.Green:
                this.turnLight(this._greenLightOn, true);
                break;
            default:
                console.log("Invalid state");
                break;
        }
    }

    protected turnOffAllLights(): void {
        gsap.to(this._redLightOn, {duration: 0, alpha: 0});
        gsap.to(this._yellowLightOn, {duration: 0, alpha: 0});
        gsap.to(this._greenLightOn, {duration: 0, alpha: 0});
    }

    protected createBackground(): void {
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

    protected turnLight(light: Sprite, status: boolean): void {
        gsap.to(light, {duration: AppConstants.SWITCH_DURATION, alpha: status ? 1 : 0});
    }

    public restart(): void {
        //TODO
    }

    public get view(): Container {
        return this._view;
    }
}