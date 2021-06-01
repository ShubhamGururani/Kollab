import { CHANGE_PLAYGROUND_THEME } from '../actions/actionTypes';

let initialState="vs-light";
export default function theme(state = initialState , action) {
    
    switch (action.type) {
        case CHANGE_PLAYGROUND_THEME:
            return action.theme;
        default:
            return state;
    }
}