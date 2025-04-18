import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import chatApp from './chat/reducer';
import agora from "./agora/reducer";


const reducers = combineReducers({
  menu,
  settings,
  authUser,
  chatApp,
  agora
});

export default reducers;
