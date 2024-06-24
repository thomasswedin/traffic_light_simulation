import { Container, Graphics, Assets } from "pixi.js";
import { manifest } from "../assets/src/assets.ts";
import { Manager } from "./Manager";
import { IScene } from "../common/IScene";
import { Game } from "./Game";

export class Preloader extends Container implements IScene {

    // for making our loader graphics...
    private loaderBar: Container;
    private loaderBarBoder: Graphics;
    private loaderBarFill: Graphics;
    constructor() {
        super();

        const loaderBarWidth = Manager.width * 0.8;

        this.loaderBarFill = new Graphics();
        this.loaderBarFill.beginFill(0x90D8EC, 1)
        this.loaderBarFill.drawRect(0, 0, loaderBarWidth, 50);
        this.loaderBarFill.endFill();
        this.loaderBarFill.scale.x = 0;

        this.loaderBarBoder = new Graphics();
        this.loaderBarBoder.lineStyle(6, 0x0, 1);
        this.loaderBarBoder.drawRect(0, 0, loaderBarWidth, 50);

        this.loaderBar = new Container();
        this.loaderBar.addChild(this.loaderBarFill);
        this.loaderBar.addChild(this.loaderBarBoder);
        this.loaderBar.position.x = (Manager.width - this.loaderBar.width) / 2;
        this.loaderBar.position.y = (Manager.height - this.loaderBar.height) / 2;
        this.addChild(this.loaderBar);

        this.initializeLoader().then(() => {
            this.gameLoaded();
        })
    }

    private async initializeLoader(): Promise<void>
    {
        await Assets.init({ manifest: manifest });
        const bundleIds =  manifest.bundles.map(bundle => bundle.name);
        await Assets.loadBundle(bundleIds, this.downloadProgress.bind(this));
    }

    private downloadProgress(progressRatio: number): void {
        this.loaderBarFill.scale.x = progressRatio;
    }

    private gameLoaded(): void {
        // Change scene to the game scene!
        Manager.changeScene(new Game());
    }

    public update(framesPassed: number = 0): void {
        // To be a scene we must have the update method even if we don't use it.
        if(framesPassed < 0){
            console.log("framesPassed: " +  framesPassed);
        }
    }
    
    public resize(width: number, height: number): void {
        console.log("Preloader resize width: " + width + " height: " + height);
    }
}