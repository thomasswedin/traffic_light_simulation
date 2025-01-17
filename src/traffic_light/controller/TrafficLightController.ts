import {inject, injectable, Container as System} from "inversify";
import type {IEventDispatcher} from "../../common/event/IEventDispatcher";
import {gsap} from "gsap";

import {TYPES} from "../../Types";
import {TrafficLightModel} from "../model/TrafficLightModel";
import {TrafficLightView} from "../view/TrafficLightView";
import {ITrafficLightController} from "./ITrafficLightController.ts";
import {TrafficLightState} from "./TrafficLightState.ts";
import {TrafficLightStateMachine} from "./TrafficLightStateMachine";

import {Assets, Container, Graphics} from 'pixi.js';
import {ButtonEvent} from "../../event/ButtonEvent";
import {Button} from "../view/Button";
import {ITrafficLightView} from "../view/ITrafficLightView";
import {TrafficLightEvent} from "../../event/TrafficLightEvent";

@injectable()
export class TrafficLightController implements ITrafficLightController {
    @inject(TYPES.EventDispatcher) private _eventDispatcher: IEventDispatcher;
    protected _view: ITrafficLightView;
    protected _model: TrafficLightModel;
    protected _stateMachine: TrafficLightStateMachine;
    protected _background: Graphics;
    protected _id: string;

    public setup(system: System, id: string): void {
        this._model = system.resolve<TrafficLightModel>(TrafficLightModel);
        this._view = system.resolve<TrafficLightView>(TrafficLightView);
        this._stateMachine = system.resolve<TrafficLightStateMachine>(TrafficLightStateMachine);
        this._id = id;
        this._view.setup();
        this._stateMachine.change();
        this._view.switch(this._stateMachine.state, this._stateMachine.previousState);
        this.addEventlisteners();
        this.createMenuBackground();
        this.addStateButton();
    }

    get view(): ITrafficLightView {
        return this._view;
    }

    public update(framesPassed?: number): void {
        if (this._stateMachine.state === TrafficLightState.Idle) {
            //this._view.idle();
        }
    }

    protected addEventlisteners(): void {
        this._eventDispatcher.addEventListener(TrafficLightEvent.ACTION, this.action, this);
    }

    protected action(event: TrafficLightEvent): void {
        //this._view.restart();
        console.log("TrafficLightController : action");

        if(event.data && event.data.id === this._id){
            this.stateAction(event.data.state);
        }
    }

    protected addStateButton(): void {
        const buttons = Assets.get('buttonsJSON');

        const nextState: string = "next_state.png";
        this.createButtons(buttons.textures[nextState], ButtonEvent.NEXT_STATE, 50);

        const goState: string = "go_state.png";
        this.createButtons(buttons.textures[goState], ButtonEvent.GO_STATE, 90);

        const stopState: string = "stop_state.png";
        this.createButtons(buttons.textures[stopState], ButtonEvent.STOP_STATE, 130);

        const yellowState: string = "yellow_state.png";
        this.createButtons(buttons.textures[yellowState], ButtonEvent.YELLOW_BLINK_STATE, 170);
    }

    protected createButtons(textureData: any, buttonID: string, yPos: number): void {
        const button: Button = new Button(textureData, buttonID, this.buttonClicked);
        button.view.position.set(425, yPos);
        this._view.view.addChild(button.view);
    }
    protected buttonClicked = (id: string) => {
        this.stateAction(id);
    }

    protected stateAction (id: string)  {
        console.log("Received ID: " + JSON.stringify(id));

        switch (id) {
            case ButtonEvent.NEXT_STATE:
                this.change();
                //this._eventDispatcher.dispatchEvent(new ButtonEvent(ButtonEvent.PAUSE));
                break;
            case ButtonEvent.GO_STATE:
            case TrafficLightState.Green:
                if (this._stateMachine.state === TrafficLightState.Red) {
                    this.change();
                    gsap.delayedCall(2, this.change.bind(this));
                } else if (this._stateMachine.state === TrafficLightState.Yellow || this._stateMachine.state === TrafficLightState.Idle) {
                    this._stateMachine.goToGreenFromYellowBlinkState();
                    this.change();
                }
                break;
            case ButtonEvent.STOP_STATE:
            case TrafficLightState.Red:
                if (this._stateMachine.state === TrafficLightState.Green) {
                    this.change();
                    gsap.delayedCall(2, this.change.bind(this));
                } else if (this._stateMachine.state === TrafficLightState.Yellow || this._stateMachine.state === TrafficLightState.Idle) {
                    this._stateMachine.goToRedFromYellowBlinkState();
                    this.change();
                }
                break;
            case ButtonEvent.YELLOW_BLINK_STATE:
            case TrafficLightState.Idle:
                this.changeToIdleState();
                break;
            default:
        }
    };

    protected change(): void {
        this._stateMachine.change();
        this._view.switch(this._stateMachine.state, this._stateMachine.previousState);
    }

    protected changeToIdleState(): void {
        this._stateMachine.goIdleState();
        this._view.switch(this._stateMachine.state, this._stateMachine.previousState);
    }

    protected createMenuBackground(): void {
        this._background = new Graphics();
        this._background.lineStyle(1, 0x000000);
        this._background.beginFill("0xFFFFFF", 0.5);
        this._background.drawRect(0, 0, 200, 280);
        this._background.endFill();
        this._background.position.set(400, 0);
        this._view.view.addChild(this._background);
    }
}