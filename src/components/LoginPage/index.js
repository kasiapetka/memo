import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import "./LoginPage.scss";
import * as actions from "../../store/actions";


const LoginPage = ({login, register}) => {
    const MIN_LENGTH = 3;
    const MAX_LENGTH = 15;
    const [inputs, setInputs] = useState({  email: "", password: "" });
    const [error, setError] = useState("");

    const [loginToggle, setLoginToggle] = useState(true);

    const switchTemplate = (login)=> {
        setLoginToggle(login);
        if (login) {
            setInputs({ email: "", password: "" })
        } else {
            setInputs({ nick: "", email: "", password: "" })
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("inouts: ", inputs)
       
        if (loginToggle) login(inputs);
        else register(inputs)
    }

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

    useEffect(() => {
        validateInputs();
    }, [inputs]);

    const handleInputChange = (event) => {
        const key = event.target.name;
        const newInputs = { ...inputs };
        newInputs[key] = event.target.value;

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
            <form onSubmit={(event) => onSubmit(event)}>
                <h1 className="LoginPage__h1">React Memory Game</h1>
                {loginToggle ? null:<p>To create an account, please fill the below information:</p>}
                <div className="LoginPage__form--inputs">
                    {renderInputs()}

                    {error ? <p>{error}</p> : null}
                </div>


                <div className="LoginPage__form--submit">
                    <button type="submit" >
                        {loginToggle ? 'Login' : 'Register'}
                    </button>
                </div>
                <div className="LoginPage__form--switch">
                    {loginToggle ?
                        <p>You don't have an account? <span onClick={() => switchTemplate(false)}>Register here!</span></p>
                        :
                        <p>You already have an account? <span onClick={()=>switchTemplate(true)}>Sign in here!</span></p>}
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
  return {
      login: (user) => dispatch(actions.login(user)),
    register: (user) => dispatch(actions.register(user))
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
