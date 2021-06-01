import React from 'react';
import './navbar.scss';
import {changePlaygroundTheme} from '../../actions/theme';
import { Link } from 'react-router-dom';
import {logoutUser} from '../../actions/auth';
import { connect } from 'react-redux';


class Navbar extends React.Component {
    logout=()=>{
        this.props.dispatch(logoutUser());
    }
    toggleTheme=()=> {
        const {theme} = this.props;
        var newTheme;
        // console.log('current theme is ',theme);
        var toggle = document.getElementById('toggle');
        var currMargin = toggle.style.marginLeft;
        var moon = document.getElementById('moon');
        var sun = document.getElementById('sun');
        if(theme==="vs-dark"){
            newTheme="vs-light";
            currMargin = "0px";
            sun.style.opacity = 1;
            moon.style.opacity = 0;
            sun.style.right = "0px";
            moon.style.left = "-10px";
            moon.style.top="25px";
            sun.style.top="10px";
        }else{
            newTheme="vs-dark";
            currMargin = "20px";
            moon.style.opacity = 1;
            sun.style.opacity = 0;
            sun.style.right = "-10px";
            moon.style.left = "0px";
            moon.style.top = "10px";
            sun.style.top="25px";

        }
        toggle.style.marginLeft = currMargin;
        // console.log('inside navbar toggletheme',newTheme);
        this.props.dispatch(changePlaygroundTheme(newTheme));
    }
    render() {
        // console.log("inside nabar",this.props);
        const {auth} = this.props;
        const {theme}=this.props;
        // console.log("nav-"+theme);
        const navTheme="nav-"+theme;
        const {isLoggedin} = auth;
        // console.log('nabar is logged in',isLoggedin);
        return (
            <div id="navbar" className={navTheme}>
                <Link to="/">Kollab</Link>
                {/* <select className="language">
                    <option value="0">JavaScript</option>
                    <option value="1">JavaScript</option>
                    <option value="2">JavaScript</option>
                </select> */}
                <div className="object"></div>
                <Link to="/playground">Editor</Link>
                {isLoggedin && <span className="capitalize">{auth.user.username}</span>}
                {isLoggedin === false && <Link to="/register">Sign Up</Link>}
                <div className="object-3"></div>
                <div className="object object-2">
                    {isLoggedin === false && <Link to="/login">Log  In</Link>}
                    {isLoggedin && <span className="pointer" onClick={this.logout}>Log Out</span>}
                </div>
                
                
                
                <div id="theme-container" onClick={this.toggleTheme}>
                    <div id="moon" className="theme-icon">
                        <img alt="" src="https://image.flaticon.com/icons/png/128/2909/2909926.png" />
                    </div>
                    <div id="theme" >
                        <div id="toggle"></div>
                    </div>
                    <div id="sun" className="theme-icon">
                        <img alt="" src="https://image.flaticon.com/icons/png/128/3050/3050031.png" />
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
export default connect(mapStateToProps)(Navbar);