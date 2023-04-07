const expenseInitialState = {
    isLoading: true,
    data: [],
    deletedExpense:[],
    errors: {}
}

const expenseReducer = (state = expenseInitialState, action) => {
    switch (action.type) {
        case 'SET_EXPENSE': {
            return { ...state, data: [...action.payload] }
        }
        case 'SET_DELETEDEXPENSE':{
            return {...state, deletedExpense: [...action.payload]}
        }
        case 'UPDATE_EXPENSE': {
            return {
                ...state, data: [...state.data.map((ele) => {
                    if (ele._id === action.payload.id) {
                        return { ...ele, ...action.payload.body }
                    } else {
                        return { ...ele }
                    }
                })]
            }
        }
        case 'REMOVE_EXPENSE':{
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
export default expenseReducer