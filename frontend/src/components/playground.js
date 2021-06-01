import React from "react";
import Editor from "@monaco-editor/react";
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import './sharedEditor.scss';
class Playground extends React.Component{
    
    render() {
        // console.log(this.props);
        
        const { theme, auth } = this.props;
        console.log('this auth in playground',auth);
        const {isLoggedin} = auth;
        console.log('is logged in',isLoggedin);
        
        
        // console.log('Inside playground render',theme);
        // console.log('store state',this.props.store.getState());
        return(
            <div>
                <Editor
                    height="94vh"
                    defaultLanguage="javascript"
                    defaultValue="// type your code here"
                    theme={theme}
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

export default connect(mapStateToProps)(Playground);