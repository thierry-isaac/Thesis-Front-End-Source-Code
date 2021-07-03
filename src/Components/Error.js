//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Error = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.message}</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width:"100%",
        alignItems:"center",
        margin:0,
    },
    text:{
        color: "red"
    }
});

//make this component available to the app
export default Error;
