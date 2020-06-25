import React, { Component } from 'react';
import { Info } from "./Info";
import { WeatherFilter } from "./WeatherFilter";
import { WeatherData } from "./WeatherData";

interface IProps {
    selectedCity: string,
    weather: any,
    changeList: any,
    addModeActive: boolean
}

export class WeatherContent extends Component<IProps> {
    render() {
        const { selectedCity, weather, changeList, addModeActive } = this.props;
        if (selectedCity) {
            return (
                <div className="weather-data-box">
                    <Info infoText={'Город "' + selectedCity + '":'} />
                    <WeatherFilter selectedCity={selectedCity} changeList={changeList} addModeActive={addModeActive} />
                    <WeatherData weather={weather} />
                </div>
            );
        } else {
            return '';
        }
    }
}
