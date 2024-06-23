import "reflect-metadata"; 
import { expect } from 'chai';
import { it } from 'mocha';
import { GameModel } from '../src/game/model/GameModel';
import { GameConstants } from '../src/constants/GameConstants';


describe('GameModel', () => {
  let gameModel: GameModel;
  let xPosition: number;
  let yPosition: number;

  beforeEach(() => {
    gameModel = new GameModel();
    xPosition = 100;
    yPosition = 200;
    gameModel.setCurrentTetrominoXPos(xPosition);
    gameModel.setCurrentTetrominoYPos(yPosition);
  });

  it('should move tetromino left', () => {
    const expectedPoint = { x: xPosition - GameConstants.TETROMINO_BLOCK_SIZE, y: 200 };
    const actualPoint = gameModel.doMoveTetrominoCalculation(GameConstants.MOVE_LEFT);
    expect(actualPoint).to.deep.equal(expectedPoint);
  });

  it('should move tetromino right', () => {
    const expectedPoint = { x: xPosition + GameConstants.TETROMINO_BLOCK_SIZE, y: yPosition };
    const actualPoint = gameModel.doMoveTetrominoCalculation(GameConstants.MOVE_RIGHT);
    expect(actualPoint).to.deep.equal(expectedPoint);
  });

  it('should move tetromino down', () => {
    const expectedPoint = { x: xPosition, y: yPosition + GameConstants.TETROMINO_BLOCK_SIZE };
    const actualPoint = gameModel.doMoveTetrominoCalculation(GameConstants.MOVE_SOFT_DOWN);
    expect(actualPoint).to.deep.equal(expectedPoint);
  });

  it('should move tetromino down (hard drop)', () => {
    const expectedPoint = { x: xPosition, y: yPosition + GameConstants.TETROMINO_BLOCK_SIZE };
    const actualPoint = gameModel.doMoveTetrominoCalculation(GameConstants.MOVE_SOFT_DOWN);
    expect(actualPoint).to.deep.equal(expectedPoint);
  });
});