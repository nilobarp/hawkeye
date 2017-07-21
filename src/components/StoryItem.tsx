import * as React from 'react';
import constants from '../constants';
import { Auth } from '../helper/auth';
import { ButtonToolbar, Button } from 'react-bootstrap';

export interface StoryItemProps { key: any, story: {}, onDelete: Function }

export class StoryItem extends React.Component<StoryItemProps, StoryItemProps> {
    constructor () {
        super();
        // TODO: Super hacky, check why props are not parsed
        this.props = arguments[0];

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete (storyId) {
        this.props.onDelete(storyId);
    }

    render () {
        return (
            <div style={{ padding: '10px', border: 'thin solid #eee', margin: '10px'}}>
                <h5>{this.props.story['cuisine']}</h5>
                <div>{this.props.story['summary']}</div>
                <hr/>
                <Button bsStyle="danger" onClick={() => this.handleDelete(this.props.story['id'])}>Delete</Button>&nbsp;<Button bsStyle="primary">Edit</Button>
            </div>
        );
    }
}