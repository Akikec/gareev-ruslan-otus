import React, { Component } from 'react';
import { AddCity } from './AddCity';

interface IProps {}

interface IState {
    newCity: string,
    resultAddCity: string,
    cities: any,
    selectedCity: string,
    weather: any
}

const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = '55e0609c6cd81662b63d51eacfab3bcd';

export class WeatherCity extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            newCity: '',
            resultAddCity: '',
            cities: ['Moscow', 'Kazan'],
            selectedCity: '',
            weather: {
                main: { humidity: null, pressure: null, temp: null },
                wind: { speed: null, deg: null }
            }
        };
        this.UpdateWeather = this.UpdateWeather.bind(this);
        this.GetDataWeather = this.GetDataWeather.bind(this);
        this.AddCity = this.AddCity.bind(this);
        this.ResetInfo = this.ResetInfo.bind(this);
        this.ChangeSelect = this.ChangeSelect.bind(this);
    }

    componentDidMount() {
        const { cities } = this.state;
        if (cities.length > 0) this.UpdateWeather(cities[0]);
    }

    async GetDataWeather(city: string) {
        const url = `${API_URL}?q=${city},ru&APPID=${API_KEY}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    async UpdateWeather(city) {
        const dw = {
            main: { humidity: null, pressure: null, temp: null },
            wind: { speed: null, deg: null }
        };
        if (city !== '') {
            const dataWeather = await this.GetDataWeather(city);
            if (dataWeather && dataWeather.cod === 200) {
                this.setState({ selectedCity: city, weather: dataWeather });
            }
        } else {
            this.setState({ selectedCity: '', weather: dw });
        }
    }

    async AddCity(city) {
        this.setState({ resultAddCity: 'Проверка...' });
        if (city !== '') {
            const dataWeather = await this.GetDataWeather(city);
            if (dataWeather && dataWeather.cod === 200) {
                let needUpdateWeather = false;
                this.setState(prevState => {
                    const list = prevState.cities;
                    if (list.includes(city)) {
                        return Object.assign(prevState, {
                            newCity: city,
                            resultAddCity: 'Такой город уже есть в списке!'
                        });
                    } else {
                        list.push(city);
                        needUpdateWeather = true;
                        return Object.assign(prevState, {
                            newCity: '',
                            resultAddCity: 'Город "' + city + '" добавлен в список.',
                            cities: list,
                            selectedCity: city
                        });
                    }
                });
                if (needUpdateWeather) {
                    this.UpdateWeather(city);
                }
            } else {
                this.setState({ newCity: city, resultAddCity: 'Такого города нет в базе данных!' });
            }
        } else {
            this.setState({ newCity: city, resultAddCity: 'Введите название города!' });
        }
    }

    ResetInfo(city) {
        this.setState({ newCity: city, resultAddCity: '' });
    }

    ChangeSelect(e) {
        this.ResetInfo('');
        this.UpdateWeather(e.target.value);
    }

    render() {
        const { newCity, resultAddCity, cities, selectedCity, weather } = this.state;
        const options = [];
        cities.forEach(item => {
            options.push(<option key={item} value={item}>{item}</option>);
        });
        return (
            <div>
                <AddCity city={newCity} info={resultAddCity} onAddCity={this.AddCity} onResetInfo={this.ResetInfo} />
                <p>
                    <b>Список городов: </b>
                    <select value={selectedCity} onChange={this.ChangeSelect}>{options}</select>
                </p>
                <p>
                    <b>Текущая погода в городе "{selectedCity ? selectedCity : '...'}":</b><br />
                </p>
                <p>
                    Скорость ветра: {weather.wind.speed ? weather.wind.speed + ' м/с' : '-'}<br />
                    Направление ветра: {weather.wind.deg ? weather.wind.deg + ' град.' : '-'}<br />
                    Температура: {weather.main.temp ? weather.main.temp + ' °C' : '-'}<br />
                    Давление: {weather.main.pressure ? weather.main.pressure + ' гПа' : '-'}<br />
                    Влажность: {weather.main.humidity ? weather.main.humidity + ' %' : '-'}
                </p>
            </div>
        );
    }
}
