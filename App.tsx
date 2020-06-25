import React from 'react';
import {Provider} from 'react-redux';
import {store} from "./store/store";
import * as TaskManager from 'expo-task-manager';
import {TrackSnapshot} from './store/tracks/track';
import HomeScreen from "./components/home/HomeScreen";


export default function App() {
    return (
        <Provider store={store}>
            <HomeScreen/>
        </Provider>
    );
}

TaskManager.defineTask('LocationFinder', ({data, error}) => {
    if (error) {
        return;
    }
    console.log('Received new locations', data);
    const {latitude, longitude, speed} = data.locations[0].coords;
    const snapshot: TrackSnapshot = {
        lon: longitude,
        lat: latitude,
        velocity: speed * 3.6,
        time: new Date()
    };

    store.dispatch({type: "newSnapshot", payload: snapshot});
});

