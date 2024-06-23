import { inject, injectable } from "inversify";
import { TYPES } from "../../Types";
import type { IEventDispatcher } from "../../common/event/IEventDispatcher";

@injectable()
export class TimerModel {
    @inject(TYPES.EventDispatcher) private _eventDispatcher: IEventDispatcher;
    private _minutes: number;
    private _seconds: number;
    private _countdownSeconds: number;
    
    public setup(): void {
        this._minutes = 0;
        this._seconds = 0;
    }

    public  restart(): void {
        this._minutes = 0;
        this._seconds = 0;
    }

    public get minutes(): number {
        return this._minutes;
    }
    
    public set minutes(value: number) {
        this._minutes = value;
    }

    public get seconds(): number {
        return this._seconds;
    }
    
    public set seconds(value: number) {
        this._seconds = value;
    }

    public get countdownSeconds(): number {
        return this._countdownSeconds;
    }
    
    public set countdownSeconds(value: number) {
        this._countdownSeconds = value;
    }
}