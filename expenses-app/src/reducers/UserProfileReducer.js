const userProfileInitialState={
    idLoading:true,
    data:{},
    errors:{}
}

const userProfileReducer=(state=userProfileInitialState,action)=>{
    switch(action.type){
        case 'SET_USERPROFILE':{
            return {...state,data:action.payload}
        }
        case 'REMOVE_USERPROFILE':{
            return {...state,data:{}}
        }
        case 'RESET_ALL':{
            return {...state,data:[]}
        }
        default:{
            return {...state}
        }
    }
}

export default userProfileReducer