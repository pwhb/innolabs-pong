const config = {
  team1Name: "team 1",
  team2Name: "team 2",
  team1: 0,
  team2: 0,
  winner: "",
  scoredBy: "",
};

const prevState = {
  team1: 0,
  team2: 0,
  scoredBy: "",
};

const updateScore = (teamName, update) => {
  prevState.team1 = config.team1;
  prevState.team2 = config.team2;
  prevState.scoredBy = config.scoredBy;
  config[teamName] += update;
  config.scoredBy = teamName;

  // console.log({ config, prevState });
};

const undoScore = () => {
  config.team1 = prevState.team1;
  config.team2 = prevState.team2;
  config.scoredBy = prevState.scoredBy;
  config.winner = "";
};

const resetScore = () => {
  config.team1 = 0;
  config.team2 = 0;
  config.scoredBy = "";
  config.winner = "";
};

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.emit("update", config);

    socket.on("update", ({ teamName, update }) => {
      updateScore(teamName, update);
      io.emit("update", config);
    });

    socket.on("undo", () => {
      undoScore();
      io.emit("update", config);
    });

    socket.on("reset", () => {
      resetScore();
      io.emit("update", config);
    });

    socket.on("update-config", ({ team, name }) => {
      config[team] = name;
      io.emit("update", config);
    });
  });
};
