//import logo from "./logo.svg";
import Search from "./components/search/Search";
import "./App.css";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import Forecast from "./components/forecast/Forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";

function App() {
	const [currentWeather, setCurrentWeather] = useState(null);
	const [forecast, setForecast] = useState(null);
	const handleOnSearchChange = (searchData) => {
		const [lat, lon] = searchData.value.split(" ");
		const parameters = `?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

		const currentWeatherFetch = fetch(
			`${WEATHER_API_URL}/weather${parameters}`,
		);
		const forecastFetch = fetch(`${WEATHER_API_URL}/forecast${parameters}`);

		Promise.all([currentWeatherFetch, forecastFetch])
			.then(async (response) => {
				const currentWeatherResponse = await response[0].json();
				const forecastResponse = await response[1].json();

				setCurrentWeather({
					city: searchData.label,
					...currentWeatherResponse,
				});
				setForecast({ city: searchData.label, ...forecastResponse });
			})
			.catch((error) => {
				console.log(error);
			});
	};
	return (
		<div className="App container">
			<Search onSearchChange={handleOnSearchChange} />
			<div className="main">
				{currentWeather && <CurrentWeather data={currentWeather} />}
				{forecast && <Forecast data={forecast} />}
			</div>
		</div>
	);
}

export default App;
