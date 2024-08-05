import { Container as System } from "inversify";
import {Assets, Container, Sprite } from 'pixi.js';
import "reflect-metadata";
import {ITrafficLightController} from "../traffic_light/controller/ITrafficLightController.ts";
import {TrafficLightController} from "../traffic_light/controller/TrafficLightController.ts";
import {ITrafficLightView} from "../traffic_light/view/ITrafficLightView.ts";
import { TYPES } from "../Types";
import type {IEventDispatcher } from "../common/event/IEventDispatcher";
import { EventDispatcher } from "../common/event/EventDispatcher";
import { TrafficLightManager } from "../traffic_light_manager/TrafficLightManager.ts";

import { IScene } from "../common/IScene";
import { Manager } from "./Manager";
import { Helper } from "../common/utils/Helper";

import { AppConstants } from "../constants/AppConstants.ts";

export class Game extends Container implements IScene {

    protected _trafficLightControllerOne: ITrafficLightController;
    protected _trafficLightViewOne:ITrafficLightView;

    protected _trafficLightControllerTwo: ITrafficLightController;
    protected _trafficLightViewTwo:ITrafficLightView;

    protected _trafficLightControllerThree: ITrafficLightController;
    protected _trafficLightViewThree:ITrafficLightView;

    protected _trafficLightControllerFour: ITrafficLightController;
    protected _trafficLightViewFour: ITrafficLightView;

    protected _system: System;
    protected _trafficLightManager: TrafficLightManager;

    constructor() {
        super();
        this.init();
    }

    public update(framesPassed: number): void {
        if(this._trafficLightControllerThree){
            this._trafficLightControllerThree.update(framesPassed)
        }

        if(this._trafficLightControllerTwo){
            this._trafficLightControllerTwo.update(framesPassed)
        }
    }

    public resize(width: number, height: number): void {
        this.reScale(width, height);
    }

    protected changeBackground(newBackground: Sprite): void {
        newBackground.width = Manager.width;
        newBackground.height = Manager.height;
        newBackground.position.set(0, 0);
        Manager.changeBackground(newBackground);
    }
    

    protected init() {
        this._system = new System();
        this._system.bind<IEventDispatcher>(TYPES.EventDispatcher).toConstantValue(EventDispatcher.getInstance());

        this._trafficLightControllerOne = this._system.resolve<TrafficLightController>(TrafficLightController);
        this._trafficLightControllerTwo = this._system.resolve<TrafficLightController>(TrafficLightController);
        this._trafficLightControllerThree = this._system.resolve<TrafficLightController>(TrafficLightController);
        this._trafficLightControllerFour = this._system.resolve<TrafficLightController>(TrafficLightController);

        this.setupNewTrafficLight(this._trafficLightControllerOne, this._trafficLightViewOne, AppConstants.TRAFFIC_LIGHT_1);
        this.setupNewTrafficLight(this._trafficLightControllerTwo, this._trafficLightViewTwo, AppConstants.TRAFFIC_LIGHT_2);
        this.setupNewTrafficLight(this._trafficLightControllerThree, this._trafficLightViewThree, AppConstants.TRAFFIC_LIGHT_3);
        this.setupNewTrafficLight(this._trafficLightControllerFour, this._trafficLightViewFour, AppConstants.TRAFFIC_LIGHT_4);

        window.addEventListener("orientationchange", this.orientationChange.bind(this));
        this.setupBackground(1);

        this.orientationChange();
        this.reScale(Manager.width, Manager.height);
        this._trafficLightManager = this._system.resolve<TrafficLightManager>(TrafficLightManager);
        this._trafficLightManager.init();
    }

    private setupNewTrafficLight(controller:ITrafficLightController, view:ITrafficLightView, id:string): void {
        controller.setup(this._system, id);
        view = controller.view;
        view.view.scale.set(0.06);
        let pos = this.getPos(id);
        view.view.position.set(pos.x, pos.y);
        this.addChild(view.view);
    }

    protected getPos(id:string):any {
        let pos:any = {x:0, y:0};
        switch(id) {
            case AppConstants.TRAFFIC_LIGHT_1:
                pos.x = 30;
                pos.y = 10;
                break;
            case AppConstants.TRAFFIC_LIGHT_2:
                pos.x = -10;
                pos.y = 34;
                break;
            case AppConstants.TRAFFIC_LIGHT_3:
                pos.x = 70;
                pos.y = 34;
                break;
            case AppConstants.TRAFFIC_LIGHT_4:
                pos.x = 30;
                pos.y = 60;
                break;
        }
        return pos;
    }

    private orientationChange(): void {
        if (Helper.isOrientationPortrait()) {
            this.positionElementsForPortraiteMode();
         } else {
            this.positionElementsForLandscapeMode();
         }
    }  

    private setupBackground(level:number): void {
        const sheet = Assets.get('backgroundJSON');
        const background = Sprite.from(sheet.textures["level" +  level + ".png"]);
        this.changeBackground(background);
    }


    private positionElementsForLandscapeMode(): void {
        console.log("LANDSCAPE_MODE");
        const xPos: number = 0;
        const yPos: number = 0;
        //this.position.set(xPos, 50);
    }

    private positionElementsForPortraiteMode(): void {
        console.log("PORTRAITE_MODE");

        const xPos: number = 130;
        const yPos: number = 30;
        //this.position.set(xPos, 50);
    }

    private reScale(width: number, height: number): void {

        this.x = 0;
        this.y = 0;

        this.scale.x = 1;
        this.scale.y = 1;
        
        const deltaSpace: number = 30;
        const gameContainerWidth = Math.floor(Helper.calculateContentWidth(this)) + deltaSpace;
        const gameContainerHeight = Math.floor(Helper.calculateContentHeight(this)) + deltaSpace;

        //Round gameContainerWidth to integer

        //Scale the game to the window but keep the aspect ratio
        const scale = Math.min(width / gameContainerWidth, height / gameContainerHeight);
        this.scale.x = scale;
        this.scale.y = scale;

        if (Helper.isOrientationPortrait()) {
            this.y = (height - (this.height)) * 0.5;
        } else {
            this.x = (width - (this.width)) * 0.5;
        }
    }
}
