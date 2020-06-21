import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {LocationSnapshotData} from "../App";

export interface LocalizationSnapshotComponentProps {
    data: LocationSnapshotData;
}

const LocalizationSnapshotComponent = (props: LocalizationSnapshotComponentProps) => {

    return (
        <View style={styles.plotContainer}>
            <Text style={styles.text}>Longitude: {props.data.lon}</Text>
            <Text style={styles.text}>Latitude: {props.data.lat}</Text>
            <Text style={styles.text}>Velocity: {props.data.velocity} km/h</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    plotContainer: {
        width: '100%',
        backgroundColor: '#F7C0BE',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold"
    }
});

export default LocalizationSnapshotComponent;
