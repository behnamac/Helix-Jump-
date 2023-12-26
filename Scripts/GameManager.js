export class GameManager {
    static GameState = {
        GamePlay: 0,
        LevelCompelet: 1,
        LevelFail: 2
    };

    static gameState = GameManager.GameState.GamePlay;

    static LevelFail = () => {
        console.log("You Lose");
        GameManager.gameState = GameManager.GameState.LevelFail;
    };

    static LevelCompelet = () => {
        console.log("You Win");
        GameManager.gameState = GameManager.GameState.LevelCompelet;
    };
}
