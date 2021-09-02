import {$authHost, $host} from "./index";

export const getUploadsProducts = async () => {
	const {data} = await $authHost.get(`api/product/uploads/`)
	return data.message
}

export const getAllApprovedProducts = async (
	searchTerm = '',
	sort = '',
	productResourceType = [],
	productDegreeLevel = [],
	productFormat = [],
	productTypeSelling = [],
	productLanguage = [],
	page,
	limit,
	checkedArr = []
) => {
	const {data} = await $host.get(`api/product/all-approved/`, {
		params: {
			sort,
			searchTerm,
			productResourceType,
			productDegreeLevel,
			productFormat,
			productTypeSelling,
			productLanguage,
			page,
			limit,
			checkedArr
		}
	})
	return data.message
}

export const getPurchases = async () => {
	const {data} = await $authHost.get(`api/product/purchases`)
	return data.message
}

export const getUploadsWishlist = async () => {
	const {data} = await $authHost.get(`api/product/wishlist/get`)
	return data.message
}

export const addProductToWishList = async (id) => {
	const {data} = await $authHost.get('api/product/wishlist/add', {
		params: {id}
	})
	return data.message
}

export const deleteProductFromWishList = async (id) => {
	const {data} = await $authHost.delete('api/product/wishlist/delete', {
		params: {id}
	})
	return data.message
}

export const getAllFilters = async () => {
	const {data} = await $authHost.get(`api/product/filters`)
	return data.message
}

export const addProduct = async (form) => {
	const {data} = await $authHost.post('api/product/add', form)
	return data.message
}

export const editProduct = async (form) => {
	const {data} = await $authHost.put('api/product/add', form)
	return data.message
}

export const deleteProduct = async (id) => {
	const {data} = await $authHost.get(`api/product/delete/${id}`)
	return data.message
}

export const getProduct = async (id, role = 2) => {
	const {data} = await $host.get(`api/product/all/${id}?roles=${role}`)
	return data.message
}

export const deleteFile = async (id) => {
	const {data} = await $authHost.get(`api/product/delete-file/${id}`)
	return data.message
}

export const getProductsAll = async (searchTerm = '', statusSelect = '', fromDate = '', toDate = '', page = '', limit = 3, sort = '') => {
	const {data} = await $host.get(`api/product/all/`, {
		params: {searchTerm, statusSelect, fromDate, toDate, page, limit, sort}
	})
	return data.message
}

export const getProductsStatus = async (id) => {
	const {data} = await $host.get(`api/product/status/`)
	return data.message
}

export const editProductsStatus = async (productId, statusId, userEmail) => {
	const {data} = await $authHost.get(`api/product/edit-status/${productId}?status=${statusId}&&email=${userEmail}`)
	return data.message
}

export const getProductsStatistics = async () => {
	const {data} = await $authHost.get(`api/product/statistics`)
	return data.message
}

export const downloadFile = async (fileName, priceStatusId) => {
	const {data} = await $host.get(`api/product/download`, {
		params: {fileName, priceStatusId}
	})
	return data.message
}

export const downloadZip = async (productLink) => {
	const {data} = await $host.get(`api/product/download-zip`, {
		params: {productLink}
	})
	return data
}

export const getComments = async (id) => {
	const {data} = await $authHost.get(`api/product/comments/get`, {
		params: {id}
	})
	return data.message
}

export const addComment = async (formData) => {
	const {data} = await $authHost.post(`api/product/comments/add`, formData)
	return data.message
}

export const addToPurchases = async () => {
	const {data} = await $authHost.post(`api/product/purchases/add`)
	return data.message
}

export const getReviews = async (id) => {
	const {data} = await $host.get(`api/product/reviews/get`, {
		params: {id}
	})
	return data.message
}

export const checkReview = async (productId) => {
	const {data} = await $authHost.get(`api/product/reviews/check`, {
		params: {productId}
	})
	return data.message
}

export const addReview = async (formData) => {
	const {data} = await $authHost.post(`api/product/reviews/add`, formData)
	return data.message
}

export const getPopulations = async () => {
	const {data} = await $host.get(`api/product/populations/get`)
	return data.message
}
