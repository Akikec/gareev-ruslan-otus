import React, { Component } from 'react';

interface IProps {
    city: string,
    info: string,
    onResetInfo: any,
    onAddCity: any
}

export class AddCity extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.handleAddCity = this.handleAddCity.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleAddCity(e) {
        e.preventDefault();
        const name = e.target.inputNameCity.value || '';
        const p = this.props;
        p.onAddCity(name);
    }

    handleChange(e) {
        const p = this.props;
        p.onResetInfo(e.target.value);
    }

    render() {
        const { city, info } = this.props;
        return (
            <form onSubmit={this.handleAddCity}>
                <input type="text" value={city} onChange={this.handleChange} placeholder="Введите название города..." name="inputNameCity" />
                <button type="submit">Добавить</button>
                <span><i>{info}</i></span>
            </form>
        );
    }
}
