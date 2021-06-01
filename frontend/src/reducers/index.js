import { combineReducers } from 'redux';

import theme from './theme';
import auth from './auth';

export default combineReducers({
    theme,
    auth
});