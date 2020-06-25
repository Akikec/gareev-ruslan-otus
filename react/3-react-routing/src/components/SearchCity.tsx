import React, { Component } from 'react';

interface IProps {
    onSearch: any
}

export class SearchCity extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(e) {
        e.preventDefault();
        const name = e.target.inputNameCity.value || '';
        const p = this.props;
        p.onSearch(name);
        e.target.inputNameCity.value = '';
    }

    render() {
        return (
            <div className="search-box">
                <form onSubmit={this.handleSearch}>
                    <input type="text" placeholder="Введите название города..." name="inputNameCity" width="220" />
                    <button type="submit" className="search-button">Поиск</button>
                </form>
            </div>
        );
    }
}
