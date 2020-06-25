import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, useLocation } from "react-router-dom";

import { Header } from './Header';
import {Info} from "./Info";
import { WeatherContent } from "./WeatherContent";

import { UpdateWeather } from '../request/request';

interface IProps {}

interface IState {
    cities: any,
    infoResultSearch: '',
    selectedCity: string,
    weather: any
}

export class WeatherCity extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        const citiesFromStorage = JSON.parse(localStorage.getItem('cities')) || [];
        citiesFromStorage.sort();
        this.state = {
            cities: citiesFromStorage,
            selectedCity: '',
            weather: {
                current: {
                    main: { humidity: null, pressure: null, temp: null },
                    wind: { speed: null, deg: null }
                },
                forecast: {
                    list: []
                }
            }
        };
        this.onSearch = this.onSearch.bind(this);
        this.onSelectInList = this.onSelectInList.bind(this);
        this.changeList = this.changeList.bind(this);
    }

    async onSearch(city) {
        if (city && city.match(/^[A-Za-z]{2,}$/gi)) {
            const data = await UpdateWeather(city);
            if (data.status === 'success') {
                this.setState({
                    infoResultSearch: '',
                    selectedCity: city,
                    weather: data
                });
            } else {
                this.setState({
                    infoResultSearch: `Город "${city}" не найден!`,
                    selectedCity: ''
                });
            }
        } else {
            this.setState({ infoResultSearch: '' });
        }
    }

    onSelectInList(city) {
        this.onSearch(city);
    }

    changeList(city, addModeActive) {
        if (city) {
            this.setState(prevState => {
                const newState = {
                    ...prevState,
                    cities: prevState.cities.slice(0)
                };
                if (addModeActive && !newState.cities.includes(city)) {
                    newState.cities.push(city);
                    newState.cities.sort();
                }
                else if (!addModeActive && newState.cities.includes(city)) {
                    newState.cities = newState.cities.filter(item => item !== city);
                    newState.selectedCity = newState.cities[0] || '';
                }
                localStorage.setItem('cities', JSON.stringify(newState.cities));
                return newState;
            });
        }
    }

    render() {
        const { cities, infoResultSearch, selectedCity, weather } = this.state;
        const addModeActive = !cities.includes(selectedCity);
        return (
            <Router>
                <Route path="*" render={(props) => {
                    const cityFromUrl = props.location.pathname.trim('/');
                    if (selectedCity && selectedCity !== cityFromUrl) return <Redirect push to={'/' + selectedCity} />;
                    if (!selectedCity && cityFromUrl) return <Redirect push to="/" />;
                    return '';
                }} />
                <div className="weather-city-box">
                    <Header onSearch={this.onSearch} cities={cities} selectedCity={selectedCity} onSelectInList={this.onSelectInList} />
                    <Info infoText={infoResultSearch} />
                    <Route path="/:city" component={(city) => (selectedCity ? <WeatherContent selectedCity={city.match.params.city} weather={weather} addModeActive={addModeActive} changeList={this.changeList} /> : <Redirect push to="/" />)} />
                </div>
            </Router>
        );
    }
}
