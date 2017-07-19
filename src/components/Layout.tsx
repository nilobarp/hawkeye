import * as React from 'react';
import { Header } from './Header';
export interface LayoutProps { title?: string };
export class Layout extends React.Component<LayoutProps, any> {
    render () {
        return  <div>
                    <Header title={this.props.title}/>
                </div>
    }
}