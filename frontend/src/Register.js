import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Register extends Component{

    render() {
        return (
            <div className="loginscreen">
                <div>
                    <MuiThemeProvider>
                    <div>
                        <p>Teste</p>
                    </div>
                    </MuiThemeProvider>
                </div>
            </div>
        );
    }

}

export default Register;