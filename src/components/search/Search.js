import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";
const Search = ({ onSearchChange }) => {
	const [searchText, setSearchText] = useState(null);

	const noOptionsMessage = (input) => {
		if (input.inputValue.length === 0) {
			return "Type a city name";
		} else if (input.inputValue.length < 3) {
			return "Type at least 3 characters";
		} else {
			return "No results found";
		}
	};

	const loadOptions = async (input, callback) => {
		if (input.length < 3) return callback([]);
		else {
			return fetch(
				`${GEO_API_URL}/cities?minPopulation=20000&namePrefix=${input}`,
				geoApiOptions,
			)
				.then((response) => response.json())
				.then((response) => {
					console.log(response);
					return {
						options: response.data.map((city) => {
							return {
								label: `${city.name}, ${city.countryCode}`,
								value: `${city.latitude} ${city.longitude}`,
							};
						}),
					};
				})
				.catch((err) => console.error(err));
		}
	};

	const handleOnChange = (searchText) => {
		setSearchText(searchText);
		onSearchChange(searchText);
	};

	return (
		<AsyncPaginate
			placeholder="Search for a city"
			debounceTimeout={200}
			value={searchText}
			onChange={handleOnChange}
			noOptionsMessage={noOptionsMessage}
			loadOptions={loadOptions}
		/>
	);
};
export default Search;
