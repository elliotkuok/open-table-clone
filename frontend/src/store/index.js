import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import errorsReducer from './errorsReducer';
import restaurantsReducer from './restaurants';

const rootReducer = combineReducers({
    session: sessionReducer,
    errors: errorsReducer,
    restaurants: restaurantsReducer
});

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
};

export default configureStore;