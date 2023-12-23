export const GameState = 
{
    GamePlay: 0,
    LevelCompelet: 1,
    LevelFail: 2
}

export var gameState = GameState.GamePlay;

export const LevelFail = () =>
{
    console.log("You Lose");
    gameState = GameState.LevelFail;
}
export const LevelCompelet = () =>
{
    console.log("You Win");
    gameState = GameState.LevelCompelet;
}