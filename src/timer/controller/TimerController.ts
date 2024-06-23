import { inject, injectable, Container as System } from "inversify";
import type { IEventDispatcher } from "../../common/event/IEventDispatcher.ts";
import { TYPES } from "../../Types";
import { TimerView } from "../view/TimerView";
import { TimerModel } from "../model/TimerModel";
import { ButtonEvent } from "../../event/ButtonEvent";
import { GameEvent } from "../../event/GameEvent";
//import { Manager } from "../../main/Manager";
import { TimerTextView } from "../view/TimerTextView";
import {Container} from 'pixi.js';

@injectable()
export class TimerController {
    
    @inject(TYPES.EventDispatcher) private _eventDispatcher: IEventDispatcher;
    protected _view: Container;
    protected _timerView:TimerView;
    protected _timerTextView:TimerTextView;
    protected _model:TimerModel;
    protected _gameOver:boolean = false;
    
    private timerInterval: number;
    private startTime: number;

    public setup(system:System): void {
        this._model = system.resolve<TimerModel>(TimerModel);
        this._timerView = system.resolve<TimerView>(TimerView);
        this._timerTextView = system.resolve<TimerTextView>(TimerTextView);
        this.setStartCountdownTime();
        this._view = new Container();
        this.addEventlisteners();
        this._model.setup();
        
        this._timerView.setup();
        this._timerTextView.setup();
        this._timerTextView.view.position.set(0, 36);
        this._view.addChild(this._timerView.view);
        this._view.addChild(this._timerTextView.view);
    }

    get view():Container {
        return this._view;
    }

    public update(deltaTime?: number): void {

        if(deltaTime < 0){
            console.log("deltaTime: " +  deltaTime);
        }
        
        this.updateTimer();
    }

    protected setStartCountdownTime(): void {
        this._model.countdownSeconds = 2 * 60 + 10; // 2 minutes and 10 seconds
    }

    protected start(): void {
        this.initTimer();
    }

    /*protected initTimer(): void {
        this.startTime = Date.now();
        this.timerInterval = setInterval(this.updateTimer.bind(this), 1000 / Manager.fps);
    }*/

    protected initTimer(): void {
        this.startTime = Date.now();
        //const ticker = new Ticker();
        //ticker.add(this.updateTimer.bind(this));
        //ticker.start();
    }

    protected updateTimer(): void {

        //console.log("GameController updateTimer");
        if(this._gameOver){ return; }
        if(this.startTime == null){ return; }

        const elapsedSeconds = Math.floor((Date.now() - this.startTime) / 1000);
        const remainingSeconds = this._model.countdownSeconds  - elapsedSeconds;

        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;

        if (minutes != this._model.minutes || seconds != this._model.seconds) {
            this._model.minutes = minutes;
            this._model.seconds = seconds;
            this._timerView.updateTimer(this._model.countdownSeconds);
            this._timerTextView.updateTimer(this._model.minutes, this._model.seconds);
        }

        if (remainingSeconds <= 0) {
            this.timerComplete();
        }
    }

    protected timerComplete(): void {
        console.log("TimerController : timerComplete");
        this._eventDispatcher.dispatchEvent(new GameEvent(GameEvent.GAME_OVER));
        //this._eventDispatcher.dispatchEvent(new ButtonEvent(ButtonEvent.RESTART));
    }

    protected addEventlisteners(): void {
        this._eventDispatcher.addEventListener(GameEvent.START, this.start, this);
        this._eventDispatcher.addEventListener(ButtonEvent.RESTART, this.restart, this);
        this._eventDispatcher.addEventListener(GameEvent.GAME_OVER, this.gameOver, this);
    }

    protected restart(): void {
        this._gameOver = false;
        clearInterval(this.timerInterval);
        this.initTimer();

        this._model.restart();
        this._timerView.restart();
        this._timerTextView.restart();
        
        //this._timerTextView.restart();
        console.log("TimerController : restart");
    }

    protected gameOver(): void {
        this._gameOver = true;
        clearInterval(this.timerInterval);
    }
}