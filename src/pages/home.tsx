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
    }

    geolocateUser () {
        var startPos;
        var geoSuccess = function(position) {
            startPos = position;
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