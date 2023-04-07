import axios from 'axios';
import Swal from 'sweetalert2';

export const startCreateBudget = (data) => {
    return (dispatch) => {
        axios.post(`http://localhost:3001/api/budget/create/${data}`)
            .then((response) => {
                const result = response.data
                dispatch(setBudget(result))
            })
    }
}
const setBudget = (data) => {
    return {
        type: 'SET_BUDGET',
        payload: data
    }
}
export const startGetBudget = () => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/api/budget/show`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                dispatch(setBudget(result))
            })
    }
}

export const startUpdateBudget = (data) => {
    return (dispatch) => {
        axios.put('http://localhost:3001/api/budget/update', data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                if (result.hasOwnProperty('errors')) {
                    Swal.fire({
                        title: 'Error!',
                        text: result.error.message,
                        icon: 'success',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                } else {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Budget Successfully Updated',
                        icon: 'success',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false

                    })
                }
                dispatch(updateBudget(result))
            })
    }
}

const updateBudget = (data) => {
    return {
        type: 'UPDATE_BUDGET',
        payload: data
    }
}