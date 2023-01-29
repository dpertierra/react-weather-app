import "./current-weather.css";

const CurrentWeather = ({ data }) => {
	return (
		<div className="weather">
			<div className="top">
				<div>
					<p className="city">{data.city}</p>
					<p className="weather-description">{data.weather[0].description}</p>
				</div>
				<div className="icon-temp">
					<img
						className="weather-icon"
						src={`icons/${data.weather[0].icon}.png`}
						alt="Weather icon"
					/>
					<p className="temperature">{Math.round(data.main.temp)}°C</p>
				</div>
			</div>
			<div className="bottom">
				<div className="details">
					<div className="parameter-row">
						<span className="parameter-label details">Details</span>
					</div>
					<div className="parameter-row">
						<span className="parameter-label">Feels like</span>
						<span className="parameter-value">
							{Math.round(data.main.feels_like)}°C
						</span>
					</div>
					<div className="parameter-row">
						<span className="parameter-label">Min/Max</span>
						<span className="parameter-value">
							{Math.round(data.main.temp_min)}°C /{" "}
							{Math.round(data.main.temp_max)}°C
						</span>
					</div>
					<div className="parameter-row">
						<span className="parameter-label">Humidity</span>
						<span className="parameter-value">{data.main.humidity}%</span>
					</div>
					<div className="parameter-row">
						<span className="parameter-label">Pressure</span>
						<span className="parameter-value">{data.main.pressure}Hpa</span>
					</div>
					<div className="parameter-row">
						<span className="parameter-label">Wind</span>
						<span className="parameter-value">{data.wind.speed} m/s</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CurrentWeather;
