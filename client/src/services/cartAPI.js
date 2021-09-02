import {$authHost} from "@services/index";

export const getUserCart = async () => {
	const {data} = await $authHost.get('api/cart/')
	return data.message
}

export const addToCart = async (productId) => {
	const {data} = await $authHost.post('api/cart/add', {productId})
	return data.message
}

export const removeFromCart = async (productId) => {
	const {data} = await $authHost.post('api/cart/remove', {productId})
	return data.message
}
