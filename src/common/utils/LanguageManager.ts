import { Assets } from 'pixi.js';

//import { Container as System } from "inversify";

//Create a class called LanguageManager that will be used to manage the language of the game.
//The class will fetch the language from query string and set the language to the game.
//lang=en is the default language if no language is specified in the query string.
//Depending on the language, the class will load the appropriate language file and set the language to the game.
//The class will also have a method to get the text from the language file.
//Langauge json files are located in src/common/lang folder.

export class LanguageManager {
    static _langJSON: any;
    private constructor() { /*this class is purely static. No constructor to see here*/ }

    public static language: string = "en";

    public static initialize(): void {
        const urlParams = new URLSearchParams(window.location.search);
        const lang = urlParams.get('lang');
        LanguageManager.language = lang !== null ? lang : "en";
    }
    public static getText(phraseID: string): string {
        const langJSON  = Assets.get(LanguageManager.language + '-lang');
        const phrases = langJSON["TETRIS WORDS"];
        let phrase: string = "";

        //langJSON is a json object
        /*TETRIS WORDS[{key: 'HOLD', phrase: 'HOLD'},{key: 'NEXT', phrase: 'NEXT'}, {key: 'PLAY', phrase: 'PLAY'}]*/
        //Loop through the json object and find the key that matches the key passed in.
        //Return the phrase for that key.
        phrases.forEach((item: { key: string; phrase: string; }) => {
            if (item.key === phraseID) {
              phrase = item.phrase;
            }
        });

        //Return the phrase for that key.
        return phrase;
        
    }

    /*public static getText(key: string): string {
        const lang = require(`./lang/${LanguageManager.language}.json`);
        return lang[key];
    }*/

    public static getLanguage(): string {
        return LanguageManager.language;
    }
}