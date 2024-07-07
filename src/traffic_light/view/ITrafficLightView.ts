// Create interface ITrafficLightView
import {TrafficLightState} from "../controller/TrafficLightState.ts";
import {Container} from 'pixi.js';

export interface ITrafficLightView {
    setup(): void;

    switch(state: TrafficLightState, previousState: TrafficLightState): void;

    view(): Container;
}