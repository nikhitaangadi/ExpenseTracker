import axios from 'axios';
import { startCreateBudget } from './budgetAction';
import { startGetBudget } from './budgetAction';
import { startGetCategory } from './categoryAction';
import { startGetExpense } from './expenseAction';
import { startGetUserProfile } from './userProfileAction';
import { startCreateUserProfile } from './userProfileAction';
import Swal from 'sweetalert2'

export const startCreateResident = (data, props) => {
    return (dispatch) => {
        axios.post('http://localhost:3001/api/user/register', data)
            .then((response) => {
                const user = response.data
                if (user.hasOwnProperty('errors')) {
                    Swal.fire({
                        title: 'Info!',
                        text: 'Username or Email already exists',
                        icon: 'info',
                        width: '300px',
                        timer: 3000,
                        showConfirmButton: false
                    })
                } else {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Successfully created User',
                        icon: 'success',
                        width: '300px',
                        timer: 3000,
                        showConfirmButton: false
                    })
                    dispatch(startCreateBudget(user._id))
                    dispatch(startCreateUserProfile(user._id))
                    props.history.push('/login')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const startLoginUser = (data, props) => {
    return (dispatch) => {
        console.log(data)
        axios.post('http://localhost:3001/api/user/login', data)
            .then((response) => {
                const resident = response.data
                if (resident.hasOwnProperty('errors')) {
                    Swal.fire({
                        title: 'Info!',
                        text: "Email and Password doesn't match",
                        icon: 'info',
                        width: '300px',
                        timer: '3000',
                        showConfirmButton: 'false'
                    })
                } else {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Successfully LogedIn',
                        icon: 'success',
                        width: '300px',
                        timer: '3000',
                        showConfirmButton: 'false'
                    })
                    const token = resident.token
                    localStorage.setItem('token', token)
                    dispatch(startGetUser(token))
                    dispatch(startGetBudget())
                    dispatch(startGetCategory())
                    dispatch(startGetExpense())
                    dispatch(startGetUserProfile())
                    props.history.push('/home')
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const startGetUser = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/api/user/account', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                const userInfo = {
                    userId: result._id,
                    username: result.username,
                    email: result.email
                }
                dispatch(setUser(userInfo))
            })
    }
}

export const startUpdateUser = (data) => {
    console.log('D', data)
    return (dispatch) => {
        axios.put('http://localhost:3001/api/user/update', data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                console.log("R", result)
                const userInfo = {
                    userId: result._id,
                    username: result.username,
                    email: result.email
                }
                dispatch(setUser(result))
            })
    }
}

export const startDeleteAccount = (props) => {
    return (dispatch) => {
        axios.delete('http://localhost:3001/api/user/deleteAccount', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                if (result) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Account Successfully Deleted',
                        icon: 'success',
                        width: '300px',
                        timer: 3000,
                        showConfirmButton: false
                    })
                    localStorage.removeItem('token')
                    dispatch(resetAll())
                    props.history.push('/registration')
                }

            })
    }
}

export const resetAll = () => {
    return {
        type: 'RESET_ALL'
    }
}
const setUser = (data) => {
    return {
        type: 'SET_USER',
        payload: data
    }
}

export const removeUser = () => {
    return {
        type: 'REMOVE_USER'
    }
}

