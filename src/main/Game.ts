import { Container as System } from "inversify";
import {Assets, Container, Sprite } from 'pixi.js';
import "reflect-metadata";
import { TYPES } from "../Types";
import { EventDispatcher, IEventDispatcher } from "../common/event/EventDispatcher";
import { GameController } from "../game/controller/GameController";
import { GameView } from "../game/view/GameView";
import { MenuController } from "../menu/controller/MenuController";
import { MenuView } from "../menu/view/MenuView";
import { NextTetrominosController } from "../nextTetrominos/controller/NextTetrominosController";
import { NextTetrominosView } from "../nextTetrominos/view/NextTetrominosView";
import { HoldTetrominosController } from "../holdTetrominos/controller/HoldTetrominosController";
import { HoldTetrominosView } from "../holdTetrominos/view/HoldTetrominosView";
import { GameInformationController } from "../gameInfomation/controller/GameInformationController";
import { GameInformationView } from "../gameInfomation/view/GameInformationView";
import { LevelViewController } from "../levelView/controller/LevelViewController";
import { LevelView } from "../levelView/view/LevelView";
import { LinesViewController } from "../linesView/controller/LinesViewController";
import { LinesView } from "../linesView/view/LinesView";
import { ScoreController } from "../score/controller/ScoreController";
import { ScoreView } from "../score/view/ScoreView";
import { TetrominoController } from "../tetromino/controller/TetrominoController";
import { IScene } from "../common/IScene";
import { TimerController } from "../timer/controller/TimerController";
import { Manager } from "./Manager";
import { Helper } from "../common/utils/Helper";
//import { GameConstants } from "../constants/GameConstants";

export class Game extends Container implements IScene {

    protected _tetrominoController: TetrominoController;
    protected _nextTetrominosController:NextTetrominosController;
    protected _nextTetrominosView: NextTetrominosView;
    protected _holdTetrominosController:HoldTetrominosController;
    protected _holdTetrominosView: HoldTetrominosView;
    protected _gameInformationController:GameInformationController;
    protected _gameInformationView: GameInformationView;
    protected _levelViewController:LevelViewController;
    protected _levelView: LevelView;
    protected _linesViewController:LinesViewController;
    protected _linesView: LinesView;
    protected _gameView: GameView;
    protected _gameController:GameController;
    protected _scoreController:ScoreController;
    protected _menuController:MenuController;
    protected _timerController:TimerController;
    protected _gameBackgroundView: Container;
    protected _scoreView:ScoreView;
    protected _menuView: MenuView;
    protected _timerView: Container;
    protected _stage: Container;
    private _velocity: number;

    constructor() {
        super();
        this.init();
    }

    public update(framesPassed: number): void {
        if(this._gameController){
            this._gameController.update(framesPassed)
        }
        if(this._timerController){
            this._timerController.update(framesPassed)
        }
        if(this._gameInformationController){
            this._gameInformationController.update(framesPassed)
        }
    }

    public resize(width: number, height: number): void {
        this.reScale(width, height);
    }

    protected changeBackground(newBackground: Sprite): void {
        newBackground.width = Manager.width;
        newBackground.height = Manager.height;
        newBackground.position.set(0, 0);
        Manager.changeBackground(newBackground);
    }
    

    protected init() {
        const system = new System();
        system.bind<IEventDispatcher>(TYPES.EventDispatcher).toConstantValue(EventDispatcher.getInstance());
        //this._eventDispatcher = system.get<EventDispatcher>(TYPES.EventDispatcher);

        this._nextTetrominosController = system.resolve<NextTetrominosController>(NextTetrominosController);
        this._tetrominoController = system.resolve<TetrominoController>(TetrominoController);
        this._gameController = system.resolve<GameController>(GameController);
        this._scoreController = system.resolve<ScoreController>(ScoreController);
        this._menuController = system.resolve<MenuController>(MenuController);
        this._timerController = system.resolve<TimerController>(TimerController);
        this._holdTetrominosController = system.resolve<HoldTetrominosController>(HoldTetrominosController);
        this._gameInformationController = system.resolve<GameInformationController>(GameInformationController);
        this._levelViewController = system.resolve<LevelViewController>(LevelViewController);
        this._linesViewController = system.resolve<LinesViewController>(LinesViewController);
        
        this._nextTetrominosController.setup(system);
        this._holdTetrominosController.setup(system);    
        this._gameInformationController.setup(system);    
        this._menuController.setup(system);
        this._gameController.setup(system);
        this._scoreController.setup(system);  
        this._timerController.setup(system);
        this._levelViewController.setup(system);  
        this._linesViewController.setup(system);
        this._tetrominoController.setup();

        this._gameView = this._gameController.view;
        this._scoreView = this._scoreController.view;
        this._nextTetrominosView = this._nextTetrominosController.view;
        this._menuView = this._menuController.view;
        this._timerView = this._timerController.view;
        this._holdTetrominosView = this._holdTetrominosController.view;
        this._gameInformationView = this._gameInformationController.view;
        this._levelView = this._levelViewController.view;
        this._linesView = this._linesViewController.view;

        this._gameBackgroundView = new Container();
        this.addChild(this._gameBackgroundView);
        this.addChild(this._gameView.view);
        this.addChild(this._nextTetrominosView.view);
        this.addChild(this._scoreView.view);
        this.addChild(this._menuView.view);
        this.addChild(this._timerView);
        this.addChild(this._holdTetrominosView.view);
        this.addChild(this._gameInformationView.view);
        this.addChild(this._levelView.view);
        this.addChild(this._linesView.view);
        this._velocity = 5;
        window.addEventListener("orientationchange", this.orientationChange.bind(this));
        this.setupBackground(1);
        
        this.orientationChange();
        this.reScale(Manager.width, Manager.height);
    }

    private orientationChange(): void {
        if (Helper.isOrientationPortrait()) {
            this.positionElementsForPortraiteMode();
            this._nextTetrominosController.positionElementsForPortraiteMode();
         } else {
            this.positionElementsForLandscapeMode();
            this._nextTetrominosController.positionElementsForLandscapeMode();
         }
    }  

    private setupBackground(level:number): void {
        const sheet = Assets.get('backgroundJSON');
        const background = Sprite.from(sheet.textures["level" +  level + ".png"]);
        this.changeBackground(background);
    }


    private positionElementsForLandscapeMode(): void {
        console.log("LANDSCAPE_MODE");

        const xPos: number = 0;
        const yPos: number = 0;
    
        this._nextTetrominosView.view.position.set(xPos, 40);
        this._holdTetrominosView.view.position.set(this._nextTetrominosView.view.x + this._nextTetrominosView.view.width - this._holdTetrominosView.view.width, this._nextTetrominosView.view.y + this._nextTetrominosView.view.height + 20);

        this._gameView.view.position.set(this._nextTetrominosView.view.x + this._nextTetrominosView.view.width + 40 , -40);

        const rightHandSideXPos: number = this._gameView.view.x + this._gameView.view.width + 40;
        
        this._menuView.view.position.set(rightHandSideXPos, 400);
        
        this._gameInformationView.view.position.set(this._gameView.view.x, yPos);

        //const xPosScoreView: number = this._gameView.view.x + this._gameView.view.width /2 - this._scoreView.view.width / 2;
        
        this._scoreView.view.position.set(rightHandSideXPos, 40);
        this._linesView.view.position.set(rightHandSideXPos, this._scoreView.view.y + this._scoreView.view.height + 10);
        this._levelView.view.position.set(this._linesView.view.x + this._linesView.view.width + 10, this._scoreView.view.y + this._scoreView.view.height + 10);
        

        const xPosTimerView: number = this._gameView.view.x + this._gameView.view.width /2 - this._timerView.width / 2;
        this._timerView.position.set(xPosTimerView, -30);
    }

    private positionElementsForPortraiteMode(): void {
        console.log("PORTRAITE_MODE");

        const xPos: number = 30;
        const yPos: number = 30;

        this._gameView.view.position.set(xPos, 50);

        const yPosNextTetrominosView: number = this._gameView.view.y + this._gameView.view.height + 20;
        
        this._gameInformationView.view.position.set(40, 80);
        
        this._scoreView.view.position.set(xPos, yPos);
        this._levelView.view.position.set(this._scoreView.view.x + this._scoreView.view.width + 20, yPos);
        this._linesView.view.position.set(this._levelView.view.x + this._levelView.view.width + 20, yPos);

        const xPosTimerView: number = this._gameView.view.x + this._gameView.view.width /2 - this._timerView.width / 2;
        this._timerView.position.set(xPosTimerView, 50);

        this._nextTetrominosView.view.position.set(xPos, yPosNextTetrominosView);
        this._holdTetrominosView.view.position.set(this._nextTetrominosView.view.x + this._nextTetrominosView.view.width + 20, yPosNextTetrominosView);
        
        this._menuView.view.position.set(xPos, yPosNextTetrominosView + this._nextTetrominosView.view.height + 10);
    }

    private reScale(width: number, height: number): void {

        this.x = 0;
        this.y = 0;

        this.scale.x = 1;
        this.scale.y = 1;
        
        const deltaSpace: number = 30;
        const gameContainerWidth = Math.floor(Helper.calculateContentWidth(this)) + deltaSpace;
        const gameContainerHeight = Math.floor(Helper.calculateContentHeight(this)) + deltaSpace;

        //Round gameContainerWidth to integer

        //Scale the game to the window but keep the aspect ratio
        const scale = Math.min(width / gameContainerWidth, height / gameContainerHeight);
        this.scale.x = scale;
        this.scale.y = scale;

        if (Helper.isOrientationPortrait()) {
            this.y = (height - (this.height)) * 0.5;
        } else {
            this.x = (width - (this.width)) * 0.5;
        }
    }
}
