import axios from 'axios'
import { startGetCategory } from './categoryAction'
import Swal from 'sweetalert2'

export const startAddExpense = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:3001/api/expense/create', data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const expense = response.data
                if (expense.hasOwnProperty('error')) {
                    Swal.fire({
                        title: 'Error!',
                        text: expense.error,
                        icon: 'Error',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                } else {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Expense Successfully Added',
                        icon: 'success',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    dispatch(startGetExpense())
                }
            })
    }
}

export const startGetExpense = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/api/expense/show', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const expense = response.data
                dispatch(setExpense(expense))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const setExpense = (data) => {
    return {
        type: 'SET_EXPENSE',
        payload: data
    }
}

export const startUpdateExpense = (id, data) => {
    return (dispatch) => {

        axios.put(`http://localhost:3001/api/expense/update/${id}`, data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const updatedExpense = response.data
                if (updatedExpense.hasOwnProperty('errors')) {
                    Swal.fire({
                        title: 'Error!',
                        text: updatedExpense.errors,
                        icon: 'error',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                } else {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Expense Successfully Updated',
                        icon: 'success',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    const expenseId = updatedExpense._id
                    dispatch(updateExpense(expenseId, updatedExpense))
                }
            })
    }
}

export const startSoftDeleteExpense = (id) => {
    return (dispatch) => {

        axios.delete(`http://localhost:3001/api/expense/softdelete/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const softDeleteResponse = response.data
                if (softDeleteResponse.hasOwnProperty('error')) {
                    Swal.fire({
                        title: 'Error!',
                        text: softDeleteResponse.error,
                        icon: 'Error',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                } else {
                    Swal.fire({
                        title: 'Expense Successfully Deleted!',
                        text: 'You can Retrieve it from Settings.',
                        icon: 'success',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    dispatch(startGetExpense())
                }
            })
    }
}

const updateExpense = (id, body) => {
    return {
        type: 'UPDATE_EXPENSE',
        payload: {
            id: id,
            body: body
        }
    }
}

export const removeExpense = () => {
    return {
        type: 'REMOVE_EXPENSE'
    }
}

export const startGetDeletedExpense = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/api/expense/showDeleted', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const expense = response.data
                console.log("EXPENSE", expense)
                dispatch(setDeletedExpense(expense))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

const setDeletedExpense = (data) => {
    return {
        type: 'SET_DELETEDEXPENSE',
        payload: data
    }
}

export const startRestoreExpense = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3001/api/expense/restore/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                alert(response.data)
                const expense = response.data
                Swal.fire({
                    title: 'Success!',
                    text: 'Expense Restored Successfully',
                    icon: 'success',
                    width: '300px',
                    timer: 2000,
                    showConfirmButton: false
                })
                dispatch(startGetDeletedExpense())
                dispatch(startGetExpense())
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const startDeleteExpense = (id) => {
    return (dispatch) => {

        axios.delete(`http://localhost:3001/api/expense/delete/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const Response = response.data
                Swal.fire({
                    title: 'Success!',
                    text: 'Expense Successfully Deleted Permanantly',
                    icon: 'success',
                    width: '300px',
                    timer: 2000,
                    showConfirmButton: false
                })
                dispatch(startGetCategory())
                dispatch(startGetExpense())
                dispatch(startGetDeletedExpense())
            })
            .catch((err) => {
                alert(err)
            })
    }
}