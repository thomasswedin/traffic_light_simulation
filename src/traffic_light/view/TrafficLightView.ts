import { inject, injectable } from "inversify";
import { Assets, Container, Graphics, Sprite } from 'pixi.js';
import { TYPES } from "../../Types";
import type { IEventDispatcher } from "../../common/event/IEventDispatcher";

@injectable()
export class TrafficLightView {
    @inject(TYPES.EventDispatcher) private _eventDispatcher: IEventDispatcher;

    protected _view: Container;
    private _background: Graphics;

    public get background(): Graphics {
        return this._background;
    }

    public set background(value: Graphics) {
        this._background = value;
    }

    public setup(): void {
        this._view = new Container();
        this._view.position.set(0, 0);
        this.createBackground();
    }

    protected createBackground():void {
        const sheet = Assets.get('traffic-light');
        const background = Sprite.from(sheet.textures["background.png"]);
        this._view.addChild(background);
    }

    public restart(): void {
        //TODO
    }

    public get view():Container {
        return this._view;
    }
}