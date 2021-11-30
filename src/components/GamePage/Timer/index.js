import React, { useState, useEffect } from "react";
import * as actions from "../../../store/actions";
import { connect } from "react-redux";

const Timer = ({ isStarted, setTime }) => {
  const [time, setGameTime] = useState(0);

  useEffect(() => {
    let intervalId;

    if (isStarted) {
      intervalId = setInterval(() => {
        setGameTime((time) => time + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
      setTime(time);
    };
  }, [isStarted, time]);

  return (
    <div>
      <h5>Time: {time}s</h5>
    </div>
  );
};


const mapDispatchToProps = (dispatch) => {
  return {
    setTime: (time) => dispatch(actions.setTime(time)),
  };
};
export default connect(null, mapDispatchToProps)(Timer);
