import {ScrollView, StyleSheet, Text, View} from "react-native";
import React from "react";
import PlotPick from "./PlotPick";
import uuid from "uuid";

export interface PlotComponentProps {
    velocityData: number[];
    height: number;
    currentMax: number;
    average: number;
}

const PlotComponent = (props: PlotComponentProps) => {
    const plot = props.velocityData.map((velocity: number) => {
        return <PlotPick key={uuid()} velocity={velocity} speedMax={props.currentMax} height={props.height}/>
    });

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
                <View style={styles.plotContainer}>
                    {plot}
                </View>
            </ScrollView>

            <View style={styles.statisticContainer}>
                <Text style={styles.statisticText}>Current speed: {Math.round(props.velocityData[0])} km/h</Text>
                <Text style={styles.statisticText}>Current max speed {Math.round(props.currentMax)} km/h</Text>
                <Text style={styles.statisticText}>Average {Math.round(props.average)} km/h</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    plotContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 10,
    },
    statisticContainer: {
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
    },
    statisticText: {
        fontSize: 20,
        marginTop: 10
    }
});

export default PlotComponent;
