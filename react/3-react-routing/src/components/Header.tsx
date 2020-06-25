import React, { Component } from 'react';
import { SearchCity } from "./SearchCity";
import { ListCity } from "./ListCity";

interface IProps {
    onSearch: any,
    onSelectInList: any,
    cities: [],
    selectedCity: string
}

export class Header extends Component<IProps> {
    render() {
        const { onSearch, cities, selectedCity, onSelectInList } = this.props;
        return (
            <div className="header-box">
                <SearchCity onSearch={onSearch} />
                <ListCity cities={cities} selectedCity={selectedCity} onSelectInList={onSelectInList}/>
                <span className="clearfix"></span>
            </div>
        );
    }
}
