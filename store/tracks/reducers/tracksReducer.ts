import {Track} from "../track";


export interface TrackModel {
    track: Track;
    status: string;
    finishedTracks: Track[];
}

 
const initialState: TrackModel = {
    track: {
        id: 'id',
        snapshots: [],
    },
    status: 'initialState',
    finishedTracks: []
}


const trackReducer = (state: TrackModel = initialState, action: any): TrackModel => {

    //console.log('reducer');
    if(action.type === 'startRecording') {
        state.status = action.payload;
        state.track.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        console.log('Zmiana statusu: ', state.status);
        console.log('state: ', state);
    }

    if(action.type === 'pauseRecording') {
        state.status = action.payload;
        console.log('Zmiana statusu: ', state.status);
        console.log('state: ', state);
    }

    if(action.type === 'stopRecording') {
        state.status = action.payload;
        const {id, snapshots} = state.track;
        state.finishedTracks = [ {id, snapshots}, ...state.finishedTracks ];
        console.log('Zmiana statusu: ', state.status);
        console.log('state: ', state);
        console.log('finished: ', state.finishedTracks);
        return {
            track: {
                id: 'id',
                snapshots: [],
            },
            status: 'initialState',
            finishedTracks: state.finishedTracks
        }
    }

    if(action.type === 'newSnapshot' && state.status === 'recording') {
        const newSnapshot = action.payload;
        console.log(newSnapshot);
        return {
            track: {
                ...state.track,
                snapshots: [newSnapshot, ...state.track.snapshots],
            },
            status: 'recording',
            finishedTracks: state.finishedTracks
        }
    }
    
    if(action.type === 'clearStore') {
        return initialState;
    }
    return state; // todo chuj zrobic dalej
}

export default trackReducer;
