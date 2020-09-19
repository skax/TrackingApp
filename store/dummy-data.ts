//import { Track } from '../store/tracks/track'

export const TRACKS = [
    {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
        datasets: [{
            data: [160,72,88,14,20,40,42,20,56,65,78,11,26,80,90]
        }]
    },
    {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
        datasets: [{
            data: [160,72,88,14,20,40,42,20,56,65,78,11,26,80,90]
        }]
    },
]

export const FINISHEDTRACKS: Track[] = [
    { 
        id: '1',
        status: 2,
        snapshots: [{
            lon: 50,
            lat: 50,
            velocity: 50,
            time: new Date()
        },
        {
            lon: 50,
            lat: 50,
            velocity: 40,
            time: new Date()
        },
        {
            lon: 50,
            lat: 50,
            velocity: 30,
            time: new Date()
        },
        {
            lon: 50,
            lat: 50,
            velocity: 20,
            time: new Date()
        },
        {
            lon: 50,
            lat: 50,
            velocity: 10,
            time: new Date()
        }
    ]
    },
    { 
        id: '2',
        status: 2,
        snapshots: [{
            lon: 50,
            lat: 50,
            velocity: 40,
            time: new Date()
        },
        {
            lon: 50,
            lat: 50,
            velocity: 45,
            time: new Date()
        },
        {
            lon: 50,
            lat: 50,
            velocity: 50,
            time: new Date()
        },
        {
            lon: 50,
            lat: 50,
            velocity: 55,
            time: new Date()
        },{
            lon: 50,
            lat: 50,
            velocity: 60,
            time: new Date()
        }
    ]
    },
    { 
        id: '3',
        status: 2,
        snapshots: [{
            lon: 50,
            lat: 50,
            velocity: 30,
            time: new Date()
        },
        {
            lon: 50,
            lat: 50,
            velocity: 20,
            time: new Date()
        },
        {
            lon: 50,
            lat: 50,
            velocity: 35,
            time: new Date()
        },
        {
            lon: 50,
            lat: 50,
            velocity: 40,
            time: new Date()
        },
        {
            lon: 50,
            lat: 50,
            velocity: 32,
            time: new Date()
        }
    ]
    },
    { 
        id: '4',
        status: 1,
        snapshots: [{
            lon: 50,
            lat: 50,
            velocity: 30,
            time: new Date()
        },
        {
            lon: 50,
            lat: 50,
            velocity: 20,
            time: new Date()
        },
        {
            lon: 50,
            lat: 50,
            velocity: 35,
            time: new Date()
        },
        {
            lon: 50,
            lat: 50,
            velocity: 40,
            time: new Date()
        },
        {
            lon: 50,
            lat: 50,
            velocity: 32,
            time: new Date()
        }
    ]
    },
    { 
        id: '5',
        status: 2,
        snapshots: []   
    },
    
];


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

 /*FINISHEDTRACKS.find(track => track.id === itemId)?.snapshots; //useSelector<State, Track[]>(state => state.track.finishedTracks);
 
 const renderItem = (itemData: any) => {
        return (
            <LineChart data={itemData.item} width={Dimensions.get('window').width} height={220} chartConfig={chartConfig} /> //dataToChart[0] { tracks.length > 0 ? chart(tracks) : <Text>No available data.</Text>}
        )    
    }
 */

 /*const chart = (tracks: Track[]) => {
 
        const dataToChart = trackDone.map(track => {
            
        })
        if (dataToChart.length > 0) {
            return <FlatList keyExtractor={(item,index) => index.toString()} data={dataToChart} renderItem={renderItem}/> 
        }
        return <Text>No available data.</Text>
    }; */

