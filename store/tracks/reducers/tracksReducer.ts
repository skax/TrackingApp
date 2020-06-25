import {Track} from "../track";

export interface TrackReducerModel {
    tracks: Track[];
}


const trackReducer = (state: TrackReducerModel = {tracks: []}, action: any): TrackReducerModel => {
    return state; // todo chuj zrobic dalej
}

export default trackReducer;
