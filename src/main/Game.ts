import { Container as System } from "inversify";
import {Assets, Container, Sprite } from 'pixi.js';
import "reflect-metadata";
import { TYPES } from "../Types";
import type {IEventDispatcher } from "../common/event/IEventDispatcher";
import { EventDispatcher } from "../common/event/EventDispatcher";

import { IScene } from "../common/IScene";
import { TimerController } from "../timer/controller/TimerController";
import { Manager } from "./Manager";
import { Helper } from "../common/utils/Helper";
//import { GameConstants } from "../constants/GameConstants";

export class Game extends Container implements IScene {


    constructor() {
        super();
        this.init();
    }

    public update(framesPassed: number): void {

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
        const system = new System();
        system.bind<IEventDispatcher>(TYPES.EventDispatcher).toConstantValue(EventDispatcher.getInstance());

        window.addEventListener("orientationchange", this.orientationChange.bind(this));
        this.setupBackground(1);
        
        this.orientationChange();
        this.reScale(Manager.width, Manager.height);
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
