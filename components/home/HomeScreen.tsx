import {useSelector} from "react-redux";
import {State, store} from "../../store/store";
import {TracksModel} from "../../store/tracks/reducers/tracksReducer";
import React from "react";
import PlotComponent from "../plot/PlotComponent";
import {Button, StyleSheet, View} from "react-native";
import {TrackSnapshot, TrackStatus} from "../../store/tracks/track";
import {clearAllTracks, pauseTrack, startTrack, stopTrack} from "../../store/tracks/actions/tracksActions";

export interface LocationSnapshotData {
    lon: number;
    lat: number;
    velocity: number;
}

const HomeScreen = () => {
    const track = useSelector<State, TracksModel>(state => state.track);

    const velocityData: number[] = mapToVelocity(track.currentTrack?.snapshots || []);

    const startAvailable = track.currentTrack === null || track.currentTrack.status === TrackStatus.PAUSED;
    const pauseAvailable = track.currentTrack && track.currentTrack.status === TrackStatus.RECORDING;
    const stopAvailable = track.currentTrack && track.currentTrack.status !== TrackStatus.FINISHED;

    return (
        <View style={styles.plotContainer}>
            <PlotComponent
                velocityData={velocityData}
                height={150}
                currentMax={Math.max(...velocityData)}
                average={calculateAverage(velocityData)}
            />
            <View style={styles.buttonContainer}>
                {startAvailable && (
                    <Button title={"Start"} onPress={() => {
                        store.dispatch(startTrack())
                    }}/>
                )}

                {pauseAvailable && (
                    <Button title={"Pause"} onPress={() => {
                        store.dispatch(pauseTrack())
                    }}/>
                )}

                {stopAvailable && (
                    <Button title={"Stop"} onPress={() => {
                        store.dispatch(stopTrack())
                    }}/>
                )}

                <Button title={"Clear"} onPress={() => {
                    store.dispatch(clearAllTracks())
                }}/>
            </View>
        </View>
    );
}

const mapToVelocity = (snapshots: TrackSnapshot[]): number[] => {
    return snapshots.map((item: TrackSnapshot) => item.velocity);
}

const calculateAverage = (number: []): number => {
    const sum = number.reduce((a, b) => a + b, 0);
    return (sum / number.length) || 0;
}

HomeScreen.navigationOptions = {
    headerTitle: 'Home'
}


const styles = StyleSheet.create({
    plotContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    buttonContainer: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        margin: 20,
        flexDirection: 'row'
    }
});

export default HomeScreen;
