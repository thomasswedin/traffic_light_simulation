import { Application, settings } from 'pixi.js';
import { Manager } from './Manager';
import { Preloader } from "./Preloader";

export class GameMain
{
    protected app:Application;

    public static Start(): void
    {
        console.log("GameMain.Start()");
        let inWidth: number = 0;
        let inHeight: number = 0;

        if (typeof window !== "undefined") {
            inWidth = window.innerWidth;
            inHeight = window.innerHeight;
        }

        settings.ROUND_PIXELS = true;
        settings.RESOLUTION = 2;
        document.body.addEventListener("ontouchmove",(e) => { e.preventDefault(); return false; },{passive:false});
        Manager.initialize(inWidth, inHeight, 0x1099bb,);
        Manager.changeScene(new Preloader());
    }
}

// Debug Version
//GameMain.Start();

// Release Version
// window.onload = () => Program.Main();