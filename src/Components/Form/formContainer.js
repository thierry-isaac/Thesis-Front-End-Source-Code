//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Header, Body, Title } from "native-base"
import Color from "../../../Constants/Colors"
var { width } = Dimensions.get("window")
// create a component
const FormContainer = (props) => {
    return (
        <View>
            <Header style={{ backgroundColor: Color.secondary, }}>
                    <Body style={{alignItems:"center"}}>
                        <Title style={{ justifyContent: "center", color: "#000" }}> {props.title}</Title>
                    </Body>

                </Header>
            <ScrollView constentContainerStyle={styles.container}>
                {props.children}
            </ScrollView>
        </View>

    );
};

// define your styles
const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
        marginTop: 30,
        marginBottom: 400,
        width: width,

    },
    title: {
        marginHorizontal: 50,
        fontSize: 30,
    }
});

//make this component available to the app
export default FormContainer;
