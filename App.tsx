import React, {useCallback, useEffect, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import * as Location from 'expo-location';
import PlotComponent from "./components/plot/PlotComponent";
import {Provider, useSelector} from 'react-redux';
import {store, State} from "./store/store";
import * as TaskManager from 'expo-task-manager';
import { TrackSnapshot } from './store/tracks/track';
import {TrackModel} from './store/tracks/reducers/tracksReducer';

export interface LocationSnapshotData {
    lon: number;
    lat: number;
    velocity: number;
}
//chuj
export default function App() {
    const [data, setData] = useState<LocationSnapshotData[]>([]);
    const track = useSelector<State, TrackModel>(state => state.track);
   // const velocityData: number[] = data.map(item => item.velocity);
   

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestPermissionsAsync();

            // let location = await Location.startLocationUpdatesAsync("TASK_NAME", {
            //     accuracy: Location.Accuracy.High,
            //     timeInterval: 2000,
            // });

            await Location.startLocationUpdatesAsync('LocationFinder',
            {   
                accuracy: Location.Accuracy.High, 
                timeInterval: 1000, 
                /*foregroundService: {
                    notificationTitle: 'string1',
                    notificationBody: 'string2'} */
            });

            // return () => {
            //     Location.stopLocationUpdatesAsync("TASK_NAME");
            // }
        })();
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

TaskManager.defineTask('LocationFinder', ({ data, error }) => {
    if (error) {
      return;
    }
    console.log('Received new locations', data);
    const { latitude, longitude, speed } = data.locations[0].coords;
    const snapshot: TrackSnapshot = {
        lon: longitude,
        lat: latitude,
        velocity: speed,
        time: new Date()
    };

    store.dispatch({type: "newSnapshot", payload: snapshot});
  });

const styles = StyleSheet.create({
    plotContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    }
});
