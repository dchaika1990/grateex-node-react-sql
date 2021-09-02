import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (school, email, password, firstName, lastName, nickName, permissions = null) => {
    const {data} = await $host.post('api/user/registration', {school, email, password, firstName, lastName, nickName, permissions})
    return data.message
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.message.token)
    return jwt_decode(data.message.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.message.token)
    return jwt_decode(data.message.token)
}

export const lostPassword = async (email) => {
    const {data} = await $host.post('api/user/lost-password', {email})
    return data.message
}

export const changePassword = async (link = '', newPassword = '', password = '', email = '') => {
    const {data} = await $host.post('api/user/change-password', {link, newPassword, password, email})
    return data.message
}

export const changeEmail = async (oldEmail, email) => {
    const {data} = await $host.post('api/user/change-email', {oldEmail, email})
    localStorage.setItem('token', data.message.token)
    return data.message.user
}

export const saveUserSettings = async (formData) => {
    const {data} = await $authHost.put('api/user/update-user-settings', formData)
    return data.message
}

export const saveUserGlobalSettings = async (formData) => {
    const {data} = await $authHost.put('api/user/update-user-global-settings', formData)
    return data.message
}

export const getUser = async () => {
    const {data} = await $authHost.get(`api/user/get-current-user`)
    return data.message
}

export const getAllUsers = async (searchTerm = '', statusSelect= '', fromDate= '', toDate= '', page= '', limit = 3, sort='') => {
    const {data} = await $authHost.get(`api/user/users`, {
        params: {searchTerm, statusSelect, fromDate, toDate, page, limit, sort}
    })
    return data.message
}

export const getOneUser = async (nickname) => {
    const {data} = await $authHost.get(`api/user/users/${nickname}`)
    return data.message
}

export const activateUser = async (link) => {
    const {data} = await $authHost.get(`api/user/activate/${link}`)
    return data.message
}

export const deActivateUser = async (link, query = null) => {
    const {data} = await $authHost.get(`api/user/activate/${link}?deactivate=true`)
    return data.message
}
export const deleteUser = async (link) => {
    const {data} = await $authHost.get(`api/user/delete/${link}`)
    return data.message
}

export const getUserPage = async (nickname) => {
    const {data} = await $host.get(`api/user/${nickname}`)
    return data.message
}
export const getUsersStatistics = async () => {
    const {data} = await $authHost.get(`api/user/statistics`)
    return data.message
}

export const getNotificationAll = async () => {
    const {data} = await $authHost.get(`api/user/notifications/get`)
    return data.message
}

export const cleanNotification = async (idNotice = null) => {
    const {data} = await $authHost.get(`api/user/notifications/clean`, {
        params: {idNotice}
    })
    return data.message
}

export const addNotification = async (body) => {
    const {data} = await $authHost.post(`api/user/notifications/add`, body)
    return data.message
}

export const updateAdminsEmails = async (formData) => {
    const {data} = await $authHost.put('api/user/admins-emails/update', formData)
    return data.message
}

export const getAdminsEmails = async () => {
    const {data} = await $authHost.get('api/user/admins-emails/get')
    return data.message
}

export const sendPrivacyInfringement = async (body) => {
    const {data} = await $authHost.post(`api/user/infringement/privacy`, body)
    return data.message
}

export const sendCopyrightInfringement = async (body) => {
    const {data} = await $authHost.post(`api/user/infringement/copyright`, body)
    return data.message
}

export const sendProductInfringement = async (body) => {
    const {data} = await $authHost.post(`api/user/infringement/product`, body)
    return data.message
}

export const sendMessage = async (body) => {
    const {data} = await $authHost.post(`api/user/contact-us`, body)
    return data.message
}


export const sendEmailToVendor = async (to, from, fromNickname, msg) => {
    const {data} = await $authHost.post(`api/user/send-email`, {to, from, fromNickname, msg})
    return data.message
}
