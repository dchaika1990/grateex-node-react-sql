import {$authHost, $host} from "./index";

export const getSchools = async () => {
	const {data} = await $host.get('api/schools/')
	return data.message
}

export const addSchool = async (formData) => {
	const {data} = await $authHost.post('api/schools/add', {formData})
	return data.message
}

export const deleteSchool = async (id) => {
	const {data} = await $authHost.get(`api/schools/delete/${id}`)
	return data.message
}

export const editSchool = async (formData) => {
	const {data} = await $authHost.post('api/schools/edit', {formData})
	return data.message
}
