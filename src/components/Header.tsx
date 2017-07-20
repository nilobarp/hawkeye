import * as React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { Auth } from '../helper/auth';
import { Navigate } from '../helper/navigator';

export interface HeaderProps { title: string }

const styles = {
    'wrapper': {
        display: 'flex'
    },
    'logo': {
        fontSize: '2em',
        flex: 1
    }
};

export class Header extends React.Component<HeaderProps, HeaderProps> {
    constructor () {
        super();
        // TODO: Super hacky, check why props are not parsed
        this.props = arguments[0];
        this.state = { title: this.props.title };
        this.logoutHandler = this.logoutHandler.bind(this);
        this.newStoryHandler = this.newStoryHandler.bind(this);
    }

    logoutHandler () {
        Auth.eraseState();
    }

    newStoryHandler () {
        Navigate.toEditor();
    }

    render () {
        return (
            <div style={styles['wrapper']}>
                <div style={styles['logo']}>{this.state.title}</div>
                <ButtonToolbar>
                    <Button bsStyle='primary'
                       onClick={this.newStoryHandler} >New Food Story</Button>
                    <Button bsStyle='link'
                       onClick={this.logoutHandler} >Logout</Button>
                </ButtonToolbar>
            </div>
        );
    }
}