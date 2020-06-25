import {createStore, combineReducers} from 'redux';
import trackReducer, { TrackModel } from "./tracks/reducers/tracksReducer";

export interface State {
    track: TrackModel;
}

const rootReducer = combineReducers<State>({
    track: trackReducer,
});

export const store = createStore(rootReducer);
