import {ITrafficLightView} from "../view/ITrafficLightView.ts";

export interface ITrafficLightController {
    setup(): void;

    view(): ITrafficLightView;

    update(framesPassed: number): void;
}