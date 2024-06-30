import { Sprite, Texture } from 'pixi.js';

export class Button {
    private _sprite: Sprite;
    private _id: string;
    private _callback: (id:string) => void;

    constructor(texture: Texture,id:string, callback: (id: string) => void) {
        this._sprite = new Sprite(texture);
        this._sprite.eventMode = "static";
        this._sprite.on('pointerdown', this.onClick.bind(this));
        this._sprite.on('pointerover', this.onPointerOver.bind(this));
        this._sprite.on('pointerout', this.onPointerOut.bind(this));

        this._callback = callback;
        this._id = id;
    }

    public get view(): Sprite {
        return this._sprite;
    }

    private onClick() {
        if (this._callback) {
            this._callback(this._id);
        }
    }

    private onPointerOver() {
        // Apply visual changes when the button is hovered over
        this._sprite.alpha = 0.8;
        this._sprite.cursor = 'pointer';
    }

    private onPointerOut() {
        // Revert visual changes when the button is no longer hovered over
        this._sprite.alpha = 1;
        this._sprite.cursor = 'default';
    }
}