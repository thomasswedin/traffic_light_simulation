import {injectable} from "inversify";
import {TrafficLightState} from "./TrafficLightState";

@injectable()
export class TrafficLightStateMachine {
    //Set up the state property
    private _currentState: TrafficLightState;
    private _previousState: TrafficLightState;

    //Set up the constructor
    constructor() {
        //Set the initial state to Red
        this._currentState = TrafficLightState.Idle;
        this._previousState = TrafficLightState.Idle;
    }

    public get state(): TrafficLightState {
        return this._currentState;
    }

    public get previousState(): TrafficLightState {
        return this._previousState;
    }

    public goToRedFromYellowBlinkState(): void {
        this._previousState = TrafficLightState.Green;
    }

    public goToGreenFromYellowBlinkState(): void {
        this._previousState = TrafficLightState.Red;
    }

    //Set up the change method
    public change() {
        console.log("Changing state from " + this._currentState);
        switch (this._currentState) {
            case TrafficLightState.Idle:
                this.setState(TrafficLightState.Red);
                break;
            case TrafficLightState.Red:
                this.setState(TrafficLightState.Yellow);
                break;
            case TrafficLightState.Yellow:
                if(this._previousState === TrafficLightState.Red) {
                    this.setState(TrafficLightState.Green);
                } else if (this._previousState === TrafficLightState.Green) {
                    this.setState(TrafficLightState.Red);
                }
                break;
            case TrafficLightState.Green:
                this.setState(TrafficLightState.Yellow);
                break;
            default:
                console.log("Invalid state");
                break;
        }
    }

    //Set up the setState method
    setState(state: TrafficLightState) {
        //Set the state to the new state
        this._previousState = this._currentState;
        this._currentState = state;
    }
}