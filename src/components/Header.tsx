import * as React from 'react';

export interface HeaderProps { title: string }

export class Header extends React.Component<HeaderProps, HeaderProps> {
    constructor () {
        super();
        this.state = {title: 'Welcome!'};
    }
    render () {
        setTimeout(() => {
            this.setState({title: this.props.title});
        }, 2000);
        return <h1>{this.state.title}</h1>
    }
}