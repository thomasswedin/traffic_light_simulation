import { inject, injectable } from "inversify";
import {Container, Graphics, Text} from 'pixi.js';
import { TYPES } from "../../Types";
import { IEventDispatcher } from "../../common/event/EventDispatcher";

@injectable()
export class TimerTextView{
    protected _view: Container;
    protected _background: Graphics;

    private _time: number;
    private _timerText: Text;

    @inject(TYPES.EventDispatcher) private _eventDispatcher: IEventDispatcher;

    public setup(): void {
      this._view = new Container();
      this._view.position.set(0, 0);
      this.createTimerText();
    }

    public updateTimer(minutes:number, seconds:number): void {
        this._time = minutes * 60 + seconds;
        this._timerText.text = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    public get view():Container {
        return this._view;
    }

    public restart(): void {
        //Reset the timer
    }

    protected createTimerText():void {
        this._timerText =  new Text('02:10', {
            fontFamily: 'Retro Gaming',
            fontWeight: 'bold',
            fontSize: 18,
            fill: 0x000000,
            align: 'center',
        });
        
        this._view.addChild(this._timerText);
    }
}