import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import errorsReducer from './errorsReducer';
import restaurantsReducer from './restaurants';
import reservationsReducer from './reservations';

const rootReducer = combineReducers({
    session: sessionReducer,
    errors: errorsReducer,
    restaurants: restaurantsReducer,
    reservations: reservationsReducer
});

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, applyMiddleware(thunk));
};

export default configureStore;