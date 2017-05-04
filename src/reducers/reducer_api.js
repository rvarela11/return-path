import { GET_API, GET_DROPDOWNS_API, NEW_API } from '../actions/index';

const INITIAL_STATE = { display: [], filterDropdown: [] };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_API:
      return { ...state, display: action.payload};
    case GET_DROPDOWNS_API:
      return { ...state, filterDropdown: action.payload};  
    case NEW_API:
      return { ...state, display: action.payload};
  }
  return state;
}
