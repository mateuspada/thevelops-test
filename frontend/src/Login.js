import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar 
                        title="Login" 
                        />
                        <TextField
                        hintText="Enter your Email"
                        floatingLabelText="Email"
                        onChange = {(event,newValue) => this.setState({email:newValue})}
                        />
                        <br/>
                        <TextField
                        type="password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                        <br/>
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    handleClick(event){
        var apiBaseUrl = "http://localhost:4000/api/";
        var payload = {
            "email":this.state.email,
            "password":this.state.password
        }
        
        axios.post(apiBaseUrl+'login', payload)
            .then(function (res) {
                console.log(res);
                if(res.status === 200){
                    console.log("Login successfull");
                    //var uploadScreen=[];
                    //uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>)
                    //self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
                }
            })
            .catch(function (err) {
                console.log(err);
                if(err.response.status === 422){
                    console.log("Email and password not match");
                    alert("Email and password not match")
                }
                else{
                    console.log("Email doesn't exists");
                    alert("Email doesn't exist");
                }
            });
    }

    
}
    
const style = {
    margin: 15,
};

export default Login;