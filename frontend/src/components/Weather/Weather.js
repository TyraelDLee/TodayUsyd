import React, { Component } from "react";
import axios from 'axios';
import './Weather.css'

class Weather extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: null,
            weather: null,
            weatherIcon_url: null,
            degree: null,
        }
    }

    componentDidMount(){
        /* lat = "-33.8698439";
        const lon = "151.2082848";
        const api_key = "3c923d8641a87a30697b414cb175cbf7";
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`).then((response) => {
            this.setState({
                "name": response.data.name,
                "weather": response.data.weather[0].description,
                "weatherIcon_url": `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
                "degree": (response.data.main.temp - 273.15).toFixed(0),
            }); 
        })*/
    }

    render() {
        const {name, weather, weatherIcon_url, degree} = this.state;
        if (name && weather && weatherIcon_url && degree){
            return(
                <div className="weather">
                    <div className="weatherLocation">{name}</div>
                    <div>
                        <img className="weatherIcon" alt="icon" src={weatherIcon_url}></img>
                        <div className="weatherDescription">{weather}</div> 
                    </div>
                    <div className="weatherDegree">{degree} °C</div>
                </div>
            );
        }
    }
}

export default Weather;