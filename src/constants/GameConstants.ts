export class GameConstants {

    public static MOVE_LEFT: string = "MOVE_LEFT";
    public static MOVE_RIGHT: string = "MOVE_RIGHT";
    public static MOVE_SOFT_DOWN: string = "MOVE_SOFT_DOWN";
    public static HARD_DROP: string = "HARD_DROP";
    public static ROTATE_LEFT: string = "ROTATE_LEFT";
    public static ROTATE_RIGHT: string = "ROTATE_RIGHT";

    public static PORTRAIT_MODE: string = "PORTRAIT_MODE";
    public static LANDSCAPE_MODE: string = "LANDSCAPE_MODE";
    
    public static readonly NEXT_TETROMINO_VIEW_WIDTH: number = 360;
    public static readonly NEXT_TETROMINO_VIEW_HIGHT: number = 100;

    public static readonly HOLD_TETROMINO_VIEW_WIDTH: number = 100;
    public static readonly HOLD_TETROMINO_VIEW_HIGHT: number = 180;

    public static readonly VIEW_COLUMN_AMOUNT: number = 10;
    public static readonly VIEW_ROW_AMOUNT: number = 17;
    public static readonly MASKED_ROWS: number = 2;

    public static readonly COUNT_DOWN_DURATION: number = .5;

    public static readonly LEVEL_THRESHOLD:number = 10;
    
    public static readonly TETROMINO_BLOCK_SIZE: number = 40;
    public static readonly NEXT_TETROMINOS_AMOUNT: number = 4;
    public static readonly TETROMINOS = [
        {
            name: 'L',
            color: {id: 2, code:"0x84e3c8"} ,//Orange
            schema: [
                [1, 1, 1],
                [1, 0, 0]
            ]
        }, {
            name: 'J',
            color: {id:3, code:"0xa8e6cf"} ,//Red
            schema: [
                [1, 1, 1],
                [0, 0, 1]
            ]
        }, {
            name: 'O',
            color: {id:4, code:"0xdcedc1"} ,//Yellow
            schema: [
                [1, 1],
                [1, 1]
            ]
        }, {
            name: 'I',
            color: {id:5, code:"0xffd3b6"} ,//Blue
            schema: [
                [1, 1, 1, 1]
            ]
        }, {
            name: 'Z',
            color: {id: 6, code:"0xffaaa5"} ,//Purple
            schema: [
                [0, 1, 1],
                [1, 1, 0]
            ]
        }, {
            name: 'S',
            color: {id: 8, code:"0xff8b94"} ,//Green
            schema: [
                [1, 1, 0],
                [0, 1, 1]
            ]
        }, {
            name: 'T',
            color: {id: 7, code:"0xff7480"} ,//Dark blue
            schema: [
                [0, 1, 0],
                [1, 1, 1]
            ]
        }
    ];
    
    public static readonly SCORES = [
        {
            id: 1,
            name: 'single',
            score: 40,
            lines: 1
        },
        {
            id: 2,
            name: 'double',
            score: 100,
            lines: 2
        },
        {
            id: 3,
            name: 'triple',
            score: 300,
            lines: 3
        },{
            id: 4,
            name: 'tetris',
            score: 1200,
            lines: 4
        }
    ];
    public static readonly VIEW_WIDTH: number = GameConstants.VIEW_COLUMN_AMOUNT * GameConstants.TETROMINO_BLOCK_SIZE;
    public static readonly VIEW_HIGHT: number = GameConstants.VIEW_ROW_AMOUNT * GameConstants.TETROMINO_BLOCK_SIZE;
    public static readonly HIDDEN_ROWS_HEIGHT: number = GameConstants.TETROMINO_BLOCK_SIZE * GameConstants.MASKED_ROWS;
}