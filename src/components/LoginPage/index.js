import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import "./LoginPage.scss";

const LoginPage = () => {
    const MIN_LENGTH = 3;
    const MAX_LENGTH = 15;
    const [inputs, setInputs] = useState({ nick: "", email: "", password: "" });
    const [error, setError] = useState("");

    useEffect(() => {
        validateInputs();
    }, [inputs]);


    const validateInputs = () => {
        for (const [key, value] of Object.entries(inputs)) {
            if (!value) return;
            if (value.length < MIN_LENGTH) {
                setError(`Your ${key} is too short! Type at least ${MIN_LENGTH} characters`);
                return;
            }
            if (value.length > MAX_LENGTH) {
                setError(`Your ${key} is too long! Type maximum ${MAX_LENGTH} characters`);
                return;
            }
            setError("");
        }
    };

    const handleInputChange = (event) => {
        const key = event.target.name;
        const newInputs = { ...inputs };
        newInputs[key] = event.target.value;
        console.log(newInputs)

        setInputs(newInputs);
    }

    const renderInputs = () => {
        return Object.keys(inputs).map((key, index) => {
            return (
                <Fragment key={index}>
                    <label htmlFor={key} style={{ marginBottom: "5px" }}>{key.toUpperCase()}</label>
                    <input
                        name={key}
                        type={key === 'password' ? key : 'text'}
                        placeholder={"Enter your " + key}
                        value={inputs[key]}
                        onChange={handleInputChange}
                        required
                        pattern="\S+"
                        title="This field is required. No whitespaces allowed."
                    />
                </Fragment>

            )
        })
    }

    return (
        <div className="LoginPage__form">
            <form >
                <h1 className="LoginPage__h1">React Memory Game</h1>
                <div className="LoginPage__form--inputs">
                    {renderInputs()}

                    {error ? <p>{error}</p> : null}
                </div>


                <div className="LoginPage__form--submit">
                    <button type="submit" >
                        Register
                    </button>
                </div>
                <div className="LoginPage__form--switch">
                    You already have an account? Sign in here!
                </div>
            </form>
        </div>
    )
}


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

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
