import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {useSelector} from "react-redux";
import {State, store} from "../../store/store";
import {TracksModel} from "../../store/tracks/reducers/tracksReducer";
import {Track, TrackSnapshot} from '../../store/tracks/track';
import { FINISHEDTRACKS } from '../../store/dummy-data';


const PlotScreen = (props: any) => {

    const itemId = props.navigation.getParam('id');
    const finishedTracks: Track[] = useSelector<State, Track[]>(state => state.track.finishedTracks);
    const TrackSnapshots: TrackSnapshot[] = finishedTracks.find(track => track.id === itemId)?.snapshots; 
    const chart = (TrackSnapshots: TrackSnapshot[]) => {
        return ({
            labels: TrackSnapshots.map(snapShot => snapShot.time.toString()),
            datasets: [{
                data: TrackSnapshots.map(snapShot => snapShot.velocity)
            }]
        })
    }

    return(
        <View>
            <Text>{itemId}</Text>
            <LineChart data={chart(TrackSnapshots)} width={Dimensions.get('window').width} height={220} chartConfig={chartConfig} />
        </View>
    )
}

const chartConfig= {
    fillShadowGradient: 'black',
    color: (opacity = 1) => `rgba( 255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
}

const styles = StyleSheet.create({

});

export default PlotScreen;
