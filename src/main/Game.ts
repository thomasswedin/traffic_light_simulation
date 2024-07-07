import { Container as System } from "inversify";
import {Assets, Container, Sprite } from 'pixi.js';
import "reflect-metadata";
import {TrafficLightController} from "../traffic_light/controller/TrafficLightController.ts";
import {TrafficLightView} from "../traffic_light/view/TrafficLightView.ts";
import { TYPES } from "../Types";
import type {IEventDispatcher } from "../common/event/IEventDispatcher";
import { EventDispatcher } from "../common/event/EventDispatcher";

import { IScene } from "../common/IScene";
import { Manager } from "./Manager";
import { Helper } from "../common/utils/Helper";

import { AppConstants } from "../constants/AppConstants.ts";

export class Game extends Container implements IScene {

    protected _trafficLightControllerOne: TrafficLightController;
    protected _trafficLightViewOne:TrafficLightView;

    protected _trafficLightControllerTwo: TrafficLightController;
    protected _trafficLightViewTwo:TrafficLightView;

    protected _trafficLightControllerThree: TrafficLightController;
    protected _trafficLightViewThree:TrafficLightView;

    protected _trafficLightControllerFour: TrafficLightController;
    protected _trafficLightViewFour: TrafficLightView;

    protected _system: System;

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
        this._trafficLightControllerOne.setup(this._system);
        this._trafficLightViewOne = this._trafficLightControllerOne.view;

        this._trafficLightControllerTwo = this._system.resolve<TrafficLightController>(TrafficLightController);
        this._trafficLightControllerTwo.setup(this._system);
        this._trafficLightViewTwo = this._trafficLightControllerTwo.view;

        this._trafficLightControllerThree = this._system.resolve<TrafficLightController>(TrafficLightController);
        this._trafficLightControllerThree.setup(this._system);
        this._trafficLightViewThree = this._trafficLightControllerThree.view;

        this._trafficLightControllerFour = this._system.resolve<TrafficLightController>(TrafficLightController);
        this._trafficLightControllerFour.setup(this._system);
        this._trafficLightViewFour = this._trafficLightControllerFour.view;


        //this._trafficLightControllerOne = this._system.resolve<TrafficLightController>(TrafficLightController);
        //this._trafficLightControllerTwo = this._system.resolve<TrafficLightController>(TrafficLightController);
        //this._trafficLightControllerThree = this._system.resolve<TrafficLightController>(TrafficLightController);
        //this._trafficLightControllerFour = this._system.resolve<TrafficLightController>(TrafficLightController);

        //this.setupNewTrafficLight(this._trafficLightControllerOne, this._trafficLightViewOne, AppConstants.TRAFFIC_LIGHT_1);
        //this.setupNewTrafficLight(this._trafficLightControllerTwo, this._trafficLightViewTwo, AppConstants.TRAFFIC_LIGHT_2);
        //this.setupNewTrafficLight(this._trafficLightControllerThree, this._trafficLightViewThree, AppConstants.TRAFFIC_LIGHT_3);
        //this.setupNewTrafficLight(this._trafficLightControllerFour, this._trafficLightViewFour, AppConstants.TRAFFIC_LIGHT_4);


        //Change the size of the traffic light view
        this._trafficLightViewOne.view.scale.set(0.06);
        this._trafficLightViewOne.view.position.set(30, 10);
        this.addChild(this._trafficLightViewOne.view);

        this._trafficLightViewTwo.view.scale.set(0.06);
        this._trafficLightViewTwo.view.position.set(-10, 34);
        this.addChild(this._trafficLightViewTwo.view);

        this._trafficLightViewThree.view.scale.set(0.06);
        this._trafficLightViewThree.view.position.set(70, 34);
        this.addChild(this._trafficLightViewThree.view);

        this._trafficLightViewFour.view.scale.set(0.06);
        this._trafficLightViewFour.view.position.set(30, 60);
        this.addChild(this._trafficLightViewFour.view);

        window.addEventListener("orientationchange", this.orientationChange.bind(this));
        this.setupBackground(1);

        this.orientationChange();
        this.reScale(Manager.width, Manager.height);
    }

    private setupNewTrafficLight(controller:TrafficLightController, view:TrafficLightView, id:string): void {
        controller.setup(this._system);
        view = controller.view;
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
    }

    private positionElementsForPortraiteMode(): void {
        console.log("PORTRAITE_MODE");

        const xPos: number = 30;
        const yPos: number = 30;
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
