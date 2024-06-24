import { inject, injectable, Container as System } from "inversify";
import type { IEventDispatcher } from "../../common/event/IEventDispatcher";

import { TYPES } from "../../Types";
import { TrafficLightModel } from "../model/TrafficLightModel";
import { TrafficLightView } from "../view/TrafficLightView";

@injectable()
export class TrafficLightController {
    @inject(TYPES.EventDispatcher) private _eventDispatcher: IEventDispatcher;
    protected _view:TrafficLightView;
    protected _model:TrafficLightModel;

    public setup(system:System): void {
        this._model = system.resolve<TrafficLightModel>(TrafficLightModel);
        this._view = system.resolve<TrafficLightView>(TrafficLightView);
        this._view.setup();
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