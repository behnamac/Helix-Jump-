//import { MyLevelComplete } from "/UIManager.js";

export class GameManager {
  static GameState = {
    GamePlay: 0,
    LevelCompelet: 1,
    LevelFail: 2,
  };

  static gameState = GameManager.GameState.GamePlay;

  static LevelFail = () => {
    console.log("You Lose");
    GameManager.gameState = GameManager.GameState.LevelFail;
    onlevelFailed();
  };

  static LevelCompelet = () => {
    console.log("You Win");
    GameManager.gameState = GameManager.GameState.LevelCompelet;
    onLevelComplete();
  };
}

var nextLevelButton;
var resetLevelButton;
var winText;
var loseText;

document.addEventListener("DOMContentLoaded", function () {
  //Set Win Button
  nextLevelButton = document.getElementById("Next_Click_Button");
  nextLevelButton.addEventListener("click", function () {
    onNextLevelButtonClick();
  });
  nextLevelButton.style.display = "none";

  //Set Lose Button
  resetLevelButton = document.getElementById("Reset_Click_Button");
  resetLevelButton.addEventListener("click", function () {
    onResetLevelButtonClick();
  });
  resetLevelButton.style.display = "none";

  //Set Win Text
  winText = document.getElementById("Win_Title");
  winText.style.display = "none";

  //Set Lose Text
  loseText = document.getElementById("Lose_Title");
  loseText.style.display = "none";
});

function onNextLevelButtonClick() {
  location.reload();
}
function onResetLevelButtonClick() {
  location.reload();
}

export const onLevelComplete = () => {
  nextLevelButton.style.display = "block";
  winText.style.display = "block";
};
export const onlevelFailed = () => {
  resetLevelButton.style.display = "block";
  loseText.style.display = "block";
};
