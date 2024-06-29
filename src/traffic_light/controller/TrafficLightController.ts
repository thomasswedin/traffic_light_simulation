import { inject, injectable, Container as System } from "inversify";
import type { IEventDispatcher } from "../../common/event/IEventDispatcher";

import { TYPES } from "../../Types";
import { TrafficLightModel } from "../model/TrafficLightModel";
import { TrafficLightView } from "../view/TrafficLightView";
import { TrafficLightStateMachine } from "./TrafficLightStateMachine";

@injectable()
export class TrafficLightController {
    @inject(TYPES.EventDispatcher) private _eventDispatcher: IEventDispatcher;
    protected _view:TrafficLightView;
    protected _model:TrafficLightModel;
    protected _stateMachine:TrafficLightStateMachine;

    public setup(system:System): void {
        this._model = system.resolve<TrafficLightModel>(TrafficLightModel);
        this._view = system.resolve<TrafficLightView>(TrafficLightView);
        this._stateMachine = system.resolve<TrafficLightStateMachine>(TrafficLightStateMachine);
        this._view.setup();
        this._stateMachine.change();
        this._view.switch(this._stateMachine.state, this._stateMachine.previousState);
        this.addEventlisteners();
    }

    get view():TrafficLightView {
        return this._view;
    }

    protected addEventlisteners(): void {
        //this._eventDispatcher.addEventListener(ButtonEvent.RESTART, this.restart, this);
        //this._eventDispatcher.addEventListener(LevelEvent.LEVEL_UP, this.levelUp, this);
    }

    protected restart(): void {
        //this._view.restart();
        console.log("LevelViewController : restart");
    }
}