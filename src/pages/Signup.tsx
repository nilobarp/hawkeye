import * as React from 'react';
import axios from 'axios';
import constants from '../constants';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import { Navigate } from '../helper/navigator'

const style = {
    'login-container': {
        'margin': '10px'
    },
    'signup-header': {
        'font-size': '2em'
    }
}

export class Signup extends React.Component<any, any> {
    constructor () {
        super();
        this.state = {
            isLoading: false,
            signupText: 'Sign up',
            username: '',
            password: ''
        }
        this.handleSignup = this.handleSignup.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangeUsername (event: any) {
        this.setState({username: event.target.value});
    }

    onChangePassword (event: any) {
        this.setState({password: event.target.value});
    }

    handleSignup() {
        this.setState({isLoading: true, signupText: 'Please wait'});

        axios({
            baseURL: constants.API_SERVER_URL,
            method: 'post',
            url: '/signup',
            auth: {
                username: this.state.username,
                password: this.state.password
            },
            headers: {
                'X-Login-Provider': 'Local'
            }
        }).then((res) => {
            this.setState({isLoading: false, signupText: 'Please wait...'});
            Navigate.toLogin();
        }).catch((err) => {
            console.log(err);
        })
    }

    responseFacebook (response) {
       console.log(response);
       axios.get(constants.API_SERVER_URL)
            .then(res => {
                console.log('response', res);
            })
            .catch((err) => {
                console.log(err);
            })
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
                                <Col md={4} mdPush={4}><span style={style['signup-header']}>Sign up</span></Col>
                            </Row>
                            <Row>
                                <Col md={4} mdPush={4}>
                                    <ControlLabel>Username</ControlLabel>
                                    <FormControl
                                        type="text"
                                        placeholder="Username"
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
                                        onClick={!this.state.isLoading ? this.handleSignup : null}>{this.state.signupText}</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} mdPush={4}>&nbsp;</Col>
                            </Row>
                        </Grid>
                    </FormGroup>
                </form>
            </div>
        )
    }
}