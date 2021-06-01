import React from "react";
import Editor from "@monaco-editor/react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './sharedEditor.scss';
const io = require('socket.io-client');


class SharedEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "//type your code here", // {content: 'some message', self: true}
        };
        
    }
    componentDidMount(props){
        // this.socket = io.connect('http://localhost:8000');
        this.socket = io.connect('https://kollab-8.herokuapp.com/');
        console.log(this.props.auth);
        this.username = this.props.auth.user.username;

        if (this.username) {
            this.setupConnections();
        }
    }
    setupConnections = () => {
        const socketConnection = this.socket;
        const self = this;

        this.socket.on('connect', function () {
            console.log('CONNECTION ESTABLISHED');

            socketConnection.emit('join_room', {
                user_name: this.username,
                room: 'kollab',
            });

            socketConnection.on('user_joined', function (data) {
                console.log('NEW USER JOINED', data);
            });
        });

        this.socket.on('receive_code', function (data) {
            // add message to state
            console.log('inside receive code',data);
            self.setState({
                value: data.value,
            });
        });
    };
    
    handleEditorChange=(value,event)=>{
        if(value.length-this.state.value.length >10 || this.state.value.length-value.length>10){
            this.setState({ value: value });
            // console.log(this.socket);
            this.socket.emit('send_code', { room: 'kollab', value });
            // console.log('code now is', value);
        }
        
    }
    
    render() {
        // console.log(this.props);
        const{value}=this.state;
        const { theme, auth } = this.props;
        // console.log('this auth in playground', auth);
        const { isLoggedin } = auth;
        // console.log('is logged in', isLoggedin);
        if (!isLoggedin) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                
                <Editor
                    height="94vh"
                    defaultLanguage="javascript"
                    theme={theme}
                    onChange={this.handleEditorChange}
                    value={value}
                    
                />
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

export default connect(mapStateToProps)(SharedEditor);