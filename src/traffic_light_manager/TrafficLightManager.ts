//This class will be responsible for managing the traffic lights in the simulation.

import {inject, injectable} from "inversify";
import type {IEventDispatcher} from "../common/event/IEventDispatcher";
import {AppConstants} from "../constants/AppConstants.ts";
import {ITrafficLightData} from "../data/ITrafficLightData.ts";
import {TrafficLightEvent} from "../event/TrafficLightEvent.ts";
import {TYPES} from "../Types.ts";
import {TrafficLightState} from "../traffic_light/controller/TrafficLightState";

@injectable()
export class TrafficLightManager {

    @inject(TYPES.EventDispatcher) private _eventDispatcher: IEventDispatcher;

    constructor() {

    }

    public init(): void {
        let trafficLightData: ITrafficLightData = this.buildTrafficLightEventData();
        this._eventDispatcher.dispatchEvent(new TrafficLightEvent(TrafficLightEvent.ACTION, trafficLightData));
    }

    protected buildTrafficLightEventData(): ITrafficLightData {
        return {
            id: AppConstants.TRAFFIC_LIGHT_1,
            state: TrafficLightState.Red,
        };
    }
}