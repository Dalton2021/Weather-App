import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sunny from "./Assets-2/day.svg";
import Snowy from "./Assets-2/snowy-6.svg";
import Rainy from "./Assets-2/rainy-6.svg";
import Thunder from "./Assets-2/thunder.svg";
import Cloudy from "./Assets-2/cloudy-day-3.svg";
import Cloudy2 from "./Assets/cloudy-day-3.svg";
import Snowy2 from "./Assets/snowy-6.svg";
import Rainy2 from "./Assets/rainy-6.svg";
import Thunder2 from "./Assets/thunder.svg";
import Night2 from "./Assets/night.svg";
import Sunny2 from "./Assets/day.svg";

function App() {
    const [query, setQuery] = useState("");
    const [seconds, setSeconds] = useState("");
    const [weather, setWeather] = useState("");
    const [tempCurrent, setTempCurrent] = useState("");
    const [forecastOne, setForecastOne] = useState("");
    const [forecastTwo, setForecastTwo] = useState("");
    const [forecastThree, setForecastThree] = useState("");
    const [forecastFour, setForecastFour] = useState("");
    const [forecastFive, setForecastFive] = useState("");
    const [forecastSix, setForecastSix] = useState("");
    const [forecastSeven, setForecastSeven] = useState("");
    const [forecastEight, setForecastEight] = useState("");
    const [forecastNine, setForecastNine] = useState("");
    const [forecastTen, setForecastTen] = useState("");
    const [forecastEleven, setForecastEleven] = useState("");
    const [forecastTwelve, setForecastTwelve] = useState("");
    const [forecastWeatherOne, setForecastWeatherOne] = useState("");
    const [forecastWeatherTwo, setForecastWeatherTwo] = useState("");
    const [forecastWeatherThree, setForecastWeatherThree] = useState("");
    const [forecastWeatherFour, setForecastWeatherFour] = useState("");
    const [forecastWeatherFive, setForecastWeatherFive] = useState("");
    const [forecastWeatherSix, setForecastWeatherSix] = useState("");
    const [forecastWeatherSeven, setForecastWeatherSeven] = useState("");
    const [forecastWeatherEight, setForecastWeatherEight] = useState("");
    const [forecastWeatherNine, setForecastWeatherNine] = useState("");
    const [forecastWeatherTen, setForecastWeatherTen] = useState("");
    const [forecastWeatherEleven, setForecastWeatherEleven] = useState("");
    const [forecastWeatherTwelve, setForecastWeatherTwelve] = useState("");
    const [pop, setPop] = useState("");

    const location = query.split(" ");
    const api_key = "ca8ca3f1008af06a32458784ea09799b";
    let data_weather = "";
    let hoursInData = "";
    let adjustHoursTime = "";

    function dateGrabber() {
        let date = new Date();
        let options = {
            weekday: "short",
            day: "numeric",
            month: "short",
        };

        return date.toLocaleDateString("en-US", options);
    }

    function currentTime() {
        let time = new Date();
        let options = {
            hour: "numeric",
            hour12: true,
            minute: "numeric",
        };
        return time.toLocaleString("en-Us", options);
    }

    //Updates time every 1000ms
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(currentTime());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    function addTime(hours) {
        let newTime = new Date();
        newTime.setHours(
            newTime.getHours() + hours + Math.round(newTime.getMinutes() / 60)
        );
        newTime.setMinutes(0, 0, 0); // Resets also seconds and milliseconds
        let options = {
            hour: "numeric",
            hour12: true,
            minute: "numeric",
        };
        return newTime.toLocaleString("en-Us", options);
    }

    async function getCoordinates() {
        // Geocode location
        const api_geo = `https://api.openweathermap.org/geo/1.0/direct?q=${location[0]},${location[1]},${location[2]}&appid=${api_key}`;
        const response_geo = await fetch(api_geo);
        const data_geo = await response_geo.json();
        let longitude = data_geo[0].lon;
        let latitude = data_geo[0].lat;
        console.log(`Lat: ${latitude} Lon: ${longitude}`);

        // Weather Gathering
        const api_weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&units=imperial&appid=${api_key}`;
        const response_weather = await fetch(api_weather);
        data_weather = await response_weather.json();
        console.log(data_weather);
        weatherIconCurrent(0);
        updateTempCurrent();
        updateForecastOne();
        updateForecastTwo();
        updateForecastThree();
        updateForecastFour();
        updateForecastFive();
        updateForecastSix();
        updateForecastSeven();
        updateForecastEight();
        updateForecastNine();
        updateForecastTen();
        updateForecastEleven();
        updateForecastTwelve();

        return data_weather;
    }

    // Update Unix time default to readable 24 hour time. Is called in adjustHours
    function convertUnixTimestamp(timestamp) {
        let updatedTime = new Date(timestamp * 1000);
        let sameOptions = {
            hour: "numeric",
            hour12: true,
            minute: "numeric",
        };
        updatedTime = updatedTime.toLocaleString("en-Us", sameOptions);
        return updatedTime;
    }

    // Get Hourly Info. Is called in weatherUpdate.
    function adjustHours(hoursInAdvance) {
        hoursInData = data_weather.hourly[hoursInAdvance];
        adjustHoursTime = convertUnixTimestamp(hoursInData.dt);
        return adjustHoursTime;
    }

    function weatherIconCurrent(hoursAhead) {
        let futureWeather = {
            hourOf: adjustHours(hoursAhead),
            temperature: data_weather.hourly[hoursAhead].temp,
            feels_like: data_weather.hourly[hoursAhead].feels_like,
            condition: data_weather.hourly[hoursAhead].weather[0].main,
            description: data_weather.hourly[hoursAhead].weather[0].description,
        };

        let testCondition = futureWeather.condition;
        let testTime = data_weather.hourly[hoursAhead].dt;
        let eightPM = new Date().setHours(17, 0, 0);
        let sixAM = new Date().setHours(12, 20, 0);
        let sixsix = convertUnixTimestamp(sixAM);
        let eighteight = convertUnixTimestamp(eightPM);
        let compareTime = testTime;
        let compareTime2 = convertUnixTimestamp(compareTime);
        setPop(data_weather.daily[0].pop);
        console.log(`The probability of precipitation is ${pop} `);
        console.log(`The test condition is ${testCondition}`);
        console.log(`The current time is ${testTime}`);
        console.log(`The morning compare time is ${sixsix}`);
        console.log(`The night compare time is ${eighteight}`);
        console.log(`The current test time is ${compareTime2}`);
        switch (testCondition) {
            default:
                setWeather(`${Sunny2}`);
                break;
            case "Clouds":
                setWeather(`${Cloudy2}`);
                break;
            case "Clear":
                setWeather(`${Sunny2}`);
                break;
            case "Snow":
                setWeather(`${Snowy2}`);
                break;
            case "Rain":
                setWeather(`${Rainy2}`);
                break;
            case "Thunderstorm":
                setWeather(`${Thunder2}`);
                break;
            case "Clear" && compareTime >= eighteight && compareTime <= sixsix:
                console.log("It worked?");
                setWeather(`${Night2}`);
                break;
            case "Clouds" && compareTime >= eighteight && compareTime <= sixsix:
                setWeather(`${Night2}`);
                console.log("It worked ya ya?");
                break;
        }
    }

    // Get Future Weather. Like with the state update
    // functions theres likely an easier way to handle
    // all of the updating states. But to be determined.
    function weatherUpdate(hoursAhead) {
        let futureWeather = {
            hourOf: adjustHours(hoursAhead),
            temperature: data_weather.hourly[hoursAhead].temp,
            feels_like: data_weather.hourly[hoursAhead].feels_like,
            condition: data_weather.hourly[hoursAhead].weather[0].main,
            description: data_weather.hourly[hoursAhead].weather[0].description,
        };
        setTempCurrent(`${Math.round(futureWeather.temperature)}°`);
        console.log(futureWeather.condition);
        return tempCurrent;
    }

    function forecastUpdateOne(hoursAhead) {
        let futureWeather = {
            hourOf: adjustHours(hoursAhead),
            temperature: data_weather.hourly[hoursAhead].temp,
            feels_like: data_weather.hourly[hoursAhead].feels_like,
            condition: data_weather.hourly[hoursAhead].weather[0].main,
            description: data_weather.hourly[hoursAhead].weather[0].description,
        };
        let testCondition = futureWeather.condition;
        switch (testCondition) {
            default:
                setForecastWeatherOne(`${Sunny}`);
                break;
            case "Clouds":
                setForecastWeatherOne(`${Cloudy}`);
                break;
            case "Clear":
                setForecastWeatherOne(`${Sunny}`);
                break;
            case "Snow":
                setForecastWeatherOne(`${Snowy}`);
                break;
            case "Rain":
                setForecastWeatherOne(`${Rainy}`);
                break;
            case "Thunderstorm":
                setForecastWeatherOne(`${Thunder}`);
                break;
        }
        setForecastOne(`${Math.round(futureWeather.temperature)}°`);
    }
    function forecastUpdateTwo(hoursAhead) {
        let futureWeather = {
            hourOf: adjustHours(hoursAhead),
            temperature: data_weather.hourly[hoursAhead].temp,
            feels_like: data_weather.hourly[hoursAhead].feels_like,
            condition: data_weather.hourly[hoursAhead].weather[0].main,
            description: data_weather.hourly[hoursAhead].weather[0].description,
        };
        let testCondition = futureWeather.condition;
        switch (testCondition) {
            default:
                setForecastWeatherTwo(`${Sunny}`);
                break;
            case "Clouds":
                setForecastWeatherTwo(`${Cloudy}`);
                break;
            case "Clear":
                setForecastWeatherTwo(`${Sunny}`);
                break;
            case "Snow":
                setForecastWeatherTwo(`${Snowy}`);
                break;
            case "Rain":
                setForecastWeatherTwo(`${Rainy}`);
                break;
            case "Thunderstorm":
                setForecastWeatherTwo(`${Thunder}`);
                break;
        }
        setForecastTwo(`${Math.round(futureWeather.temperature)}°`);
    }
    function forecastUpdateThree(hoursAhead) {
        let futureWeather = {
            hourOf: adjustHours(hoursAhead),
            temperature: data_weather.hourly[hoursAhead].temp,
            feels_like: data_weather.hourly[hoursAhead].feels_like,
            condition: data_weather.hourly[hoursAhead].weather[0].main,
            description: data_weather.hourly[hoursAhead].weather[0].description,
        };
        let testCondition = futureWeather.condition;
        switch (testCondition) {
            default:
                setForecastWeatherThree(`${Sunny}`);
                break;
            case "Clouds":
                setForecastWeatherThree(`${Cloudy}`);
                break;
            case "Clear":
                setForecastWeatherThree(`${Sunny}`);
                break;
            case "Snow":
                setForecastWeatherThree(`${Snowy}`);
                break;
            case "Rain":
                setForecastWeatherThree(`${Rainy}`);
                break;
            case "Thunderstorm":
                setForecastWeatherThree(`${Thunder}`);
                break;
        }
        setForecastThree(`${Math.round(futureWeather.temperature)}°`);
    }
    function forecastUpdateFour(hoursAhead) {
        let futureWeather = {
            hourOf: adjustHours(hoursAhead),
            temperature: data_weather.hourly[hoursAhead].temp,
            feels_like: data_weather.hourly[hoursAhead].feels_like,
            condition: data_weather.hourly[hoursAhead].weather[0].main,
            description: data_weather.hourly[hoursAhead].weather[0].description,
        };
        let testCondition = futureWeather.condition;
        switch (testCondition) {
            default:
                setForecastWeatherFour(`${Sunny}`);
                break;
            case "Clouds":
                setForecastWeatherFour(`${Cloudy}`);
                break;
            case "Clear":
                setForecastWeatherFour(`${Sunny}`);
                break;
            case "Snow":
                setForecastWeatherFour(`${Snowy}`);
                break;
            case "Rain":
                setForecastWeatherFour(`${Rainy}`);
                break;
            case "Thunderstorm":
                setForecastWeatherFour(`${Thunder}`);
                break;
        }
        setForecastFour(`${Math.round(futureWeather.temperature)}°`);
    }
    function forecastUpdateFive(hoursAhead) {
        let futureWeather = {
            hourOf: adjustHours(hoursAhead),
            temperature: data_weather.hourly[hoursAhead].temp,
            feels_like: data_weather.hourly[hoursAhead].feels_like,
            condition: data_weather.hourly[hoursAhead].weather[0].main,
            description: data_weather.hourly[hoursAhead].weather[0].description,
        };
        let testCondition = futureWeather.condition;
        switch (testCondition) {
            default:
                setForecastWeatherFive(`${Sunny}`);
                break;
            case "Clouds":
                setForecastWeatherFive(`${Cloudy}`);
                break;
            case "Clear":
                setForecastWeatherFive(`${Sunny}`);
                break;
            case "Snow":
                setForecastWeatherFive(`${Snowy}`);
                break;
            case "Rain":
                setForecastWeatherFive(`${Rainy}`);
                break;
            case "Thunderstorm":
                setForecastWeatherFive(`${Thunder}`);
                break;
        }
        setForecastFive(`${Math.round(futureWeather.temperature)}°`);
    }
    function forecastUpdateSix(hoursAhead) {
        let futureWeather = {
            hourOf: adjustHours(hoursAhead),
            temperature: data_weather.hourly[hoursAhead].temp,
            feels_like: data_weather.hourly[hoursAhead].feels_like,
            condition: data_weather.hourly[hoursAhead].weather[0].main,
            description: data_weather.hourly[hoursAhead].weather[0].description,
        };
        let testCondition = futureWeather.condition;
        switch (testCondition) {
            default:
                setForecastWeatherSix(`${Sunny}`);
                break;
            case "Clouds":
                setForecastWeatherSix(`${Cloudy}`);
                break;
            case "Clear":
                setForecastWeatherSix(`${Sunny}`);
                break;
            case "Snow":
                setForecastWeatherSix(`${Snowy}`);
                break;
            case "Rain":
                setForecastWeatherSix(`${Rainy}`);
                break;
            case "Thunderstorm":
                setForecastWeatherSix(`${Thunder}`);
                break;
        }
        setForecastSix(`${Math.round(futureWeather.temperature)}°`);
    }
    function forecastUpdateSeven(hoursAhead) {
        let futureWeather = {
            hourOf: adjustHours(hoursAhead),
            temperature: data_weather.hourly[hoursAhead].temp,
            feels_like: data_weather.hourly[hoursAhead].feels_like,
            condition: data_weather.hourly[hoursAhead].weather[0].main,
            description: data_weather.hourly[hoursAhead].weather[0].description,
        };
        let testCondition = futureWeather.condition;
        switch (testCondition) {
            default:
                setForecastWeatherSeven(`${Sunny}`);
                break;
            case "Clouds":
                setForecastWeatherSeven(`${Cloudy}`);
                break;
            case "Clear":
                setForecastWeatherSeven(`${Sunny}`);
                break;
            case "Snow":
                setForecastWeatherSeven(`${Snowy}`);
                break;
            case "Rain":
                setForecastWeatherSeven(`${Rainy}`);
                break;
            case "Thunderstorm":
                setForecastWeatherSeven(`${Thunder}`);
                break;
        }
        setForecastSeven(`${Math.round(futureWeather.temperature)}°`);
    }
    function forecastUpdateEight(hoursAhead) {
        let futureWeather = {
            hourOf: adjustHours(hoursAhead),
            temperature: data_weather.hourly[hoursAhead].temp,
            feels_like: data_weather.hourly[hoursAhead].feels_like,
            condition: data_weather.hourly[hoursAhead].weather[0].main,
            description: data_weather.hourly[hoursAhead].weather[0].description,
        };
        let testCondition = futureWeather.condition;
        switch (testCondition) {
            default:
                setForecastWeatherEight(`${Sunny}`);
                break;
            case "Clouds":
                setForecastWeatherEight(`${Cloudy}`);
                break;
            case "Clear":
                setForecastWeatherEight(`${Sunny}`);
                break;
            case "Snow":
                setForecastWeatherEight(`${Snowy}`);
                break;
            case "Rain":
                setForecastWeatherEight(`${Rainy}`);
                break;
            case "Thunderstorm":
                setForecastWeatherEight(`${Thunder}`);
                break;
        }
        setForecastEight(`${Math.round(futureWeather.temperature)}°`);
    }
    function forecastUpdateNine(hoursAhead) {
        let futureWeather = {
            hourOf: adjustHours(hoursAhead),
            temperature: data_weather.hourly[hoursAhead].temp,
            feels_like: data_weather.hourly[hoursAhead].feels_like,
            condition: data_weather.hourly[hoursAhead].weather[0].main,
            description: data_weather.hourly[hoursAhead].weather[0].description,
        };
        let testCondition = futureWeather.condition;
        switch (testCondition) {
            default:
                setForecastWeatherNine(`${Sunny}`);
                break;
            case "Clouds":
                setForecastWeatherNine(`${Cloudy}`);
                break;
            case "Clear":
                setForecastWeatherNine(`${Sunny}`);
                break;
            case "Snow":
                setForecastWeatherNine(`${Snowy}`);
                break;
            case "Rain":
                setForecastWeatherNine(`${Rainy}`);
                break;
            case "Thunderstorm":
                setForecastWeatherNine(`${Thunder}`);
                break;
        }
        setForecastNine(`${Math.round(futureWeather.temperature)}°`);
    }
    function forecastUpdateTen(hoursAhead) {
        let futureWeather = {
            hourOf: adjustHours(hoursAhead),
            temperature: data_weather.hourly[hoursAhead].temp,
            feels_like: data_weather.hourly[hoursAhead].feels_like,
            condition: data_weather.hourly[hoursAhead].weather[0].main,
            description: data_weather.hourly[hoursAhead].weather[0].description,
        };
        let testCondition = futureWeather.condition;
        switch (testCondition) {
            default:
                setForecastWeatherTen(`${Sunny}`);
                break;
            case "Clouds":
                setForecastWeatherTen(`${Cloudy}`);
                break;
            case "Clear":
                setForecastWeatherTen(`${Sunny}`);
                break;
            case "Snow":
                setForecastWeatherTen(`${Snowy}`);
                break;
            case "Rain":
                setForecastWeatherTen(`${Rainy}`);
                break;
            case "Thunderstorm":
                setForecastWeatherTen(`${Thunder}`);
                break;
        }
        setForecastTen(`${Math.round(futureWeather.temperature)}°`);
    }
    function forecastUpdateEleven(hoursAhead) {
        let futureWeather = {
            hourOf: adjustHours(hoursAhead),
            temperature: data_weather.hourly[hoursAhead].temp,
            feels_like: data_weather.hourly[hoursAhead].feels_like,
            condition: data_weather.hourly[hoursAhead].weather[0].main,
            description: data_weather.hourly[hoursAhead].weather[0].description,
        };
        let testCondition = futureWeather.condition;
        switch (testCondition) {
            default:
                setForecastWeatherEleven(`${Sunny}`);
                break;
            case "Clouds":
                setForecastWeatherEleven(`${Cloudy}`);
                break;
            case "Clear":
                setForecastWeatherEleven(`${Sunny}`);
                break;
            case "Snow":
                setForecastWeatherEleven(`${Snowy}`);
                break;
            case "Rain":
                setForecastWeatherEleven(`${Rainy}`);
                break;
            case "Thunderstorm":
                setForecastWeatherEleven(`${Thunder}`);
                break;
        }
        setForecastEleven(`${Math.round(futureWeather.temperature)}°`);
    }
    function forecastUpdateTwelve(hoursAhead) {
        let futureWeather = {
            hourOf: adjustHours(hoursAhead),
            temperature: data_weather.hourly[hoursAhead].temp,
            feels_like: data_weather.hourly[hoursAhead].feels_like,
            condition: data_weather.hourly[hoursAhead].weather[0].main,
            description: data_weather.hourly[hoursAhead].weather[0].description,
        };
        let testCondition = futureWeather.condition;
        switch (testCondition) {
            default:
                setForecastWeatherTwelve(`${Sunny}`);
                break;
            case "Clouds":
                setForecastWeatherTwelve(`${Cloudy}`);
                break;
            case "Clear":
                setForecastWeatherTwelve(`${Sunny}`);
                break;
            case "Snow":
                setForecastWeatherTwelve(`${Snowy}`);
                break;
            case "Rain":
                setForecastWeatherTwelve(`${Rainy}`);
                break;
            case "Thunderstorm":
                setForecastWeatherTwelve(`${Thunder}`);
                break;
        }
        setForecastTwelve(`${Math.round(futureWeather.temperature)}°`);
    }

    // Set of functions that update Temperatures.
    // Probably a better solution than to write each state
    // and function seperately but unaware of said solution
    // as of now. Can always update later!
    function updateTempCurrent() {
        return weatherUpdate(0);
    }

    function updateForecastOne() {
        return forecastUpdateOne(1);
    }
    function updateForecastTwo() {
        return forecastUpdateTwo(2);
    }
    function updateForecastThree() {
        return forecastUpdateThree(3);
    }
    function updateForecastFour() {
        return forecastUpdateFour(4);
    }
    function updateForecastFive() {
        return forecastUpdateFive(5);
    }
    function updateForecastSix() {
        return forecastUpdateSix(6);
    }
    function updateForecastSeven() {
        return forecastUpdateSeven(7);
    }
    function updateForecastEight() {
        return forecastUpdateEight(8);
    }
    function updateForecastNine() {
        return forecastUpdateNine(9);
    }
    function updateForecastTen() {
        return forecastUpdateTen(10);
    }
    function updateForecastEleven() {
        return forecastUpdateEleven(11);
    }
    function updateForecastTwelve() {
        return forecastUpdateTwelve(12);
    }

    // Checks for 'Enter' key or 'Return' key on input. Runs getCoordinates
    async function handleKeyPress(e) {
        if (e.key === "Enter" || e.key === "Return") {
            getCoordinates();
        }
    }

    return (
        <div className="App">
            {/* Header and Input  */}
            <Container>
                <Row className="row-flex-header">
                    <Col>
                        <div>
                            <input
                                type="text"
                                className="search-box"
                                placeholder="Search"
                                onKeyPress={handleKeyPress}
                                onChange={(e) => setQuery(e.target.value)}
                                value={query}
                            ></input>
                        </div>
                    </Col>
                    <Col className="date">{dateGrabber()}</Col>
                </Row>
            </Container>

            {/* Forecast Preview For Today */}
            <Container className="forecast-preview">
                <Row>
                    <Col className="forecast-col">
                        <h3 className="citystate">
                            {location[0]} {location[1]}
                        </h3>
                    </Col>
                </Row>
                <Row>
                    <Col className="time">
                        <p>{currentTime()}</p>
                    </Col>
                </Row>
                <Row>
                    <Col className="forecast-col">
                        <h2 className="temp">{tempCurrent}</h2>
                    </Col>
                </Row>
            </Container>

            {/* Weather Icon For Today */}
            <Container>
                <Container className="flex">
                    <div className="weather-box flex">
                        <Col className="flex">
                            <img
                                className="weather"
                                key="primary"
                                src={weather}
                                alt=""
                            />
                        </Col>
                    </div>
                </Container>
            </Container>

            <Container className="test">
                <Row>
                <div className="future">
                    <div className="scroll-weather" key="1">
                        <div className="weather-card flex">
                            {addTime(1)}
                            <img
                                className="weather-card-weather"
                                src={forecastWeatherOne}
                                alt=""
                            />
                            <p>{forecastOne}</p>
                        </div>
                        <div className="weather-card" key="2">
                            {addTime(2)}
                            <img
                                className="weather-card-weather"
                                src={forecastWeatherTwo}
                                alt=""
                            />
                            <p>{forecastTwo}</p>
                        </div>
                        <div className="weather-card" key="3">
                            {addTime(3)}
                            <img
                                className="weather-card-weather"
                                src={forecastWeatherThree}
                                alt=""
                            />
                            <p>{forecastThree}</p>
                        </div>
                        <div className="weather-card" key="4">
                            {addTime(4)}
                            <img
                                className="weather-card-weather"
                                src={forecastWeatherFour}
                                alt=""
                            />
                            <p>{forecastFour}</p>
                        </div>
                        <div className="weather-card" key="5">
                            {addTime(5)}
                            <img
                                className="weather-card-weather"
                                src={forecastWeatherFive}
                                alt=""
                            />
                            <p>{forecastFive}</p>
                        </div>
                        <div className="weather-card" key="6">
                            {addTime(6)}
                            <img
                                className="weather-card-weather"
                                src={forecastWeatherSix}
                                alt=""
                            />
                            <p>{forecastSix}</p>
                        </div>
                        <div className="weather-card" key="7">
                            {addTime(7)}
                            <img
                                className="weather-card-weather"
                                src={forecastWeatherSeven}
                                alt=""
                            />
                            <p>{forecastSeven}</p>
                        </div>
                        <div className="weather-card" key="8">
                            {addTime(8)}
                            <img
                                className="weather-card-weather"
                                src={forecastWeatherEight}
                                alt=""
                            />
                            <p>{forecastEight}</p>
                        </div>
                        <div className="weather-card" key="9">
                            {addTime(9)}
                            <img
                                className="weather-card-weather"
                                src={forecastWeatherNine}
                                alt=""
                            />
                            <p>{forecastNine}</p>
                        </div>
                        <div className="weather-card" key="10">
                            {addTime(10)}
                            <img
                                className="weather-card-weather"
                                src={forecastWeatherTen}
                                alt=""
                            />
                            <p>{forecastTen}</p>
                        </div>
                        <div className="weather-card" key="11">
                            {addTime(11)}
                            <img
                                className="weather-card-weather"
                                src={forecastWeatherEleven}
                                alt=""
                            />
                            <p>{forecastEleven}</p>
                        </div>
                        <div className="weather-card" key="12">
                            {addTime(12)}
                            <img
                                className="weather-card-weather"
                                src={forecastWeatherTwelve}
                                alt=""
                            />
                            <p>{forecastTwelve}</p>
                        </div>
                    </div>
                </div>
                </Row>
            </Container>
        </div>
    );
}

export default App;
