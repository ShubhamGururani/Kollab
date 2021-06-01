import React from 'react';
import './login.scss';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, clearAuthState } from '../../actions/auth';
// import { CHANGE_PLAYGROUND_THEME } from '../../actions/actionTypes';


class Login extends React.Component{
    constructor(){
        super();
        this.state={
            email: "",
            password: ""
        }
    }
    componentWillUnmount() {
        this.props.dispatch(clearAuthState());
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value,
        });
    };

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        
        // console.log('this.state', this.state);
        const { email, password } = this.state;

        if (email && password) {
            // console.log(email,password);
            this.props.dispatch(login(email, password));
        }
    };
    render(){
        const {  isLoggedin } = this.props.auth;
        // const { error, inProgress} = this.props.auth;
        const {theme}=this.props;
        if (isLoggedin) {
            return <Redirect to="/" />;
        }
        const loginClass="login-"+theme;
        const formClass="form-"+theme;
        // const inputClass="input-"+theme;
        const buttonClass="button-"+theme;
        const inputWrapperClass="input-wrapper-"+theme;
        // console.log(loginClass);
        return(
            <div>
                <div id="login-form-external-container" className={loginClass}>
                    <div id="login-form-container" className={formClass}>
                        <h1>LOG IN</h1>
                        <form onSubmit={this.onSubmit}>
                            <div className="field">
                                <div className={inputWrapperClass} >
                                    <input
                                        type="email"
                                        onChange={this.handleEmailChange}
                                        value={this.state.email}
                                        placeholder="Email"
                                    />
                                </div>
                            </div>
                            <div className="field" >
                                <div className={inputWrapperClass} >
                                    <input
                                        type="password"
                                        onChange={this.handlePasswordChange}
                                        value={this.state.password}
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <button className={buttonClass} onClick={this.handleFormSubmit} type="submit">Log In</button>
                            </div>
                        </form>
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
export default connect(mapStateToProps)(Login);

