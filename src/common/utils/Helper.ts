import { GameConstants } from "../../constants/GameConstants";
import {Container, Point } from 'pixi.js';

export class Helper {
    
    //Create a function that will find the score based on the number of lines cleared in GameConstants.SCORES.
    //Function will take in the number of lines cleared and return the score.
    //A loop is needed to iterate through the array of objects in GameConstants.SCORES
    public static calculateScore(lineClear: number): number {
        let score: number = 0;
        for (let i = 0; i < GameConstants.SCORES.length; i++) {
            if (GameConstants.SCORES[i].lines === lineClear) {
                score = GameConstants.SCORES[i].score;
            }
        }
        return score;
    }

    public static calculateContentSize(container: Container): Point {
        return new Point(this.calculateContentWidth(container), this.calculateContentHeight(container));
    }

    public static calculateContentWidth(container: Container) {
        let maxX = 0;

        console.log("Num. of children: " + container.children.length);

        container.children.forEach(child => {
          const childBounds = child.getBounds();
          const childMaxX = childBounds.x + childBounds.width;
          if (childMaxX > maxX) {
            maxX = childMaxX;
          }
        });
      
        return maxX;
    }

    public static calculateContentHeight(container: Container) {
        let maxX = 0;
      
        container.children.forEach(child => {
          const childBounds = child.getBounds();
          //const parent = child.parent;
          const childMaxX = childBounds.y + childBounds.height;
          if (childMaxX > maxX) {
            maxX = childMaxX;
          }
        });
      
        return maxX;
    }

    public static isOrientationPortrait(): boolean {
      /*if (window.matchMedia("(orientation: portrait)").matches) {
        return true;
      }

      return false;*/

      const orientation = screen.orientation.type;
        if (orientation === "portrait-primary" || orientation === "portrait-secondary") {
          // Device is in portrait orientation
          return true;
        } else if (orientation === "landscape-primary" || orientation === "landscape-secondary") {
          // Device is in landscape orientation
          return false;
        }
    }

}