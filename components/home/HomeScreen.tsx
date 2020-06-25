import {useSelector} from "react-redux";
import {State} from "../../store/store";
import {TrackModel} from "../../store/tracks/reducers/tracksReducer";
import React, {useEffect} from "react";
import * as Location from "expo-location";
import PlotComponent from "../plot/PlotComponent";
import {Button, StyleSheet, View} from "react-native";
import {TrackSnapshot} from "../../store/tracks/track";

export interface LocationSnapshotData {
    lon: number;
    lat: number;
    velocity: number;
}

const HomeScreen = () => {
    const track = useSelector<State, TrackModel>(state => state.track);

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestPermissionsAsync();

            await Location.startLocationUpdatesAsync('LocationFinder',
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000,
                });

            return () => {
                Location.stopLocationUpdatesAsync("LocationFinder");
            }
        })();
    }, []);

    const velocityData = mapToVelocity(track.track.snapshots);

    return (
        <View style={styles.plotContainer}>
            <PlotComponent
                velocityData={velocityData}
                height={150}
                currentMax={Math.max(...velocityData)}
                average={calculateAverage(velocityData)}
            />
            <Button title={"Clear"} onPress={() => {
            }}/>
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
    }
});


export default HomeScreen;
