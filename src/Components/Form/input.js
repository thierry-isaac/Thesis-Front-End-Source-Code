//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Color from  "../../../Constants/Colors"

// create a component
const Input = (props) => {
    return (
        <View style={{justifyContent: "center", alignItems: "center"}}>

            <TextInput
       style={styles.container}
       placeholder={props.placeholder}
       name={props.name}
       id = {props.id}
       value={props.value}
       autoCorrect = {props.autoCorrect}
       onChangeText = {props.onChangeText}
       onFocus = {props.onFocus}
       secureTextEntry = {props.secureTextEntry}
       keyboardType= {props.keyboardType}
       
       
       ></TextInput>
        </View>
       
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: "80%",
        height: 60,
        backgroundColor: "white",
        margin:10,
        borderRadius: 20,
        borderWidth:2,
        borderColor: Color.primary
    },
});

//make this component available to the app
export default Input;
