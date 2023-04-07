import axios from 'axios';
import { startGetExpense } from './expenseAction';
import Swal from 'sweetalert2';

export const startAddCategory = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:3001/api/category/create', data, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const category = response.data
                if (category.hasOwnProperty('error')) {
                    Swal.fire({
                        title: 'Error!',
                        text: category.error,
                        icon: 'error',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                } else {
                    Swal.fire({
                        title: 'Info!',
                        text: 'Cattegory Successfully Added',
                        icon: 'info',
                        width: '300px',
                        timer: 2000,
                        showConfirmButton: false
                    })
                    dispatch(startGetCategory())
                }
            })
    }
}

export const startGetCategory = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/api/category/show', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const category = response.data
                dispatch(setCategory(category))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const startGetDeletedCategory = () => {
    return (dispatch) => {
        axios.get('http://localhost:3001/api/category/showDeleted', {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const category = response.data
                console.log("CATEGORY", category)
                dispatch(setDeletedCategory(category))
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}


const setDeletedCategory = (data) => {
    return {
        type: 'SET_DELETEDCATEGORY',
        payload: data
    }
}

const setCategory = (data) => {
    return {
        type: 'SET_CATEGORY',
        payload: data
    }
}

export const startRemoveCategory = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3001/api/category/softdelete/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const category = response.data
                Swal.fire({
                    title: 'Category and its expenses are Successfully Removed!',
                    text: 'You can Retrieve them in Settings',
                    icon: 'success',
                    width: '300px',
                    timer: 2000,
                    showConfirmButton: false
                })
                dispatch(startGetCategory())
                dispatch(startGetExpense())
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}

export const startDeleteCategory = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3001/api/category/delete/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const category = response.data
                Swal.fire({
                    title: 'success!',
                    text: 'Category Permanently Deleted',
                    icon: 'success',
                    width: '300px',
                    timer: 2000,
                    showConfirmButton: false
                })
                dispatch(startGetCategory())
                dispatch(startGetExpense())
                dispatch(startGetDeletedCategory())
            })
            .catch((err) => {
                alert(err)
            })
    }
}

export const startRestoreCategory = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3001/api/category/restore/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                const category = response.data
                Swal.fire({
                    title: 'Success!',
                    text: 'Category and its expenses are restored Successfully',
                    icon: 'success',
                    width: '300px',
                    timer: 2000,
                    showConfirmButton: false
                })
                dispatch(startGetDeletedCategory())
                dispatch(startGetCategory())
                dispatch(startGetExpense())
            })
            .catch((err) => {
                alert(err.message)
            })
    }
}



export const removeCategory = (id) => {
    return {
        type: 'REMOVE_CATEGORY',
        payload: id
    }
}

export const categoryRemove = () => {
    return {
        type: 'CATEGORY_REMOVE'
    }
}