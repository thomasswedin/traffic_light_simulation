interface ResolverManifest {
    bundles: Array<{
        name: string;
        assets: Record<string, string>;
    }>;
}

export const manifest:ResolverManifest = {
    bundles: [
        {
            name : "background",
            assets:
            {
                "backgroundJSON" : "./src/assets/background.json"
            }
        },
        {
            name : "buttons",
            assets:
            {
                "buttonsJSON" : "./src/assets/buttons.json"
            }
        },
        {
            name : "fonts",
            assets:
            {
                "retroGamingFont" : "./src/assets/fonts/Retro Gaming.ttf"
            }
        },
        {
            name : "en-lang",
            assets:
            {
                "en-lang" : "./src/assets/lang/en.json"
            }
        },
        {
            name : "se-lang",
            assets:
            {
                "se-lang" : "./src/assets/lang/se.json"
            }
        }

    ]
}/*"backgroundPNG" : "./assets/background.png",*/
/*"buttonsPNG" : "./assets/buttons.png",*/

