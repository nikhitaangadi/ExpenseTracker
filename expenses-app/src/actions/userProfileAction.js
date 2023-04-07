import axios from "axios";
import Swal from "sweetalert2";

export const startCreateUserProfile = (data) => {
    console.log('ProfileData', data)
    return (dispatch) => {
        axios.post(`http://localhost:3001/api/userProfile/create/${data}`)
            .then((response) => {
                const result = response.data
                dispatch(setUserProfile(result))
            })
    }
}
export const startGetUserProfile = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/api/userProfile/show', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                dispatch(setUserProfile(result[0]))
            })
    }
}

const setUserProfile = (data) => {
    return {
        type: 'SET_USERPROFILE',
        payload: data
    }
}

export const startUpdateUserProfile = (data) => {
    return (dispatch) => {
        console.log('DATA')
        axios.put('http://localhost:3001/api/userProfile/update', data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    Swal.fire({
                        title: 'Error!',
                        text: result.errors,
                        icon: 'error',
                        width: '300px',
                        timer: 3000,
                        showConfirmButton: false
                    })
                } else {
                    Swal.fire({
                        title: 'Info!',
                        text: 'Profile Data Successfully Updated',
                        icon: 'info',
                        confirmButtonText: 'Ok'
                    })
                    dispatch(setUserProfile(result))
                }
            })
    }
}

