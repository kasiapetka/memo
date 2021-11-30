import { combineReducers } from "redux";
import gameReducer from "./gameReducer";
import scoreboardReducer from './scoreboardReducer'

export default combineReducers({
  game: gameReducer,
  scoreboard: scoreboardReducer,
});
