import React from "react";
import { StyleSheet, View, Dimensions, FlatList } from "react-native";
import Card from '../../components/UI/Card';
import {useSelector} from "react-redux";
import {State, store} from "../../store/store";
import {TracksModel} from "../../store/tracks/reducers/tracksReducer";
import {Track, TrackSnapshot, TimeData} from '../../store/tracks/track';


const TracksScreen = (props: any) => {

    const tracks: Track[] = useSelector<State, Track[]>(state => state.track.finishedTracks);
    const filteredTracks: Track[] = tracks.map((item: Track) => item).filter(item => item.status === 2 && item.snapshots.length > 0);
    const timeData: TimeData[] = filteredTracks.map((item: Track) => {return { id: item.id.toString(),  start: item.snapshots[0].time, end: item.snapshots[item.snapshots.length-1].time }})

    const changeScreen = (screenId: string) => {
        props.navigation.navigate({routeName: 'Detail', params: {id: screenId}});
    }
    
    const cardHandler = (timeData: any) => {
        return (
            <Card timeBoundaries={timeData.item} changeScreen={() => changeScreen(timeData.item.id)}/>
        )
    };

    return (
        <View style={styles.plotContainer}>
            <View>
                <FlatList keyExtractor={(item,index) => item.id} data={timeData} renderItem={cardHandler}/>

            </View>
        </View>
    );
}

TracksScreen.navigationOptions = {
    headerTitle: 'Tracks'
}

const styles = StyleSheet.create({
    plotContainer: {
        padding: 10,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
    },
});

export default TracksScreen;
