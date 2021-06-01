// action types
import {CHANGE_PLAYGROUND_THEME} from './actionTypes';


// action creators
export function changePlaygroundTheme(theme){
    return {
        type: CHANGE_PLAYGROUND_THEME,
        theme
    }
}