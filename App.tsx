import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {store} from "./store/store";
import * as TaskManager from 'expo-task-manager';
import * as Location from "expo-location";
import {TrackSnapshot} from './store/tracks/track';
import HomeScreen from "./components/home/HomeScreen";
import { enableScreens } from 'react-native-screens';
import {pushNewSnapshot} from "./store/tracks/actions/tracksActions";
import TrackingNavigator from './navigation/TrackingNavigator';


export default function App() {

    enableScreens();

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestPermissionsAsync();
            if (status === 'granted') {
                await Location.startLocationUpdatesAsync('LocationFinder',
                    {
                        accuracy: Location.Accuracy.High,
                        timeInterval: 1000,
                        foregroundService: {
                            notificationTitle: 'Your title',
                            notificationBody: 'Notification Body'
                        },
                        pausesUpdatesAutomatically: false,

                    });

                return () => {
                    Location.stopLocationUpdatesAsync("LocationFinder");
                }
            }
        })();
    }, []);

    return (
        <Provider store={store}>
            <TrackingNavigator/>
        </Provider>
    );
}

TaskManager.defineTask('LocationFinder', ({data, error}) => {
    if (error) {
        return;
    }
    console.log(data);
    const {latitude, longitude, speed} = data.locations[0].coords;
    const snapshot: TrackSnapshot = {
        lon: longitude,
        lat: latitude,
        velocity: speed * 3.6,
        time: new Date()
    };
    store.dispatch(pushNewSnapshot(snapshot));
});

