import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../store/actions";
import celebrateImage from "../../../images/1F973_color.png";
import "./Scoreboard.scss";

const Scoreboard = ({
  username,
  difficulty,
  attempts,
  score,
  time,
  addToScoreboard,
  scoreboard,
  resetGame,
}) => {
  const history = useHistory();
  const [bestScores, setBestScores] = useState([]);

  useEffect(() => {
    handleResults();
  }, []);

  useEffect(() => {
    setBestScores(scoreboard.slice(0, 5));
  }, [scoreboard]);

  const handleResults = () => {
    const result = {
      username,
      difficulty,
      attempts,
      time,
      score,
    };

    addToScoreboard(result);
  };

  const renderList = () => {
    return bestScores.map((result, index) => {
      return (
        <React.Fragment key={index}>
          <span>{index + 1}</span>
          <span>{result.username}</span>
          <span>
            {result.difficulty === 3
              ? "Master"
              : result.difficulty === 2
              ? "Medium"
              : "Newbie"}
          </span>
          <span>{result.score}</span>
        </React.Fragment>
      );
    });
  };

  const handlePlayAgain = () => {
    resetGame();
    history.push("/");
  };

  return (
    <div className="Scoreboard">
      <div className="Scoreboard__heading">
        <h1>You won!</h1>
        <img src={celebrateImage} alt="CelebrateImage" />
        <h4>Scoreboard</h4>
      </div>
      <div
        className="Scoreboard__body"
        style={{
          gridTemplate: `repeat(${scoreboard.length}, ${
            100 / scoreboard.length
          }%) / repeat(4, 25%)`,
        }}
      >
        <span>#</span>
        <span>Name</span>
        <span>Difficulty</span>
        <span>Score</span>
        {renderList()}
      </div>
      <div className="Scoreboard__footer">
        <button onClick={handlePlayAgain}>Play again!</button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.game.username,
  difficulty: state.game.difficulty,
  attempts: state.game.attempts,
  time: state.game.time,
  score: state.game.score,
  scoreboard: state.scoreboard,
});
const mapDispatchToProps = (dispatch) => {
  return {
    addToScoreboard: (score) => dispatch(actions.addScoreToScoreboard(score)),
    resetGame: () => dispatch(actions.resetGame()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);
