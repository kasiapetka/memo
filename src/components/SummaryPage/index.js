import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Scoreboard from "./Scoreboard";

const SummaryPage = ({ username }) => {
  const history = useHistory();

  useEffect(() => {
    if (!username) {

      history.push("/");
    }
  }, []);

  return (
    <div>
      <Scoreboard />
    </div>
  );
};

const mapStateToProps = (state) => ({
  username: state.game.username,
});

export default connect(mapStateToProps, null)(SummaryPage);
