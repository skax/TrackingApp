import React, {useCallback, useEffect, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import * as Location from 'expo-location';
import PlotComponent from "./components/plot/PlotComponent";
import {Provider} from 'react-redux';
import {store} from "./store/store";

export interface LocationSnapshotData {
    lon: number;
    lat: number;
    velocity: number;
}

export default function App() {
    const [data, setData] = useState<LocationSnapshotData[]>([]);
    const velocityData: number[] = data.map(item => item.velocity);

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestPermissionsAsync();

            // let location = await Location.startLocationUpdatesAsync("TASK_NAME", {
            //     accuracy: Location.Accuracy.High,
            //     timeInterval: 2000,
            // });

            let location = await Location.watchPositionAsync({
                accuracy: Location.Accuracy.High,
                timeInterval: 1000,
            }, (data: any) => addData({
                lon: data.coords.longitude,
                lat: data.coords.latitude,
                velocity: data.coords.speed * 3.6
            }));

            // return () => {
            //     Location.stopLocationUpdatesAsync("TASK_NAME");
            // }
        })();
    }, []);

    const addData = useCallback((data: LocationSnapshotData) => {
        setData(prevState => [data, ...prevState]);
    }, []);

    return (
        <Provider store={store}>
            <View style={styles.plotContainer}>
                <PlotComponent
                    velocityData={velocityData}
                    height={150}
                    currentMax={Math.max(...velocityData)}
                    average={calculateAverage(velocityData)}
                />
                <Button title={"Clear"} onPress={() => setData([])}/>
            </View>
        </Provider>
    );
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
        padding: 16,
    }
});
