import {StyleSheet, View} from "react-native";
import React from "react";

export interface PickProps {
    velocity: number;
    speedMax: number;
    height: number;
}

const PlotPick = (props: PickProps) => {

    const calculatedHeight = calculateHeight(props.velocity, props.speedMax, props.height);

    return <View style={{...styles.pick, height: calculatedHeight}}/>
}

const styles = StyleSheet.create({
    pick: {
        width: 2,
        backgroundColor: 'blue',
        marginRight: 1,
    }
});

const calculateHeight = (v: number, vMax: number, h: number): number => {
    if(vMax === 0) {
        return h;
    }

    return (v/vMax) * h;
}

export default PlotPick;
