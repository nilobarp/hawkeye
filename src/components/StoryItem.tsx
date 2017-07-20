import * as React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';

export interface StoryItemProps { story: {} }

export class StoryItem extends React.Component<StoryItemProps, StoryItemProps> {
    constructor () {
        super();
        // TODO: Super hacky, check why props are not parsed
        this.props = arguments[0];
    }

    render () {
        return (
            <div>
                <span>{this.props.story['cuisine']}</span>
            </div>
        );
    }
}