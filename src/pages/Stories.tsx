import * as React from 'react';
import axios from 'axios';
import constants from '../constants';
import { Header } from '../components/Header';
import { Auth } from '../helper/auth';
import { Navigate } from '../helper/navigator'
import { StoryItem } from '../components/StoryItem';

export class Stories extends React.Component<any, any> {
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

    handleDelete (storyId) {
        axios({
            baseURL: constants.API_SERVER_URL,
            method: 'delete',
            url: '/story',
            data: {
                storyId
            },
            headers: {
                'Authorization': 'JWT ' + Auth.getToken()
            }
        }).then((res) => {
            if (res.status === 200) {
                let stories = [];
                this.state.stories.map((story) => {
                    if (story.id !== storyId) {
                        stories.push(story);
                    }
                });
                this.setState({
                    stories
                })
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    render () {
        return (
            <div>
                <Header title='HawkEye - Stories'/>
                <div style={{padding: '10px'}}>
                    <h3>Your stories</h3>
                    <div style={{padding: '20px', display: 'flex', flexDirection: 'row'}}>
                        {this.state.stories.map((story) => {
                            return (
                                <div>
                                    <StoryItem story={story} key={story.id} onDelete={this.handleDelete.bind(this)}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}