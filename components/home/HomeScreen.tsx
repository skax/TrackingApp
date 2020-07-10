import {useSelector} from "react-redux";
import {State} from "../../store/store";
import {TrackModel} from "../../store/tracks/reducers/tracksReducer";
import React, { useEffect }from "react";
import PlotComponent from "../plot/PlotComponent";
import {Button, StyleSheet, View, Text} from "react-native";
import {TrackSnapshot} from "../../store/tracks/track";
import {store} from "../../store/store"
import * as Location from "expo-location";

export interface LocationSnapshotData {
    lon: number;
    lat: number;
    velocity: number;
}

const HomeScreen = () => {
    const track = useSelector<State, TrackModel>(state => state.track);
    
  /*  useEffect(() => {
        (async () => {
            let {status} = await Location.requestPermissionsAsync();
            
            if (status) {
                await Location.startLocationUpdatesAsync('LocationFinder',
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                });

                return () => {
                    Location.stopLocationUpdatesAsync("LocationFinder");
                }
            }
        })();
    }, []); */
    
    const velocityData = mapToVelocity(track.track.snapshots);

    return (
        <View style={styles.plotContainer}>
            <PlotComponent
                velocityData={velocityData}
                height={150}
                currentMax={Math.max(...velocityData)}
                average={calculateAverage(velocityData)}
            />
            <View style={styles.buttonContainer}>
                <Button title={"Pause"} onPress={() => { store.dispatch({type: "pauseRecording", payload: 'paused'})} }/>
                <Button title={"Stop"} onPress={() => { store.dispatch({type:"stopRecording", payload: 'finished'}) }}/>
                <Button title={"Start"} onPress={() => { store.dispatch({type:"startRecording", payload: 'recording'}) }}/>
                <Button title={"Clear"} onPress={() => { store.dispatch({type: "clearStore"})} }/>
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

/* 

1. use effect gdzie startujesz cala impreze z lokalizacja przenosisz z HomeScreen do App zeby pracowal caly czas
2. musisz wzbogacic stora, gdzie model Track ma dodatkowo status (RECORDING, PAUSE, STOP) i dodac nowe akcje (start, pause, wznow, stopuj) ktore beda dla danego Tracka zmienialy status
i musisz tam wpierdolic logike ze np nie mozesz wznawiac ani pauzowac skonczonej trasy itd

*/