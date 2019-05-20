import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import home from '../../views/Home';

const reducers =  combineReducers({
  home
});

const store = applyMiddleware(thunk)(createStore)(reducers,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;