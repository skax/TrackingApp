import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';


export interface CardParameters {
    changeScreen: any,
    timeBoundaries: {
        id: string,
        start: Date,
        end: Date
    }
}

const Card = (props: CardParameters) => {
    return (
        <View style={styles.container}>
            <TouchableNativeFeedback onPress={props.changeScreen}>
                <View style={styles.dates}>
                    <Text>Time starts:</Text><Text>{props.timeBoundaries.start.toString()}</Text>
                    <Text>Time ends:</Text><Text>{props.timeBoundaries.end.toString()}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

        marginBottom: 15,
        marginHorizontal: 10,
        borderWidth: 1,
        elevation: 2
    },
    dates: {
        padding: 10,
        
    }
});

export default Card;