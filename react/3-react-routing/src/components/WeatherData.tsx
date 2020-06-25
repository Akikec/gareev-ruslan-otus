import React, {Component, createElement} from 'react';
import { DataTableString } from './DataTableString';
import {Info} from "./Info";

interface IProps {
    weather: any
}

export class WeatherData extends Component<IProps> {
    render() {
        const { weather: { current: { main, wind }, forecast: { list } } } = this.props;
        const header = list.map(item => {
            const dt = new Date(item.dt * 1000);
            const day = (dt.getDate() < 10 ? '0' : '') + (dt.getDate());
            const month = (dt.getMonth() < 9 ? '0' : '') + (dt.getMonth() + 1);
            return day + '.' + month;
        });
        const pressure = list.map(item => (item.main.pressure));
        const humidity = list.map(item => (item.main.humidity));
        const tDay = list.map(item => (item.main.temp.day));
        const tNight = list.map(item => (item.main.temp.night));
        const speed = list.map(item => (item.wind.speed));
        const deg = list.map(item => (item.wind.deg));

        return (
            <div className="data-box">
                <div id="weather-current">
                    <table>
                        <tbody>
                            <DataTableString title="Темп." data={main.temp} inHead={false} />
                            <DataTableString title="Ветер (скорость)" data={wind.speed} inHead={false} />
                            <DataTableString title="Ветер (направ.)" data={wind.deg} inHead={false} />
                            <DataTableString title="Влажность" data={main.humidity} inHead={false} />
                            <DataTableString title="Давление" data={main.pressure} inHead={false} />
                        </tbody>
                    </table>
                </div>
                <div id="weather-forecast">
                    <table>
                        <thead>
                            <DataTableString data={header} inHead={true} />
                        </thead>
                        <tbody>
                            <DataTableString title="Темп. (днем)" data={tDay} inHead={false} />
                            <DataTableString title="Темп. (ночью)" data={tNight} inHead={false} />
                            <DataTableString title="Ветер (скорость)" data={speed} inHead={false} />
                            <DataTableString title="Ветер (направ.)" data={deg} inHead={false} />
                            <DataTableString title="Влажность" data={humidity} inHead={false} />
                            <DataTableString title="Давление" data={pressure} inHead={false} />
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
