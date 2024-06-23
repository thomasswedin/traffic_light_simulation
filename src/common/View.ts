import { IView } from './IView';
import {injectable } from "inversify";

@injectable()
export class View implements IView {
    
    public update(framesPassed: number): void {
        if(framesPassed < 0){
            console.log("framesPassed: " +  framesPassed);
        }
    }

    public positionElementsForPortraiteMode(): void {
        //To be implemented by the child class
    }

    public positionElementsForLandscapeMode(): void {
        //To be implemented by the child class
    }
}
