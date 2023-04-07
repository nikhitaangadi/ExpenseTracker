export const showModal=()=>{
    return {
        type:'SHOW_MODAL'
    }
}

export const hideModal=()=>{
    return {
        type: 'CLOSE_MODAL'
    }
}

export const addButtonClicked=(status)=>{
    return {
        type: 'ADD_BUTTON_CLICKED',
        payload:status
    }
}

export const editButtonClicked=(status)=>{
    return {
        type: 'EDIT_BUTTON_CLICKED',
        payload:status
    }
}

export const trashButtonClicked=(status)=>{
    return {
        type: 'TRASH_BUTTON_CLICKED',
        payload:status
    }
}

export const setEditData=(data)=>{
    return {
        type: 'SET_EDIT_DATA',
        payload:data
    }
}

export const removeEditData=()=>{
    return {
        type: 'REMOVE_EDIT_DATA'
    }
}