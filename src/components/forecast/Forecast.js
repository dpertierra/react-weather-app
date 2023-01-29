import {
	Accordion,
	AccordionItem,
	AccordionItemButton,
	AccordionItemHeading,
	AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

// The API returns the forecast for every 3 hours of the day (8 times a day) so we need to filter the data
// to get the forecast for the middle of the day (12:00)
const getDays = (list) => {
	const days = [];
	list.forEach((item) => {
		const date = new Date(item.dt_txt);
		if (date.getHours() === 12) {
			days.push(item);
		}
	});
	return days;
};

const Forecast = ({ data }) => {
	const dayInAWeek = new Date().getDay();
	const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
		WEEK_DAYS.slice(0, dayInAWeek),
	);

	const days = getDays(data.list);
	return (
		<div className="forecast">
			<label className="title">Daily</label>
			<Accordion allowZeroExpanded>
				{days.map((item, index) => (
					<AccordionItem key={index}>
						<AccordionItemHeading>
							<AccordionItemButton>
								<div className="item">
									<img
										alt={`weather icon - ${item.weather[0].description}`}
										className="icon-small"
										src={`icons/${item.weather[0].icon}.png`}
									/>
									<label className="day">{forecastDays[index]}</label>
									<label className="description">
										{item.weather[0].description}
									</label>
									{/* The API does not return the correct min and max values */}
									{/*                                     
									<label className="min-max">
										{Math.round(item.main.temp_min)}°C /{" "}
										{Math.round(item.main.temp_max)}°C
									</label> */}
								</div>
							</AccordionItemButton>
						</AccordionItemHeading>
						<AccordionItemPanel className="item-panel">
							<div className="forecast-details">
								<div className="forecast-details item">
									<label>Humidity</label>
									<label className="value">{item.main.humidity}%</label>
								</div>
								<div className="forecast-details item">
									<label>Pressure</label>
									<label className="value">{item.main.pressure}Hpa</label>
								</div>
								<div className="forecast-details item">
									<label>Clouds</label>
									<label className="value">{item.clouds.all}</label>
								</div>
								<div className="forecast-details item">
									<label>Wind Speed</label>
									<label className="value">{item.wind.speed} m/s</label>
								</div>
							</div>
						</AccordionItemPanel>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};

export default Forecast;
