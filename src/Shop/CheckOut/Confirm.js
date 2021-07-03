//import liraries
import React, { Component, useState, useContext } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { Text, Left, Right, ListItem, Thumbnail, Body, Container, Header, Content, Title } from 'native-base'
import { Button } from "react-native-elements"
import { connect } from 'react-redux'
import * as actions from "../../../store/actions/cart"
import Color from "../../../Constants/Colors"

import axios from "axios"
import baseUrl from "../../../assets/Common/baseUrl"
import Toast from "react-native-toast-message"
import AuthGlobal from '../../../ContextAPI/store/AuthGlobal';

var { width, height } = Dimensions.get("window");


// create a component
const Confirm = (props) => {
    const [user, setUser] = useState();
    const context = useContext(AuthGlobal)

    const confirm = props.route.params
    axios
    .get(`${baseUrl}users`)
    .then((x) => {
        const data = x.data;
        // console.log(data)
        data.filter(
            (info) => 
            {
                if(info._id === context.stateUser.user.userId){
            setUser(info._id)}}
        );
        ;
        // console.log(users);
        // console.log(categories)

    })
    .catch((error) => console.log(error))


    const confirmOrder = () => {
        let order = {
            orderedItems: confirm.order.order.orderedItems,
            shippingAddress: confirm.order.order.shippingAddress,
            city: confirm.order.order.city,
            zip: confirm.order.order.zip,
            country: confirm.order.order.country,
            phone: confirm.order.order.phone,
            // status: req.body.status,
            prescription:confirm.order.order.prescription,
            dateOrdered:confirm.order.order.dateOrdered,
            user: user,
        }
        // const order = confirm.order.order
        axios
        .post(`${baseUrl}orders`, order)
        .then((res)=>{
            if(res.status ==200 || res.status ==201){
                Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: "Order Completed",
                    text2: ""
                })
                setTimeout(() => {
                    props.clearCart();
                    props.navigation.navigate("Cart")
                }, 500)
            }
        })
        .catch((error)=>(
            console.log(error),
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Something went wrong",
                text2: "Try again, Please"
            })

        ))
       
    }

    // const confirm = props.route.params
    return (
        <View>

            <Header style={{ backgroundColor: Color.secondary }}>
                <Body style={{ alignItems: "center" }}>
                    <Title style={{ color: "#000" }}>Confirm Your Order</Title>
                </Body>
            </Header>

            {props.route.params ?
                (
                    //<Container>

                    <ScrollView>
                        <View style={{ borderWidth: 2, borderColor: Color.primary, width: "80%", alignSelf: "center", marginTop: 10, marginBottom:10 }}>


                            <View style={{ justifyContent: "center" }}>
                                <Text style={{ fontSize: 20, fontWeight: "bold", margin: 20, alignSelf: "center" }}>Items</Text>
                                {confirm.order.order.orderedItems.map((item) => {
                                    return (
                                        <ListItem avatar>

                                            <Left>
                                                <Thumbnail source={{ uri: item.drug.image }} />
                                            </Left>
                                            <Body style={{
                                                margin: 10,
                                                alignItems: 'center',
                                                flexDirection: 'row'
                                            }}>
                                                <Left>
                                                    <Text>{item.drug.name.length > 10 ? item.drug.name.substring(0, 10 - 3) + "..." : item.drug.name} 14</Text>
                                                </Left>
                                                <Right>
                                                    <Text>$ {item.drug.price.toFixed(2)}</Text>
                                                    <Text>{item.quantity}</Text>
                                                </Right>
                                            </Body>

                                        </ListItem>
                                    )
                                })}
                            </View>

                            <View>
                                <Text style={{ fontSize: 20, fontWeight: "bold", margin: 20, alignSelf: "center" }}>Shipping to</Text>

                                <ListItem >

                                    <Left>
                                        <Text>Address:</Text>
                                    </Left>
                                    <Body style={{
                                        margin: 10,
                                        alignItems: 'center',
                                        flexDirection: 'row'
                                    }}>
                                        <Right>
                                            <Text>{confirm.order.order.shippingAddress}</Text>
                                        </Right>
                                    </Body>

                                </ListItem>




                                <ListItem >

                                    <Left>
                                        <Text>City:</Text>
                                    </Left>
                                    <Body style={{
                                        margin: 10,
                                        alignItems: 'center',
                                        flexDirection: 'row'
                                    }}>
                                        <Right>
                                            <Text>{confirm.order.order.city}</Text>
                                        </Right>
                                    </Body>

                                </ListItem>




                                <ListItem >

                                    <Left>
                                        <Text>Zip:</Text>
                                    </Left>
                                    <Body style={{
                                        margin: 10,
                                        alignItems: 'center',
                                        flexDirection: 'row'
                                    }}>
                                        <Right>
                                            <Text>{confirm.order.order.zip}</Text>
                                        </Right>
                                    </Body>

                                </ListItem>

                                <ListItem >

                                    <Left>
                                        <Text>Phone:</Text>
                                    </Left>
                                    <Body style={{
                                        margin: 10,
                                        alignItems: 'center',
                                        flexDirection: 'row'
                                    }}>
                                        <Right>
                                            <Text>{confirm.order.order.phone}</Text>
                                        </Right>
                                    </Body>

                                </ListItem>

                                {/* <View style={{ alignSelf: "center", justifyContent: "center" }}>
                                <Text style={{ margin: 5 }}>
                                    Address: {confirm.order.order.shippingAddress}
                                </Text>
                                <Text style={{ margin: 5 }}>
                                    City: {confirm.order.order.city}
                                </Text>
                                <Text style={{ margin: 5 }}>
                                    Zip: {confirm.order.order.zip}
                                </Text>
                                <Text style={{ margin: 5 }}>
                                    Phone: {confirm.order.order.phone}
                                </Text>
                            </View> */}
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', margin: 20 }}>
                            <Button
                                containerStyle={{ width: 200, margin: 5, justifyContent: "center" }}
                                buttonStyle={{ backgroundColor: Color.primary }}

                                title={'Place order'} onPress={confirmOrder} />
                        </View>
                        <View style={{ height: 50 }} />
                    </ScrollView>


                ) : null}




        </View>


    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

const mapDispatchToProps = (dispatch) => {
    return {
        clearCart: () => dispatch(actions.clearCart())
    }
}


//make this component available to the app
export default connect(null, mapDispatchToProps)(Confirm);
