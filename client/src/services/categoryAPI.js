import {$host} from "./index";

export const getCategories = async (debouncedSearchTInput = '') => {
    const {data} = await $host.get('api/categories/', {
        params: {debouncedSearchTInput}
    })
    return data.message
}

export const getCategoriesByList = async () => {
    const {data} = await $host.get('api/categories/by-list')
    return data.message
}

export const addCategory = async (category) => {
    const {data} = await $host.post('api/categories/add', {category})
    return data.message
}

export const deleteCategory = async (id) => {
    const {data} = await $host.get(`api/categories/delete/${id}`)
    return data.message
}

export const editCategory = async (id, catData) => {
    const {data} = await $host.post(`api/categories/edit/`, {id, catData})
    return data.message
}
