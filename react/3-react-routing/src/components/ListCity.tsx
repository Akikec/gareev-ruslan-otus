import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";

interface IProps {
    cities: any,
    selectedCity: string,
    onSelectInList: any
}

export class ListCity extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.changeSelect = this.changeSelect.bind(this);
    }

    changeSelect(e) {
        e.preventDefault();
        const p = this.props;
        p.onSelectInList(e.target.value);
    }

    render() {
        const { cities, selectedCity } = this.props;
        const options = [];
        if (!cities.length) options.push(<option key="_0_" value="" disabled hidden>пусто</option>);
        cities.forEach(item => {
            options.push(<option key={item} value={item}>{item}</option>);
        });
        const name = (selectedCity && cities.includes(selectedCity)) ? selectedCity : '';
        return (
            <Router>
                <div className="list-cities-box">
                    <select value={name} onChange={this.changeSelect}>
                        {options}
                    </select>
                </div>
            </Router>
        );
    }
}
