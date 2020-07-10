import {createStore, combineReducers} from 'redux';
import trackReducer, { TracksModel } from "./tracks/reducers/tracksReducer";

export interface State {
    track: TracksModel;
}

const rootReducer = combineReducers<State>({
    track: trackReducer,
});

export const store = createStore(rootReducer);
