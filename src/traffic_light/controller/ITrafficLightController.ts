import {Container as System} from "inversify/lib/container/container";
import {ITrafficLightView} from "../view/ITrafficLightView.ts";

export interface ITrafficLightController {
    setup(system: System): void;

    get view(): ITrafficLightView;

    update(framesPassed: number): void;
}