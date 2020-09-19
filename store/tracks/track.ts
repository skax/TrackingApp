export interface Track {
    id: string;
    status: TrackStatus;
    snapshots: TrackSnapshot[];
}

export enum TrackStatus {
    RECORDING,
    PAUSED,
    FINISHED
}

export interface TrackSnapshot {
    lon: number;
    lat: number;
    velocity: number;
    time: Date;
}

export interface TimeData {
    id: string,
    start: Date,
    end: Date
}