//import { OnLevelCompelet, OnLevelFail } from "./UIManager";

export class GameManager {
  static GameState = {
    GamePlay: 0,
    LevelCompelet: 1,
    LevelFail: 2,
  };

  static gameState = GameManager.GameState.GamePlay;

  static levelFail() {
    console.log("You Lose");
    GameManager.gameState = GameManager.GameState.LevelFail;
    OnLevelFail();
  }

  static levelComplete() {
    console.log("You Win");
    GameManager.gameState = GameManager.GameState.LevelCompelet;
    OnLevelCompelet();
  }
}

var nextLevelButton;
var resetLevelButton;
var winText;
var loseText;
var score = 0;

document.addEventListener("DOMContentLoaded", function () {
  initializeUI();
});

function initializeUI() {
  // Initialize buttons and text elements
  nextLevelButton = document.getElementById("Next_Click_Button");
  resetLevelButton = document.getElementById("Reset_Click_Button");
  winText = document.getElementById("Win_Title");
  loseText = document.getElementById("Lose_Title");
  scoreText = document.getElementById("Score_Text");

  // Set event listeners and initial styles
  setButtonListener(nextLevelButton, onNextLevelButtonClick);
  setButtonListener(resetLevelButton, onResetLevelButtonClick);
  hideElements(nextLevelButton, resetLevelButton, winText, loseText);

  // Initialize score text
  updateScoreDisplay();
}

function setButtonListener(button, onClickFunction) {
  button.addEventListener("click", onClickFunction);
  button.style.display = "none";
}

function hideElements(...elements) {
  elements.forEach((element) => (element.style.display = "none"));
}

function onNextLevelButtonClick() {
  location.reload();
}

function onResetLevelButtonClick() {
  location.reload();
}

export const OnLevelCompelet = () => {
  showElements(nextLevelButton, winText);
};

export const OnLevelFail = () => {
  showElements(resetLevelButton, loseText);
};

export const AddScore = () => {
  score++;
  updateScoreDisplay();
};

function updateScoreDisplay() {
  scoreText.textContent = `Score: ${score}`;
  styleScoreText();
}

function styleScoreText() {
  Object.assign(scoreText.style, {
    fontSize: "30px",
    position: "absolute",
    top: "10px",
    right: "10px",
  });
}

function showElements(...elements) {
  elements.forEach((element) => (element.style.display = "block"));
}
