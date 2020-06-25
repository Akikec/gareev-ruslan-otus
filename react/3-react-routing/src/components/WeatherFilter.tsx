import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";

interface IProps {
    selectedCity: string,
    changeList: any,
    addModeActive: boolean
}

export class WeatherFilter extends Component<IProps> {
    render() {
        const { selectedCity, changeList, addModeActive } = this.props;
        return (
            <Router>
                <div className="filter-box">
                    <span className="btn-filter active" id="btn1" onClick={() => {
                        document.querySelector('#weather-current').style.display = 'block';
                        document.querySelector('#weather-forecast').style.display = 'none';
                        document.querySelector('#btn1').classList.add('active');
                        document.querySelector('#btn2').classList.remove('active');
                    }}>
                        Текущая погода
                    </span>
                    <span className="btn-filter" id="btn2" onClick={() => {
                        document.querySelector('#weather-current').style.display = 'none';
                        document.querySelector('#weather-forecast').style.display = 'block';
                        document.querySelector('#btn1').classList.remove('active');
                        document.querySelector('#btn2').classList.add('active');
                    }}>
                        Прогноз
                    </span>
                    <div className="add-city-box">
                        <span className="btn-filter" id="btn3" onClick={() => { if (selectedCity) changeList(selectedCity, addModeActive); }}>
                           { addModeActive ? 'Добавить в список' : 'Удалить из списка' }
                        </span>
                    </div>
                    <span className="clearfix"></span>
                </div>
            </Router>
        );
    }
}
