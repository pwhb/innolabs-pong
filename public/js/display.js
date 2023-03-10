const socket = io();
let updating = false;
const timeoutInterval = 500;

const scoreSound = new Audio("https://www.soundjay.com/buttons/button-37a.mp3");

const resetSound = new Audio("https://www.soundjay.com/buttons/button-11.mp3");
// https://www.soundjay.com/buttons/button-17.mp3
const undoSound = new Audio("https://www.soundjay.com/buttons/button-17.mp3");

function updateScore(teamName, update) {
  if (!updating) {
    updating = true;
    navigator.vibrate(100);
    scoreSound.play();
    socket.emit("update", { teamName, update });
    setTimeout(() => {
      updating = false;
    }, timeoutInterval);
  }
}

function onClick(e) {
  const buttonId = e.target.id;

  switch (buttonId) {
    case "team1-score": {
      updateScore("team1", 1);
      break;
    }
    case "team2-score": {
      updateScore("team2", 1);
      break;
    }
  }
}

const team1Score = document.getElementById("team1-score");
const team2Score = document.getElementById("team2-score");

const team1NameEl = document.getElementById("team1");
const team2NameEl = document.getElementById("team2");

const team1Grid = document.getElementById("team1-container");
team1Grid.addEventListener("click", onClick);

const team2Grid = document.getElementById("team2-container");
team2Grid.addEventListener("click", onClick);

socket.on(
  "update",
  ({ team1, team2, scoredBy, team1Name, team2Name, serving, servesPerPerson }) => {
    // console.log({ team1, team2, winner, title });
    team1Score.innerHTML = team1;
    team2Score.innerHTML = team2;

    team1NameEl.innerHTML = team1Name.toUpperCase();
    team2NameEl.innerHTML = team2Name.toUpperCase();

    console.log("update", { team1, team2, scoredBy, team1Name, team2Name, serving, servesPerPerson });

    switch (serving) {
      case "team1":
        team1NameEl.className = "serving teamName";
        team2NameEl.className = "teamName";
        break;
      case "team2":
        team2NameEl.className = "serving teamName";
        team1NameEl.className = "teamName";
        break;
    }

    if (scoredBy === "team1") {
      team1Grid.className = "child scored-container";
      team2Grid.className = "child";
    } else if (scoredBy === "team2") {
      team2Grid.className = "child scored-container";
      team1Grid.className = "child";
    } else {
      team1Grid.className = "child";
      team2Grid.className = "child";
    }
  }
);
