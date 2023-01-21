const score = {
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
    prevState.team1 = score.team1;
    prevState.team2 = score.team2;
    prevState.scoredBy = score.scoredBy;
    score[teamName] += update;
    score.scoredBy = teamName;

    // console.log({ score, prevState });
};

const undoScore = () => {
    score.team1 = prevState.team1;
    score.team2 = prevState.team2;
    score.scoredBy = prevState.scoredBy;
    score.winner = "";
};

const resetScore = () => {
    score.team1 = 0;
    score.team2 = 0;
    score.scoredBy = "";
    score.winner = "";
};

module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.emit("update", score);

        socket.on("update", ({ teamName, update }) => {
            updateScore(teamName, update);
            io.emit("update", score);
        });

        socket.on("undo", () => {
            undoScore();
            io.emit("update", score);
        });

        socket.on("reset", () => {
            resetScore();
            io.emit("update", score);
        });
    });
};
