export interface Track {
    id: string;
    snapshots: TrackSnapshot[];
}

export interface TrackSnapshot {
    lon: number;
    lat: number;
    velocity: number;
    time: Date;
}
