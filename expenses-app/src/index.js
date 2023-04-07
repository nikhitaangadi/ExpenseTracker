import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import configureStore from './store/configureStore';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import { startGetUser } from './actions/userAction';
import { startGetBudget } from './actions/budgetAction';
import { startGetCategory } from './actions/categoryAction';
import { startGetDeletedExpense, startGetExpense } from './actions/expenseAction';
import { startGetUserProfile } from './actions/userProfileAction';
import { startGetDeletedCategory } from './actions/categoryAction';

const store=configureStore()
console.log('state',store.getState())
store.subscribe(()=>{
  console.log('state updated',store.getState())
})

  const token=localStorage.getItem('token')
  if(token){
    store.dispatch(startGetUser())
    store.dispatch(startGetBudget())
    store.dispatch(startGetCategory())
    store.dispatch(startGetExpense())
    store.dispatch(startGetUserProfile())
    store.dispatch(startGetDeletedCategory())
    store.dispatch(startGetDeletedExpense())
  }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
</Provider>
);

