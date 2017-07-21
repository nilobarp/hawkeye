import * as React from 'react';
import axios from 'axios';
import constants from '../constants';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import { Auth } from '../helper/auth';
import { Navigate } from '../helper/navigator';

const style = {
    'login-container': {
        margin: '10px'
    },
    'login-header': {
        fontSize: '2em'
    },
    'row': {
        width: 'auto',
        border: '1px solid blue'
    }
}

export class Login extends React.Component<any, any> {
    constructor () {
        super();
        this.state = {
            isLoading: false,
            loginText: 'Login',
            username: '',
            password: ''
        }
        this.localLogin = this.localLogin.bind(this);
        this.facebookLogin = this.facebookLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangeUsername (event: any) {
        this.setState({username: event.target.value});
    }

    onChangePassword (event: any) {
        this.setState({password: event.target.value});
    }

    handleSignup () {
        Navigate.toSignup();
    }

    localLogin() {
        this.handleLogin(false);
    }

    facebookLogin (response) {
       this.handleLogin(true, response);
    }

    handleLogin (socialLogin: boolean = false, user = null) {
        this.setState({isLoading: true, loginText: 'Please wait'});

        axios({
            baseURL: constants.API_SERVER_URL,
            method: 'post',
            url: '/login',
            auth: {
                username: socialLogin ? user.email : this.state.username,
                password: socialLogin ? user.accessToken : this.state.password
            },
            headers: {
                'X-Login-Provider': socialLogin ? 'Facebook' : 'Local'
            }
        }).then((res) => {
            this.setState({isLoading: false, loginText: 'Logged in...'});
            if (res.status === 200) {
                Auth.storeState(res.data);
                Auth.redirect();
            } else {
                console.log('Invalid email or password');
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    render () {
        return (
            <div className="well" style={style['login-container']}>
                <form>
                    <FormGroup
                    controlId="formBasicText"
                    >
                        <Grid>
                            <Row>
                                <Col md={4} mdPush={4}><span style={style['login-header']}>Login</span></Col>
                            </Row>
                            <Row>
                                <Col md={4} mdPush={4}>
                                    <ControlLabel>Email</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                    />
                                    <FormControl.Feedback />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} mdPush={4}>&nbsp;</Col>
                            </Row>
                            <Row>
                                <Col md={4} mdPush={4}>
                                    <ControlLabel>Password</ControlLabel>
                                    <FormControl
                                        type="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        placeholder=""
                                    />
                                    <FormControl.Feedback />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} mdPush={4}>&nbsp;</Col>
                            </Row>
                            <Row>
                                <Col md={4} mdPush={4}>
                                    <Button bsStyle="success" bsSize="large"
                                        block
                                        onClick={!this.state.isLoading ? this.localLogin.bind(this) : null}>{this.state.loginText}</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} mdPush={4}>&nbsp;</Col>
                            </Row>
                            <Row>
                                <Col md={4} mdPush={4}>
                                    <FacebookLogin
                                        appId="334135483704985"
                                        autoLoad={false}
                                        fields="name,email,picture"
                                        callback={this.facebookLogin.bind(this)} />     
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} mdPush={4}>
                                    <Button
                                        bsStyle="link" bsSize="large" block
                                        onClick={this.handleSignup.bind(this)}
                                        >
                                        Sign up with Email
                                    </Button>
                                </Col>
                            </Row>
                        </Grid>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

