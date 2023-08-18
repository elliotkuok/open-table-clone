import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import errorsReducer from './errorsReducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    errors: errorsReducer
});

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
};

export default configureStore;