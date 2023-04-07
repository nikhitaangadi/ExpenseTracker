const userInitialState={
    isLoading:true,
    data:[],
    errors:{}
}

const userReducer=(state=userInitialState,action)=>{
    switch(action.type){
        case 'SET_USER':{
            return {...state,data:[...state.data,action.payload]}
        }
        case 'REMOVE_USER':{
            return {...state,data:[]}
        }
        case 'RESET_ALL':{
            return {...state,data:[]}
        }
        default:{
            return {...state}
        }
    }
}
export default userReducer