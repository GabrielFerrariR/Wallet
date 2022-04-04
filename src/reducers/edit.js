import { TOGGLE_ADD_EDIT } from '../actions';

const INITIAL_STATE = {
  toggleAdd: true,
  expenseToEdit: {},
};

const toggleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOGGLE_ADD_EDIT:
    return {
      ...state,
      toggleAdd: !state.toggleAdd,
      expenseToEdit: action.payload,
    };
  default:
    return state;
  }
};

export default toggleReducer;
