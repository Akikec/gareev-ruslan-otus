import React, { Component } from 'react';

interface IProps {
    infoText: string,
}

export class Info extends Component<IProps> {
    render() {
        const { infoText } = this.props;
        return (
            <div className="info-box">
                <span>{ infoText }</span>
            </div>
        );
    }
}
