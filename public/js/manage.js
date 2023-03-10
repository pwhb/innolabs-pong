const socket = io();

const servingTeam = document.getElementById("serving-team");

const team1Option = document.getElementById("team1-option");
const team2Option = document.getElementById("team2-option");

const servingCountInput = document.getElementById("serving-count");
const servingCountValue = document.getElementById("serving-count-value");
const servingCountSubmit = document.getElementById("serving-count-submit");

const team1Name = document.getElementById("team1-input");
const team2Name = document.getElementById("team2-input");

const team1Submit = document.getElementById("team1-submit");
const team2Submit = document.getElementById("team2-submit");

const servingSelect = document.getElementById("serving-select");
const servingSubmit = document.getElementById("serving-submit");

const team1NameDisplay = document.getElementById("team1-name");
const team1Score = document.getElementById("team1-score");
const team2NameDisplay = document.getElementById("team2-name");
const team2Score = document.getElementById("team2-score");

const team1Up = document.getElementById("team1-up");
const team1Down = document.getElementById("team1-down");
const team2Up = document.getElementById("team2-up");
const team2Down = document.getElementById("team2-down");
const resetButton = document.getElementById("reset");

const scoreSound = new Audio("https://www.soundjay.com/buttons/button-37a.mp3");
const resetSound = new Audio("https://www.soundjay.com/buttons/button-11.mp3");

function updateScore(teamName, update) {
  navigator.vibrate(100);
  scoreSound.play();
  socket.emit("update", { teamName, update });
}

team1Up.addEventListener("click", () => {
  console.log("team1 up");
  updateScore("team1", 1);
});
team2Up.addEventListener("click", () => {
  updateScore("team2", 1);
});
team1Down.addEventListener("click", () => {
  updateScore("team1", -1);
});
team2Down.addEventListener("click", () => {
  updateScore("team2", -1);
});
resetButton.addEventListener("click", () => {
  resetSound.play();
  socket.emit("reset", {});
});

const updateName = (team, name) => {
  console.log("team", team, "name", name);
  socket.emit("update-config", { team, name });
};

team1Submit.addEventListener("click", () => {
  updateName("team1Name", team1Name.value);
});

team2Submit.addEventListener("click", () => {
  updateName("team2Name", team2Name.value);
});

servingCountSubmit.addEventListener("click", () => {
  console.log("serving-count-submit", { servesPerPerson: servingCountInput });
  socket.emit("update-config", {
    servesPerPerson: parseInt(servingCountInput.value),
  });
});

servingSubmit.addEventListener("click", () => {
  console.log(servingSelect.value);
  socket.emit("update-serving", { team: servingSelect.value });
});

socket.on(
  "update",
  ({ team1, team2, scoredBy, serving, team1Name, team2Name, servesPerPerson }) => {
    // console.log({ team1, team2, winner, title });
    servingCountValue.innerHTML = servesPerPerson
    servingSubmit.value = serving;
    switch (serving) {
      case "team1":
        servingTeam.innerHTML = team1Name;
        break;
      case "team2":
        servingTeam.innerHTML = team2Name;
        break;
    }
    servingTeam.innerHTML;

    team1Score.innerHTML = team1;
    team2Score.innerHTML = team2;

    team1Option.innerHTML = team1Name;
    team2Option.innerHTML = team2Name;

    team1NameDisplay.innerHTML = team1Name;
    team2NameDisplay.innerHTML = team2Name;
  }
);
