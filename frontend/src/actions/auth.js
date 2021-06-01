import {
    LOGIN_START,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    AUTHENTICATE_USER,
    LOG_OUT,
    SIGNUP_START,
    SIGNUP_FAILED,
    SIGNUP_SUCCESS,
    CLEAR_AUTH_STATE,
} from './actionTypes';
import { APIUrls } from '../helpers/urls';
// import jwt_decode from "jwt-decode";


export function startLogin() {
    return {
        type: LOGIN_START,
    };
}
export function loginFailed(errorMessage) {
    return {
        type: LOGIN_FAILED,
        error: errorMessage,
    };
}

export function loginSuccess(user) {
    console.log("inside login success",user);
    return {
        type: LOGIN_SUCCESS,
        user,
    };
}

export function login(email, password) {
    // console.log('email',email);
    // console.log('password',password);
    return (dispatch) => {
        dispatch(startLogin());
        const url = APIUrls.login();
        
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            }),
        }).then((res) => {
            if(res.status!== 401){
                return res.json().then(data=>{
                    // console.log("kya ye token hai",JSON.stringify(data.user.username));
                    localStorage.setItem('token', data.user.username);
                    dispatch(loginSuccess(data.user));
                    return;
                });
                
            }else{
                console.log("error while logging in");
            }
        })
    }
}

export function authenticateUser(user) {
    return {
        type: AUTHENTICATE_USER,
        user,
    };
}

export function logoutUser() {
    localStorage.removeItem("token");
    return {
        type: LOG_OUT,
    };
}

export function signup(email, password, confirmPassword, name) {
    return (dispatch) => {
        const url = APIUrls.signup();
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email":email,
                "password":password,
                "username":name,
            }),
        })
            .then((res) =>{
                if (res.status !== 401) {
                    return res.json().then(data => {
                        console.log("data kya aya bhai ",data);
                        if (!data.message.msgError) {
                            // do something
                            localStorage.setItem('token', data.user);
                            dispatch(signupSuccessful(data.user));
                            return;
                        }else
                            dispatch(signupFailed(data.message));
                    });

                } else {
                    console.log("error while logging in");
                }
            })
    };
}

export function startSingup() {
    return {
        type: SIGNUP_START,
    };
}

export function signupFailed(error) {
    return {
        type: SIGNUP_FAILED,
        error,
    };
}

export function signupSuccessful(user) {
    return {
        type: SIGNUP_SUCCESS,
        user,
    };
}

export function clearAuthState() {
    return {
        type: CLEAR_AUTH_STATE,
    };
}
