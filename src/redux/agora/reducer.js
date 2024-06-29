import { SET_APP_ID } from '../contants';

const initialState = {
  appId: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_APP_ID:
      // console.log('Reducer: check appId ', action.payload);
      return {
        ...state,
        appId: action.payload
      };
    default:
      return state;
  }
};
