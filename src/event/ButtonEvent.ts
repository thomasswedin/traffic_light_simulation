import { Event } from '../common/event/Event';
import { IEvent } from '../common/event/IEvent';

export class ButtonEvent extends Event implements IEvent {

    public static RESTART: string = "ButtonEvent.RESTART";
    public static PAUSE: string = "ButtonEvent.PAUSE";
    public static NEXT_STATE: string = "ButtonEvent.NEXT_STATE";
    public static GO_STATE: string = "ButtonEvent.GO_STATE";
    public static STOP_STATE: string = "ButtonEvent.STOP_STATE";
    public static YELLOW_BLINK_STATE: string = "ButtonEvent.YELLOW_BLINK_STATE";

    constructor(eventType: string) {
        super(eventType);
    }
}