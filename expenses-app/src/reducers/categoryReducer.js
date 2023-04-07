const categoryInitialState = {
    isLoading: true,
    data: [],
    deletedCategory:[],
    errors: {}
}

const categoryReducer = (state = categoryInitialState, action) => {
    switch (action.type) {
        case 'SET_CATEGORY': {
            return { ...state, data: [...action.payload] }
        }
        case 'SET_DELETEDCATEGORY':{
            return {...state, deletedCategory: [...action.payload]}
        }
        case 'REMOVE_CATEGORY': {
            return {
                ...state,data:[...state.data.filter((ele) => {
                    return ele._id !== action.payload
                })]
            }
        }
        case 'CATEGORY_REMOVE':{
            return {...state,data:[]}
        }
        case 'RESET_ALL':{
            return {...state,data:[]}
        }
        default: {
            return { ...state }
        }
    }
}
export default categoryReducer