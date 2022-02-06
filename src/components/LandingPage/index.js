import React, { useState, useEffect } from "react";
import "./LandingPage.scss";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { useHistory } from "react-router-dom";

const LandingPage = ({ auth, fetchUser, setUsername, setDifficulty }) => {
    const history = useHistory();
    const [level, setLevel] = useState(1);

    useEffect(() => {
        fetchUser();
    }, []);

    useEffect(() => {
        handleDifficultyChange();
    }, [level]);

    const handleDifficultyChange = (value) => {
        if (value) setLevel(value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        setUsername(auth.nick);
        setDifficulty(level);
        history.push("/game");
    };

    let content = <p>Loading...</p>;
    if (auth !== null && auth === false) {
        history.replace("/");
    } else {
        content = (
            <React.Fragment>
                <div className="LandingPage__form">
                    <form onSubmit={handleFormSubmit}>
                        <h1 className="LandingPage__h1">React Memory Game</h1>

                        <div className="LandingPage__form--submit">
                            <button type="submit">Start a game</button>
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
                <div className="LandingPage__board">
                    <p>Wanna know how others are doing?</p>
                    <span onClick={() => history.push("/summary")}>
                        See the scoreboard here!
                    </span>
                </div>
            </React.Fragment>
        );
    }

    return content;
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDifficulty: (difficulty) =>
            dispatch(actions.setDifficulty(difficulty)),
        setUsername: (username) => dispatch(actions.setUsername(username)),

        fetchUser: () => dispatch(actions.fetchUser()),
    };
};

function mapStateToProps(state) {
    return {
        auth: state.auth.auth,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
