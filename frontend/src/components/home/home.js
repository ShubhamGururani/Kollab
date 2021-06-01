import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

class Home extends Component {
    
    render() {
        const {auth} = this.props;
        const {isLoggedin} = auth;
        const{theme}=this.props;
        const homeTheme="home-"+theme;
        const roomTheme="room-"+theme;
        // console.log(auth);
        return (
            <div id="home" className={homeTheme}>
                {isLoggedin && <div className="welcome-message capitalize">Welcome {auth.user.username}</div>}
                <br />
                <div className="welcome-message">
                    Kollab is a collaborative code editor built using MERN stack. To use full features of the application, it is recommended that you register yourself in the application.
                    You can access a simple code editor which supports javaScript by clicking on 'Editor' above. This editor does not support collaboration with other users. To collaborate with other users you will have to create an account with Kollab.
                    <p>Once you create an account with Kollab, you can access all the features of the application.</p>
                </div>
                <br/>
                <div className="welcome-message">After you log in, the link to access the collaborative editor will be accessible below.</div>
                <br/>
                {isLoggedin && <Link className={roomTheme}to="/room">Room</Link>}
            </div>
        );
    }
}

export default Home;
