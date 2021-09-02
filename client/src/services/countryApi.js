import {$publicHost} from "./index";

export const getAllCountries = async () => {
	const {data} = await $publicHost.get(`countries.json`)
	return data.countries
}
