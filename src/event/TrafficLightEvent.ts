import {Event} from '../common/event/Event';
import {IEvent} from '../common/event/IEvent';
import {ITrafficLightData} from '../data/ITrafficLightData';

export class TrafficLightEvent extends Event implements IEvent {

    public static ACTION: string = "TrafficLightEvent.ACTION";

    protected _data: any;

    constructor(eventType: string, data: ITrafficLightData) {
        super(eventType);
        this._data = data;
    }

    public get data(): ITrafficLightData {
        return this._data;
    }
}