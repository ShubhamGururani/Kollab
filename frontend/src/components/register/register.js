import React from 'react';
import './register.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../../actions/auth';
// import {  clearAuthState } from '../../actions/auth';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            name:"",
            email: "",
            password1: "",
            password2: "",
            error:"no"
        }
    }
    onChangeName = (e) => {
        this.setState({ "name": e.target.value });
    };
    onChangeEmail = (e) => {
        this.setState({ "email": e.target.value });
    };
    onChangePassword1 = (e) => {
        this.setState({ "password1": e.target.value ,"error":"no"});
    };
    onChangePassword2 = (e) => {
        this.setState({ "password2": e.target.value ,"error":"no"});
    };
    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.password1!==this.state.password2){
            this.setState({"error": "mismatch"});
            return;
        }
        // const userInfo = {
        //     name: this.state.name,
        //     email: this.state.email,
        //     password1: this.state.password1,
        //     password2: this.state.password2
        // };
        const { email,name } = this.state;
        const password=this.state.password1;
        const confirmPassword = this.state.password2;
        if (email && password && confirmPassword && name) {
            this.props.dispatch(signup(email, password,confirmPassword,name));
        }
    }
    render() {
        const {  isLoggedin } = this.props.auth;
        // const { inProgress } = this.props.auth;
        if (isLoggedin) {
            return <Redirect to="/" />;
        }
        const {theme}=this.props;
        const registerClass = "register-" + theme;
        const formClass = "form-" + theme;
        // const inputClass = "input-" + theme;
        const buttonClass = "button-" + theme;
        const inputWrapperClass = "input-wrapper-" + theme;
        return (
            <div>
                <div id="register-form-external-container" className={registerClass}>
                    <div id="form-container" className={formClass}>
                        <h1>Register</h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="field">
                                <div className={inputWrapperClass}>
                                    <input
                                        type="text"
                                        onChange={this.onChangeName}
                                        value={this.state.name}
                                        placeholder="Name"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className={inputWrapperClass}>
                                    <input
                                        type="email"
                                        onChange={this.onChangeEmail}
                                        value={this.state.email}
                                        placeholder="Email"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className={inputWrapperClass}>
                                    <input
                                        type="password"
                                        onChange={this.onChangePassword1}
                                        value={this.state.password1}
                                        placeholder="Create Password"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <div className={inputWrapperClass}>
                                    <input
                                        type="password"
                                        onChange={this.onChangePassword2}
                                        value={this.state.password2}
                                        placeholder="Confirm Password"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <button className={buttonClass} type="submit">Sign Up</button>
                            </div>
                        </form>
                        <span className={this.state.error}>Passwords mismatch</span>
                        
                    </div>
                </div>
            </div>

        );
    }
}
function mapStateToProps(state) {
    return {
        auth: state.auth,
        theme: state.theme
    };
}
export default connect(mapStateToProps)(Register);

