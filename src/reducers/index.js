import { combineReducers } from 'redux';

import GetApi from './reducer_api';
import GetDropdownsApi from './reducer_api';
import NewApi from './reducer_api';


const rootReducer = combineReducers({
  display: GetApi,
  filterDropdown: GetDropdownsApi,
  display: NewApi
});

export default rootReducer;
