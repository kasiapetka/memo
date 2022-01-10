import { combineReducers } from "redux";
import gameReducer from "./gameReducer";
import scoreboardReducer from './scoreboardReducer'
import authReducer from './authReducer';

export default combineReducers({
  game: gameReducer,
  scoreboard: scoreboardReducer,
  auth: authReducer
});
