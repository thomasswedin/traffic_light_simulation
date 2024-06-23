import {Event} from '../common/event/Event';
import {IEvent} from '../common/event/IEvent';

export class GameEvent extends Event implements IEvent {

    public static GAME_OVER: string = "GameEvent.GAME_OVER";
    public static RESTART: string = "GameEvent.RESTART";
    public static ROW_HAS_BEEN_REMOVED: string = "GameEvent.ROW_HAS_BEEN_REMOVED";
    public static START: string = "GameEvent.START";

    protected _data: any;

    constructor(eventType: string) {
        super(eventType);
    }
}