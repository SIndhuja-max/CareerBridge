import {
    registerRequest,
    registerSuccess,
    registerFail,
    loginRequest,
    loginSuccess,
    loginFail,
    isLoginRequest,
    isLoginSuccess,
    isLoginFail,
    getMeRequest,
    getMeSuccess,
    getMeFail,
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    deleteAccountRequest,
    deleteAccountSuccess,
    deleteAccountFail,
    logoutClearState
} from '../slices/UserSlice'

import { toast } from 'react-toastify'
import axios from 'axios'

/*
REGISTER USER
*/

export const registerUser = (userData) => async (dispatch) => {

    try {

        dispatch(registerRequest())

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }

        const { data } = await axios.post(
            "https://careerbridge-backend-94u7.onrender.com/api/v1/register",
            userData,
            config
        )

        dispatch(registerSuccess())

        localStorage.setItem(
            "userToken",
            data.token
        )

        dispatch(logOrNot())
        dispatch(me())

        toast.success("Registration successful!")

    } catch (err) {


        const errorMessage =
            err?.response?.data?.message ||
            "Registration failed"

        dispatch(registerFail(errorMessage))

        toast.error(errorMessage)

    }

}

/*
LOGIN USER
*/

export const loginUser = (userData) => async (dispatch) => {

    try {

        dispatch(loginRequest())

        const { data } = await axios.post(
            "https://careerbridge-backend-94u7.onrender.com/api/v1/login",
            userData
        )

        dispatch(loginSuccess())

        localStorage.setItem(
            "userToken",
            data.token
        )

        dispatch(logOrNot())
        dispatch(me())

        toast.success("Login successful!")

    } catch (err) {


        const errorMessage =
            err?.response?.data?.message ||
            "Login failed"

        dispatch(loginFail(errorMessage))

        toast.error(errorMessage)

    }

}

/*
CHECK LOGIN
*/

export const logOrNot = () => async (dispatch) => {

    try {

        dispatch(isLoginRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axios.get(
            "https://careerbridge-backend-94u7.onrender.com/api/v1/isLogin",
            config
        )

        dispatch(isLoginSuccess(data.isLogin))

    } catch (err) {

        

        

    }

}

/*
GET ME
*/

export const me = () => async (dispatch) => {

    try {

        dispatch(getMeRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axios.get(
            "https://careerbridge-backend-94u7.onrender.com/api/v1/me",
            config
        )

        localStorage.setItem(
            "role",
            data.user.role
        )

        dispatch(getMeSuccess(data.user))

    } catch (err) {

        const errorMessage =
            err?.response?.data?.message ||
            "Failed to load profile"

        dispatch(getMeFail(errorMessage))

        toast.error(errorMessage)

    }

}

/*
CHANGE PASSWORD
*/

export const changePass = (userData) => async (dispatch) => {

    try {

        dispatch(changePasswordRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        await axios.put(
            "https://careerbridge-backend-94u7.onrender.com/api/v1/changePassword",
            userData,
            config
        )

        dispatch(changePasswordSuccess())

        toast.success("Password changed successfully!")

    } catch (err) {

       

        const errorMessage =
            err?.response?.data?.message ||
            "Password update failed"

        dispatch(changePasswordFail(errorMessage))

        toast.error(errorMessage)

    }

}

/*
UPDATE PROFILE
*/

export const updateProfile = (userData) => async (dispatch) => {

    try {

        dispatch(updateProfileRequest())

        const formData = new FormData()

        formData.append("newName", userData.newName)
        formData.append("newEmail", userData.newEmail)

        if (userData.newAvatar) {

            formData.append(
                "newAvatar",
                userData.newAvatar
            )

        }

        if (userData.newResume) {

            formData.append(
                "newResume",
                userData.newResume
            )

        }

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                "Content-Type": "multipart/form-data"
            }
        }

        await axios.put(
            "https://careerbridge-backend-94u7.onrender.com/api/v1/updateProfile",
            formData,
            config
        )

        dispatch(updateProfileSuccess())

        toast.success("Profile updated successfully!")

        dispatch(me())

    } catch (err) {


        const errorMessage =
            err?.response?.data?.message ||
            "Profile update failed"

        dispatch(updateProfileFail(errorMessage))

        toast.error(errorMessage)

    }

}

/*
DELETE ACCOUNT
*/

/*
DELETE ACCOUNT
*/

/*
DELETE ACCOUNT
*/

export const deleteAccount = (userData, navigate) => async (dispatch) => {

    try {

        dispatch(deleteAccountRequest())

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        }

        const { data } = await axios.put(
            "https://careerbridge-backend-94u7.onrender.com/api/v1/deleteAccount",
            userData,
            config
        )

        if (data.message === "Account Deleted") {

            /*
            CLEAR STORAGE
            */

            localStorage.removeItem("userToken")
            localStorage.removeItem("role")

            /*
            CLEAR REDUX USER
            */

            dispatch(logoutClearState())

            /*
            SUCCESS MESSAGE
            */

            toast.success("Account deleted successfully!")

            /*
            REDIRECT
            */

            window.location.replace("/")

        } else {

            toast.error("Wrong Password!")

        }

    } catch (err) {

        const errorMessage =
            err?.response?.data?.message ||
            "Delete account failed"

        dispatch(deleteAccountFail(errorMessage))

        toast.error(errorMessage)

    }

}