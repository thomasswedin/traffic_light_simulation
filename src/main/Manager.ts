import { Application, Container, Sprite } from "pixi.js";
//import { GameConstants } from "../constants/GameConstants";
import { IScene } from "../common/IScene";

export class Manager {
    private constructor() { /*this class is purely static. No constructor to see here*/ }

    // Safely store variables for our game
    private static app: Application;
    private static currentScene: IScene;
    private static background: Sprite;
    private static backgroundContainer: Container;

    // Width and Height are read-only after creation (for now)
    private static _width: number;
    private static _height: number;
    private static _isMobile: boolean = false;

    // With getters but not setters, these variables become read-only
    public static get width(): number {
        return Manager._width;
    }
    
    public static get height(): number {
        return Manager._height;
    }

    public static get fps(): number {
        return Manager.app.ticker.FPS;
    }

    public static get isMobile(): boolean {
        return Manager._isMobile;
    }

    // Use this function ONCE to start the entire machinery
    public static initialize(width: number, height: number, background: number): void {

        // store our width and height
        Manager._width = width;
        Manager._height = height;

        Manager.app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: background,
            width: window.innerWidth,
            height: window.innerHeight,
            antialias: true
        });
        
        this._isMobile = Manager.app.renderer.plugins.interaction.supportsTouchEvents;
        Manager.backgroundContainer = new Container();
        Manager.app.stage.addChild(Manager.backgroundContainer);
        Manager.app.ticker.add(Manager.update);

        // listen for the browser telling us that the screen size changed
        window.addEventListener("resize", Manager.resize);

        // call it manually once so we are sure we are the correct size after starting
        Manager.resize();
    }

    // Call this function when you want to go to a new scene
    public static changeScene(newScene: IScene): void {
        // Remove and destroy old scene... if we had one..
        if (Manager.currentScene) {
            Manager.app.stage.removeChild(Manager.currentScene);
            Manager.currentScene.destroy();
        }

        // Add the new one
        Manager.currentScene = newScene;
        Manager.app.stage.addChild(Manager.currentScene);
        
    }

    public static changeBackground(newBackground: Sprite): void {
        // Remove and destroy old scene... if we had one..
        if (Manager.backgroundContainer.children.length) {
            Manager.backgroundContainer.removeChildren();
            Manager.background.destroy();
        }

        // Add the new one
        Manager.background = newBackground;
        Manager.backgroundContainer.addChild(Manager.background);
    }

    public static resize(): void {
        // Update the canvas size based on the new orientation
        Manager.app.renderer.resize(window.innerWidth, window.innerHeight);
        Manager.backgroundContainer.width = window.innerWidth;
        Manager.backgroundContainer.height = window.innerHeight;
        if (Manager.currentScene){
            Manager.currentScene.resize(window.innerWidth, window.innerHeight);
        }
    }

    // This update will be called by a pixi ticker and tell the scene that a tick happened
    private static update(framesPassed: number): void {
        // Let the current scene know that we updated it...
        // Just for funzies, sanity check that it exists first.
        if (Manager.currentScene) {
            Manager.currentScene.update(framesPassed);
        }
        // as I said before, I HATE the "frame passed" approach. I would rather use `Manager.app.ticker.deltaMS`
    }

    private isMobile(): boolean {
        const isAndroid = /Android/i.test(navigator.userAgent);
        const isiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
        const isWindowsMobile = /IEMobile/i.test(navigator.userAgent);
        const isBlackBerry = /BlackBerry/i.test(navigator.userAgent);
        const isOperaMini = /Opera Mini/i.test(navigator.userAgent);
      
        return isAndroid || isiOS || isWindowsMobile || isBlackBerry || isOperaMini;
      }
}