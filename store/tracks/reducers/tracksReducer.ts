import {Track} from "../track";

export interface TrackModel {
    track: Track;
}

const initialState: TrackModel = {
    track: {
        id: 'id',
        snapshots: [],
    }
}

const trackReducer = (state: TrackModel = initialState, action: any): TrackModel => {
    if(action.type === 'newSnapshot') {
        const newSnapshot = action.payload;
        return {
            track: {
                ...state.track,
                snapshots: [newSnapshot, ...state.track.snapshots],
            }
        }
    }
    return state; // todo chuj zrobic dalej
}

export default trackReducer;
