import {TrackActionType} from "./trackActionType";
import {TrackSnapshot} from "../track";

export interface TrackAction {
    type: TrackActionType;
    payload: any;
}

export const startTrack = (): TrackAction => {
    return {
        type: TrackActionType.START_TRACK,
        payload: null,
    }
}

export const pauseTrack = (): TrackAction => {
    return {
        type: TrackActionType.PAUSE_TRACK,
        payload: null,
    }
}

export const stopTrack = (): TrackAction => {
    return {
        type: TrackActionType.STOP_TRACK,
        payload: null,
    }
}

export const clearAllTracks = (): TrackAction => {
    return {
        type: TrackActionType.CLEAR_ALL,
        payload: null,
    }
}

export const pushNewSnapshot = (trackSnapshot: TrackSnapshot): TrackAction => {
    return {
        type: TrackActionType.PUSH_TRACK_SNAPSHOT,
        payload: trackSnapshot,
    }
}




