import * as React from 'react';
import axios from 'axios';
import constants from '../constants';
import { Header } from '../components/Header';
import { Auth } from '../helper/auth';
import { StoryItem } from '../components/StoryItem';

export class Home extends React.Component<any, any> {
    constructor () {
        super();
        this.state = {
            stories: []
        }
    }

    componentWillMount () {
        axios({
            baseURL: constants.API_SERVER_URL,
            method: 'get',
            url: '/story',
            headers: {
                'Authorization': 'JWT ' + Auth.getToken()
            }
        }).then((res) => {
            if (res.status === 200) {
                console.log(res);
                this.setState({
                    stories: res.data
                })
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    render () {
        return (
            <div>
                <Header title='HawkEye - Home'/>
                {this.state.stories.map((story) => {
                        return (<StoryItem story={story} key={story.id}/>)
                    })}
            </div>
        );
    }
}