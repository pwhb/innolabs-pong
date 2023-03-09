const socket = io();

const team1Name = document.getElementById("team1-input");
const team2Name = document.getElementById("team2-input");

const team1Submit = document.getElementById("team1-submit");
const team2Submit = document.getElementById("team2-submit");

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
