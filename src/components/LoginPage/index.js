import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import "./LoginPage.scss";
import * as actions from "../../store/actions";
import { useHistory } from "react-router-dom";


const LoginPage = ({ login, register, registered, authError, loggedIn}) => {
    const MIN_LENGTH = 3;
    const MAX_LENGTH = 45;
    const [inputs, setInputs] = useState({  email: "", password: "" });
    const [error, setError] = useState(null);

    const [loginToggle, setLoginToggle] = useState(true);
    const history = useHistory();

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
        if (loginToggle) login(inputs);
        else register(inputs);
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
            if (key === 'email') {
                let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!regEmail.test(value)) {
                    setError(`Your ${key} is invalid! Please type valid email`);
                    return;
                }
            }
            
            setError(null);
        }
    };

    useEffect(() => {
        if (loggedIn) history.push("/home");
        if (registered) {
            window.alert("Register successful. Please log in now.");
            window.location.reload();
        }
        if (authError) setError("Wrong email or password :( Please try again");

    },[loggedIn,authError,registered])

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
        <React.Fragment>
            <div className="LoginPage__form">
                <form onSubmit={(event) => onSubmit(event)}>
                    <h1 className="LoginPage__h1">React Memory Game</h1>
                    {loginToggle ? null:<p>To create an account, please fill the below information:</p>}
                    <div className="LoginPage__form--inputs">
                        {renderInputs()}

                        {error ? <p>{error}</p> : null}
                    </div>


                    <div className="LoginPage__form--submit">
                        <button type="submit" disabled={error}>
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
            <div class="LoginPage__board">
                <p>Wanna know how others are doing?</p>
                 <span onClick={()=>history.push('/summary')}>See the scoreboard here!</span>
            </div>
        </React.Fragment>
    )
}

function mapStateToProps(state) {
  return {
    authError: state.auth.error,
    loggedIn: state.auth.loggedIn,
    registered: state.auth.registered
};
}

const mapDispatchToProps = (dispatch) => {
  return {
      login: (user) => dispatch(actions.login(user)),
    register: (user) => dispatch(actions.register(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
