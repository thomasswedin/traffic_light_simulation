import {inject, injectable} from "inversify";
import {Assets, Container, Graphics, Point, Sprite} from 'pixi.js';
import {IScene} from "../../common/IScene.ts";
import {AppConstants} from "../../constants/AppConstants.ts";
import {TYPES} from "../../Types";
import type {IEventDispatcher} from "../../common/event/IEventDispatcher";
import {gsap} from "gsap";
//import {PixiPlugin} from "gsap/PixiPlugin";
import {TrafficLightState} from "../controller/TrafficLightState";
import {ITrafficLightView} from "./ITrafficLightView.ts";

@injectable()
export class TrafficLightView  implements ITrafficLightView{
    @inject(TYPES.EventDispatcher) private _eventDispatcher: IEventDispatcher;

    protected _view: Container;
    protected _trafficLightView: Container;
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

    private _lightAnimation: gsap.core.Tween;

    public setup(): void {
        this._view = new Container();
        this._view.position.set(0, 0);

        this._trafficLightView = new Container();
        this._trafficLightView.position.set(0, 0);

        this.createBackground();
        this.turnOffAllLights();
    }

    public switch(state: TrafficLightState, previousState: TrafficLightState): void {
        switch (previousState) {
            case TrafficLightState.Red:
                this.turnLight(this._redLightOn, false, 2);
                break;
            case TrafficLightState.Yellow:
                this.turnLight(this._yellowLightOn, false);
                break;
            case TrafficLightState.Green:
                this.turnLight(this._greenLightOn, false, 2);
                break;
            case TrafficLightState.Idle:
                //this.killIdleYellowLight();
                this.turnLight(this._yellowLightOn, false);
                this.pauseIdleYellowLight();
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
            case TrafficLightState.Idle:
                this.idleYellowLight();
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

        this._trafficLightView.addChild(this._trafficLight);

        this._trafficLightView.addChild(this._redLightOff);
        this._trafficLightView.addChild(this._yellowLightOff);
        this._trafficLightView.addChild(this._greenLightOff);

        this._trafficLightView.addChild(this._redLightOn);
        this._trafficLightView.addChild(this._yellowLightOn);
        this._trafficLightView.addChild(this._greenLightOn);
        this._trafficLightView.scale.set(0.5);
        this._trafficLightView.position.set(160, 0);
        this._view.addChild(this._trafficLightView);
    }

    protected turnLight(light: Sprite, status: boolean, delay?:number): void {
        let d:number;
        if(delay == undefined) {
            gsap.to(light, {duration: AppConstants.SWITCH_DURATION, alpha: status ? 1 : 0});
        } else {
            gsap.to(light, {duration: AppConstants.SWITCH_DURATION, alpha: status ? 1 : 0, delay: delay});
        }

    }

    protected pauseIdleYellowLight(): void {
        //this._lightAnimation.kill();
        this._lightAnimation.pause();
    }

    protected idleYellowLight(): void {

        if(this._lightAnimation) {
            this._lightAnimation.resume();
            return;
        }

        this._lightAnimation = gsap.to(this._yellowLightOn, {
            duration: 1, // Animation duration (adjust as needed)
            alpha: 1, // Target alpha (1 for fully visible)
            repeat: -1, // Infinite repeat
            yoyo: true, // Alternates between fade in and fade out
        });

        //if I would like to stop the animation and start it again
        //this._lightAnimation.pause();
        //this._lightAnimation.resume();
   }

    public restart(): void {
        //TODO
    }

    public get view(): Container {
        return this._view;
    }
}