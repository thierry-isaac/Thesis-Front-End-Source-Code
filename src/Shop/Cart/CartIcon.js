//import liraries
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {Badge, Text} from "native-base"
import {connect} from "react-redux"
import Color from "../../../Constants/Colors"
// create a component
const CartIcon = (props) => {
    return (
        <View style={styles.container}>
            {props.cart.length?
           ( <Badge style={{width: 25, position:"absolute", flex: 1,justifyContent: "center", alignItems: "center", alignContent: "center", top: 0, right: -15, backgroundColor: Color.primary }}>
                <Text style={{fontSize: 12, width: 100, fontWeight: "bold"}}>
                    {props.cart.length}
                </Text>
            </Badge>) : null   
        }
        </View>
    );
};


const mapStateToProps = (state) => {
    const { cart } = state;
    return {
        cart: cart
    }
}
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default connect(mapStateToProps)(CartIcon);
