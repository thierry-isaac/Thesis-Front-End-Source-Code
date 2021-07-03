//import liraries
import React, { Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Button } from 'react-native';
import Color from "../../../Constants/Colors"
import {connect} from "react-redux"
import * as actions from "../../../store/actions/cart"
import Toast from 'react-native-toast-message';

// create a component
const DrugDetail = (props) => {

    const [item, setIem] = useState(props.route.params.item)
    const [availability, setAvailability] = useState("")
    const [color, setColor] = useState("")

  useEffect(() => {
   
        if(props.route.params.item.countInStock ==0){
          setAvailability("Unavailable")
          setColor("#2dc937")
        }
        else if(props.route.params.item.countInStock <=10){
          setAvailability("Limited")
          setColor("#db7b2b")
        }
        else{
          setAvailability("Available")
          setColor(Color.primary)
        }

    return () => {
      setAvailability()
    }
  }, [])


    return (
        <ScrollView style={styles.container}>
             <Image style={styles.image} source={{ uri: item.image }} />
             
      <View style={styles.actions}>
        <View style={{justifyContent:"space-between", flexDirection:"row", paddingVertical:20}}><Text style={{color: '#888',}}>Availabilty: </Text><Text style={{color:color}}>{availability}</Text></View>
                
        <Button color={Color.primary} title="Add to Cart" onPress={() =>
           props.addDrugToCart(props.route.params.item,
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: `${item.name} added to your cart`,
              text2: "Go to your cart to complete the order",
          })
            )
           
           
           } />
           
      </View>
     
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <Text style={{ fontSize: 16,textAlign: 'center',marginHorizontal: 20}}>{item.name.toUpperCase()}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={{padding:50}}>
      <Text>Country: {item.userLocation.country}</Text>
      <Text>Pharmacy Located at: {item.userLocation.neghborhood}, {item.userLocation.street}</Text>
      </View>
      
        </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
      },
      actions: {
        marginVertical: 10,
        alignItems: 'center'
      },
      price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
      },
      description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
      }
});

const mapDispatchToProps = (dispatch)=>{
  return {
      addDrugToCart: (drug)=> dispatch(actions.addToCart({quantity: 1, drug}))
  }
}

//make this component available to the app
export default connect(null, mapDispatchToProps)(DrugDetail);
