import {createStore, combineReducers} from 'redux';
import trackReducer from "./tracks/reducers/tracksReducer";

const rootReducer = combineReducers({
    trackReducer: trackReducer,
});

export const store = createStore(rootReducer);
