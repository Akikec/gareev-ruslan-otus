import React, { Component } from 'react';

interface IProps {
    title: string,
    data: any,
    inHead: boolean
}

export class DataTableString extends Component<IProps> {
    render() {
        const { title, data, inHead } = this.props;
        let n = 0;
        const cellTitle = inHead ? (<th></th>) : (<td>{title}</td>);
        const cells = inHead
            ? (Array.isArray(data) ? data.map(value => (<th key={n++}>{value}</th>)) : <th>{data}</th>)
            : (Array.isArray(data) ? data.map(value => (<td key={n++}>{value}</td>)) : <td>{data}</td>);
        return (
            <tr>
                {cellTitle}
                {cells}
            </tr>
        );
    }
}
