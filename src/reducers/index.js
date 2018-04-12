import { combineReducers } from 'redux';

import grid from './grid';
import actors from './actors';
import player from './player';

const rootReducer = combineReducers({
  grid,
  actors,
  player,
});

export default rootReducer;
