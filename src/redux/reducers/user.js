import { USER } from '../actions';

const INITIAL_STATE = {
  email: 'ab.bogo@gmail.com',
  password: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
};

export default userReducer;
