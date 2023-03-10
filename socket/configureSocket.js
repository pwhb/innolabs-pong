const config = {
  team1Name: "team 1",
  team2Name: "team 2",
  team1: 0,
  team2: 0,
  winner: "",
  serving: "",
  servesPerPerson: 5,
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

  if ((config.team1 + config.team2) % config.servesPerPerson === 0) {
    console.log(
      "config.servesPerPerson % (config.team1 + config.team2)",
      config.servesPerPerson % (config.team1 + config.team2),
      config
    );
    console.log("change", config.serving);
    switch (config.serving) {
      case "team1":
        config.serving = "team2";
        break;
      case "team2":
        config.serving = "team1";
        break;
    }
  }

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

    socket.on("update-serving", ({ team }) => {
      config.serving = team;
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

    socket.on("update-config", ({ team, name, servesPerPerson }) => {
      console.log({ team, name, servesPerPerson });
      if (name && team) {
        config[team] = name;
      }
      if (servesPerPerson) {
        config.servesPerPerson = servesPerPerson;
      }
      io.emit("update", config);
    });
  });
};
