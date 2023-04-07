import { createStore,combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import userReducer from "../reducers/userReducer";
import budgetReducer from "../reducers/budgetReducer";
import categoryReducer from "../reducers/categoryReducer";
import expenseReducer from "../reducers/expenseReducer";
import modalReducer from "../reducers/modalReducer";
import userProfileReducer from "../reducers/UserProfileReducer";

const configureStore=()=>{
    const store=createStore(combineReducers({
        user:userReducer,
        budget:budgetReducer,
        category:categoryReducer,
        expense:expenseReducer,
        modal:modalReducer,
        userProfile:userProfileReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore