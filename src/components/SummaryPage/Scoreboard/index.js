import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../../../store/actions";
import celebrateImage from "../../../images/1F973_color.png";
import "./Scoreboard.scss";

const Scoreboard = ({
    email,
    difficulty,
    attempts,
    score,
    time,
    addToScoreboard,
    scoreboard,
    fetchScoreboard,
    resetGame,
}) => {
    const history = useHistory();

    useEffect(() => {
        handleResults();
    }, []);

    useEffect(() => {
        fetchScoreboard();
    }, []);

    useEffect(() => {
        console.log(scoreboard);
    }, []);

    const handleResults = () => {
        const result = {
            email,
            difficulty,
            attempts,
            time,
            score,
        };
        if (score) addToScoreboard(result);
    };

    const renderList = () => {
        return scoreboard.map((result, index) => {
            return (
                <React.Fragment key={index}>
                    <span>{index + 1}</span>
                    <span>{result.email}</span>
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
        history.push("/home");
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
                <span>Email</span>
                <span>Difficulty</span>
                <span>Score</span>
                {scoreboard ? renderList() : null}
            </div>
            <div className="Scoreboard__footer">
                <button onClick={handlePlayAgain}>Play memory!</button>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    email: state.game.email,
    difficulty: state.game.difficulty,
    attempts: state.game.attempts,
    time: state.game.time,
    score: state.game.score,
    scoreboard: state.scoreboard,
});
const mapDispatchToProps = (dispatch) => {
    return {
        addToScoreboard: (score) =>
            dispatch(actions.addScoreToScoreboard(score)),
        resetGame: () => dispatch(actions.resetGame()),
        fetchScoreboard: () => dispatch(actions.fetchScoreboard()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);
