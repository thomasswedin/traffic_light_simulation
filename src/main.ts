import { GameMain } from './main/GameMain.ts';

export async function launchClient(): Promise<void> {
    GameMain.Start();
}
