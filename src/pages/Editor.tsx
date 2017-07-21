import * as React from 'react';
import axios from 'axios';
import constants from '../constants';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import FacebookLogin from 'react-facebook-login';
import { Auth } from '../helper/auth';
import { Navigate } from '../helper/navigator';
import { MapSearchBox } from '../components/MapSearch';

declare var google: any;

export class Editor extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            lat: 0,
            lng: 0,
            cuisine: '',
            summary: '',
            imageKey: '',
            story: '',
            errorMessage: ''
        }
        this.handleCuisineChange = this.handleCuisineChange.bind(this)
        this.handleSummaryChange = this.handleSummaryChange.bind(this);
        this.handleImageKeyChange = this.handleImageKeyChange.bind(this);
        this.handleStoryChange = this.handleStoryChange.bind(this);
        this.handlePublish = this.handlePublish.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleCuisineChange(event) {
        this.setState({ cuisine: event.target.value })
    }

    handleSummaryChange(event) {
        this.setState({ summary: event.target.value })
    }

    handleImageKeyChange(event) {
        this.setState({ imageKey: event.target.value })
    }

    handleStoryChange(event) {
        this.setState({ story: event.target.value })
    }

    getLocationFromMap(location) {
        this.setState({
            lat: location.lat(),
            lng: location.lng()
        });
    }

    handlePublish() {
        if (this.validateStory()) {
            axios({
                baseURL: constants.API_SERVER_URL,
                method: 'post',
                url: '/story',
                headers: {
                    'Authorization': 'JWT ' + Auth.getToken()
                },
                data: {
                    story: this.state
                }
            }).then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('USER_STORIES', res.data);
                    Navigate.toConsole();
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    handleCancel () {
        Navigate.toConsole();
    }

    private validateStory() {
        let message = (this.state.lat === 0 || this.state.lng === 0) ? 'Please select your location.' : '';
        message += this.state.cuisine === '' ? ' / Cuisine is required.' : ''
        this.setState({
            errorMessage: message
        });

        return message === '';
    }

    render() {
        return (
            <div>
                <div style={{ height: '250px', display: 'block' }}>
                    <MapSearchBox onLocationSelected={this.getLocationFromMap.bind(this)} />
                </div>
                <div style={{ height: '600px', flex: 1, flexDirection: 'row', padding: '5px' }}>
                    <div style={{ width: '30%', height: '350px', display: 'inline-flex' }}>
                        <form style={{ width: '100%' }}>
                            <Row>
                                <Col md={12}>{this.state.errorMessage}</Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <ControlLabel>Latitude</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.lat}
                                    />
                                </Col>
                                <Col md={6}>
                                    <ControlLabel>Longitude</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.lng}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <ControlLabel>Cuisine</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.cuisine}
                                        onChange={this.handleCuisineChange}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <ControlLabel>Summary</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.summary}
                                        onChange={this.handleSummaryChange}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <ControlLabel>Image Key</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.imageKey}
                                        onChange={this.handleImageKeyChange}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    &nbsp;
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Button
                                        bsStyle="success"
                                        block
                                        onClick={this.handlePublish}
                                        >Publish</Button>
                                </Col>
                                <Col md={6}>
                                    <Button
                                        bsStyle="link"
                                        block
                                        onClick={this.handleCancel}
                                        >Cancel</Button>
                                </Col>
                            </Row>
                        </form>
                    </div>
                    <div style={{ width: '70%', height: '350px', display: 'inline-flex', padding: '10px' }}>
                        <FormControl
                            componentClass="textarea"
                            placeholder=""
                            value={this.state.story}
                            onChange={this.handleStoryChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
}