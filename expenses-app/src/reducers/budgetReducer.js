const budgetInitialState={
    isLoading:true,
    data:[],
    errors:{}
}

const budgetReducer=(state=budgetInitialState,action)=>{
    switch(action.type){
        case 'SET_BUDGET':{
            return {...state,data:[...state.data,action.payload]}
        }
        case 'UPDATE_BUDGET':{
            return {...state,data:[action.payload]}
        }
        case 'RESET_ALL':{
            return {...state,data:[]}
        }
        default:{
            return {...state}
        }
    }
}
export default budgetReducer