import * as React from 'react';
import axios from 'axios';
import constants from '../constants';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';

const style = {
    'login-container': {
        'margin': '10px'
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
            loginText: 'Login'
        }
    }

    handleClick() {
        this.setState({isLoading: true, loginText: 'Please wait'});

        // This probably where you would have an `ajax` call
        setTimeout(() => {
        // Completed of async action, set loading state back
            this.setState({isLoading: false, loginText: 'Login'});
        }, 2000);
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

    componentDidMount () {
         
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
                                <Col md={4} mdPush={4}>
                                    <ControlLabel>Username</ControlLabel>
                                    <FormControl
                                        type="text"
                                        placeholder="Username"
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
                                        onClick={!this.state.isLoading ? this.handleClick.bind(this) : null}>{this.state.loginText}</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={4} mdPush={4}>&nbsp;</Col>
                            </Row>
                            <Row>
                                <Col md={4} mdPush={4}>
                                    <FacebookLogin
                                        appId="334135483704985"
                                        autoLoad={true}
                                        fields="name,email,picture"
                                        callback={this.responseFacebook.bind(this)} />     
                                </Col>
                            </Row>
                        </Grid>
                    </FormGroup>
                </form>
            </div>
        )
    }
}

