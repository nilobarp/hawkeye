import * as React from 'react';
import axios from 'axios';
import constants from '../constants';
import { Header } from '../components/Header';
import { Auth } from '../helper/auth';
import { StoryItem } from '../components/StoryItem';
import { StoryBoard } from '../components/StoryBoard';
import { MapSearchBox } from '../components/MapSearch';

export class Home extends React.Component<any, any> {
    constructor () {
        super();
        this.state = {
            stories: []
        }
    }

    componentWillMount () {
        this.geolocateUser();
        // axios({
        //     baseURL: constants.API_SERVER_URL,
        //     method: 'get',
        //     url: '/story',
        //     headers: {
        //         'Authorization': 'JWT ' + Auth.getToken()
        //     }
        // }).then((res) => {
        //     if (res.status === 200) {
        //         console.log(res);
        //         this.setState({
        //             stories: res.data
        //         })
        //     }
        // }).catch((err) => {
        //     console.log(err);
        // });
    }

    geolocateUser () {
        var startPos;
        var geoSuccess = function(position) {
            startPos = position;
            console.log(startPos.coords.latitude, startPos.coords.longitude)
        };
        navigator.geolocation.getCurrentPosition(geoSuccess);
    }

    render () {
        return (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
                <div style={{ flex: 1, display: 'block' }}>
                    <StoryBoard />
                </div>
            </div>
        );
    }
}