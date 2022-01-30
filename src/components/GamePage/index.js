import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Timer from "./Timer";
import * as actions from "../../store/actions";
import Cards from "./Cards";
import "./GamePage.scss";
import { useHistory } from "react-router-dom";


const GamePage = ({ attempts, setGameStatus, resetGame,username }) => {
  const [startTimer, setStartTimer] = useState(false);
  const reference = useRef();
  const history = useHistory();

  useEffect(() => {
    if (!username) {
      history.push("/home");
    }
  }, []);
  
  useEffect(() => {
    return resetGame();
  }, []);

  useEffect(() => {
    reference.current.addEventListener("mousedown", () => {
      setStartTimer(true);
    });
    setGameStatus(1);
  }, []);

  return (
    <div ref={reference} className="Game">
      <div className="Game__status">
        <span>
          <h5>Attempts: {attempts}</h5>
        </span>
        <span>
          <Timer isStarted={startTimer} />
        </span>
      </div>
      <Cards />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    attempts: state.game.attempts,
    username: state.game.username
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setGameStatus: (status) => dispatch(actions.setGameStatus(status)),
    resetGame: () => dispatch(actions.resetGame()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
