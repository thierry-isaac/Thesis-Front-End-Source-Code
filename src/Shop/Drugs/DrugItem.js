//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import {Button, Icon} from "react-native-elements"
import Color from "../../../Constants/Colors"
import {connect} from "react-redux"
import * as actions from "../../../store/actions/cart"
import Toast from 'react-native-toast-message';

// create a component
const DrugItem = (props) => {
    const {name, price, image, onViewDetails  } = props
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onViewDetails}>
            <Image resizeMode="cover" style={styles.image} source={{uri: image}} />
        

            <View style={styles.titleContainer}>
                <Text style={{
                    fontWeight:"bold"
                }}>{name.length> 10? name.substring(0, 10-3)+ "...": name}</Text>
            </View>

            
            <View style={{justifyContent:"space-between", flexDirection: "row"}}>
                <Text style={styles.priceContainer}>
                        ${price}
                    </Text>
                    <Button 
                    onPress={()=>props.addDrugToCart(props,  Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: `${name} added to your cart`,
                        text2: "Go to your cart to complete the order",
                    }))} 
                    buttonStyle={{width: 60, height:30, borderRadius:5, marginRight:10, backgroundColor: Color.primary}}
                    icon={
                    <Icon
                    name="shopping-cart"
                    size={15}
                    color="white"
                    /> }
                    containerStyle={{color:Color.primary}}
                    
                    />
            </View>
            </TouchableOpacity>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height:250,
        elevation:2,
        backgroundColor:"#FFF",
        marginHorizontal:5,
        marginTop:20,
        borderRadius:15,
        marginBottom:10,
        width:150
    },
    titleContainer: {
        flexDirection:"row",
        // paddingTop:2,
     paddingHorizontal: 10
    },
    priceContainer:{
        paddingHorizontal:10,
        fontWeight:"bold",
        color:"#b1e5d3",
        paddingTop:3
    },
    image:{
        width: "100%",
        height: "75%"

    }
});

const mapDispatchToProps = (dispatch)=>{
    return {
        addDrugToCart: (drug)=> dispatch(actions.addToCart({quantity: 1, drug}))
    }
}

//make this component available to the app
export default connect(null, mapDispatchToProps)(DrugItem);
