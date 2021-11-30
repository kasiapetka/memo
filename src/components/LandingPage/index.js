import React, { useState, useEffect } from "react";
import "./LandingPage.scss";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { useHistory } from "react-router-dom";

const LandingPage = ({ setUsername, setDifficulty }) => {
  const history = useHistory();
  const ERROR_NICK_TOO_SHORT = "Your nickname is too short";
  const ERROR_NICK_TOO_LONG = "Your nickname is too long";
  const NICK_MIN_LENGTH = 3;
  const NICK_MAX_LENGTH = 10;

  const [name, setName] = useState("");
  const [level, setLevel] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    validateName();
  }, [name]);

  useEffect(() => {
    handleDifficultyChange();
  }, [level]);

  const handleDifficultyChange = (value) => {
    if (value) setLevel(value);
  };

  const validateName = () => {
    if (!name) return;
    if (name.length < NICK_MIN_LENGTH) {
      setError(ERROR_NICK_TOO_SHORT);
      return;
    }
    if (name.length > NICK_MAX_LENGTH) {
      setError(ERROR_NICK_TOO_LONG);
      return;
    }
    setError("");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const isNameValid = () => {
    return name.length >= NICK_MIN_LENGTH && name.length <= NICK_MAX_LENGTH;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setUsername(name);
    setDifficulty(level);
    history.push("/game");
  };

  return (
    <div className="LandingPage__form">
      <form onSubmit={handleFormSubmit}>
        <h1 className="LandingPage__h1">React Memory Game</h1>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
          required
          pattern="\S+"
          title="This field is required. No whitespaces allowed."
        />
        {error ? <p>{error}</p> : null}
        <div className="LandingPage__form--submit">
          <button type="submit" disabled={!isNameValid()}>
            Start a game
          </button>
        </div>
      </form>
      <div className="LandingPage__difficulty">
        <h5>Difficulty</h5>
        <button
          className={`LandingPage__difficulty--newbie ${
            level === 1 ? "active" : null
          }`}
          onClick={() => handleDifficultyChange(1)}
        >
          Newbie
        </button>
        <button
          className={`LandingPage__difficulty--medium ${
            level === 2 ? "active" : null
          }`}
          onClick={() => handleDifficultyChange(2)}
        >
          Medium
        </button>
        <button
          className={`LandingPage__difficulty--master ${
            level === 3 ? "active" : null
          }`}
          onClick={() => handleDifficultyChange(3)}
        >
          Master
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (username) => dispatch(actions.setUsername(username)),
    setDifficulty: (difficulty) => dispatch(actions.setDifficulty(difficulty)),
  };
};

export default connect(null, mapDispatchToProps)(LandingPage);
