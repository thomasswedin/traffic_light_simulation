import { inject, injectable } from "inversify";
import {Color, Container, Graphics} from 'pixi.js';
import { TYPES } from "../../Types";
import type { IEventDispatcher } from "../../common/event/IEventDispatcher";
import { GameConstants } from "../../constants/GameConstants";

@injectable()
export class TimerView{
    protected _view: Container;
    protected _background: Graphics;
    private _loaderBar: Container;
    protected _loaderBarFill:Graphics;

    @inject(TYPES.EventDispatcher) private _eventDispatcher: IEventDispatcher;

    public setup(): void {
      this._view = new Container();
      this._view.position.set(0, 0);
      this.createTimerBar();
    }

    public updateTimer(countdownSeconds:number): void {
        this.renderLoader(countdownSeconds);
    }

    public get view():Container {
        return this._view;
    }

    public restart(): void {
        //Reset the timer
        this._loaderBar.scale.x = 1;
    }

    protected renderLoader(countdownSeconds:number):void {
        const steps:number = GameConstants.VIEW_WIDTH/countdownSeconds;
        const scaleFactor:number = steps/GameConstants.VIEW_WIDTH;
        const currentScale:number = this._loaderBar.scale.x;
        let scale:number = typeof currentScale === 'number' ? currentScale - scaleFactor : 0;
        scale = scale <= 0 ? 0 : scale;
        this._loaderBar.scale.x = scale;

        const scaleNum:number = Math.round(scale * 100) / 100;
        const color:Color = this.getLoaderColor(scaleNum);

        this.changeBarFillColor(color);

    }


    protected getLoaderColor(percentage:number):Color {
        const red = Math.max(1 - percentage, 0);
        const green = Math.min(percentage, 1);
        const color = new Color([
            red, // Red component
            green, // Green component
            0 // Blue component (set to 0 for no blue)
          ]);
      
        return color;
      }
    

    protected changeBarFillColor(color:any): void {
        this._loaderBarFill.beginFill(color, 1)
        this._loaderBarFill.drawRect(0, 0, GameConstants.VIEW_WIDTH, 10);
        this._loaderBarFill.endFill();
    }

    protected createTimerBar():void {
        this._loaderBarFill = new Graphics();
        const color:Color = this.getLoaderColor(100);
        this.changeBarFillColor(color);
        this._loaderBarFill.position.set(0, 30);



        const loaderBarBoder = new Graphics();
        loaderBarBoder.lineStyle(1, 0x0, 1);
        loaderBarBoder.drawRect(0, 0, GameConstants.VIEW_WIDTH, 10);
        loaderBarBoder.position.set(0, 30);

        this._loaderBar = new Container();
        this._loaderBar.addChild(this._loaderBarFill);
        this._loaderBar.addChild(loaderBarBoder);

        this._loaderBar.position.set(0, 30);

        const border: Graphics = new Graphics();
        border.lineStyle(3, 0x0, 1);
        border.drawRect(0, 0, GameConstants.VIEW_WIDTH, 10);
        border.position.set(0, 60);

        this._view.addChild(this._loaderBar);
        this._view.addChild(border);

        
    }

}