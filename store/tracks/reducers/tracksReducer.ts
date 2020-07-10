import {Track, TrackSnapshot, TrackStatus} from "../track";
import {TrackAction} from "../actions/tracksActions";
import {TrackActionType} from "../actions/trackActionType";
import uuid from "uuid";


export interface TracksModel {
    currentTrack: Track | null;
    finishedTracks: Track[];
}


const initialState: TracksModel = {
    finishedTracks: [],
    currentTrack: null,
}

const trackReducer = (state: TracksModel = initialState, action: TrackAction): TracksModel => {

    if (action.type === TrackActionType.START_TRACK) {
        return startOrRestart(state);
    } else if (action.type === TrackActionType.PAUSE_TRACK) {
        return pause(state);
    } else if (action.type === TrackActionType.STOP_TRACK) {
        return stop(state);
    } else if (action.type === TrackActionType.PUSH_TRACK_SNAPSHOT) {
        return pushNewSnapshot(state, action.payload);
    } else if (action.type === TrackActionType.CLEAR_ALL) {
        return clearAll();
    } else {
        return state;
    }
}

const startOrRestart = (state: TracksModel): TracksModel => {
    const currentTrack = state.currentTrack;
    if (currentTrack) {
        const restartedTrack = {
            ...currentTrack,
            status: TrackStatus.RECORDING
        }

        return {
            ...state,
            currentTrack: restartedTrack
        }
    }

    return {
        ...state,
        currentTrack: {
            id: uuid(),
            status: TrackStatus.RECORDING,
            snapshots: []
        }
    }
}

const pause = (state: TracksModel): TracksModel => {
    const currentTrack = state.currentTrack;
    if (currentTrack) {
        const pausedTrack = {
            ...currentTrack,
            status: TrackStatus.PAUSED
        }

        return {
            ...state,
            currentTrack: pausedTrack
        }
    }

    return state;
}

const stop = (state: TracksModel): TracksModel => {
    const currentTrack = state.currentTrack;
    if (currentTrack) {
        const finishedTrack = {
            ...currentTrack,
            status: TrackStatus.FINISHED
        }

        return {
            ...state,
            currentTrack: null,
            finishedTracks: [finishedTrack, ...state.finishedTracks],
        }
    }

    return state;
}

const pushNewSnapshot = (state: TracksModel, snapshot: TrackSnapshot): TracksModel => {
    const currentTrack = state.currentTrack;
    if (currentTrack && currentTrack.status === TrackStatus.RECORDING) {
        const withNewSnapshot = {
            ...currentTrack,
            snapshots: [snapshot, ...currentTrack.snapshots]
        }

        return {
            ...state,
            currentTrack: withNewSnapshot,
        }
    }

    return state;
}

const clearAll = (): TracksModel => {
    return initialState;
}

export default trackReducer;
