//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Button } from 'react-native';
import { Left, Right, Text, ListItem, Thumbnail, Body, H1, Conatainer, Container, Header,Title } from "native-base"
import * as actions from "../../../store/actions/cart"
import Color from "../../../Constants/Colors"
import { Icon } from 'react-native-elements'
var { width } = Dimensions.get("window")

import { connect } from "react-redux"
// create a component
const Cart = (props) => {

    // const {navigation} = props

    var totalPrice = 0;
    props.cart.forEach(cart => {
        return (
            totalPrice += cart.drug.price
        )

    });
    return (
        <Container>
            {
                props.cart.length ?
                    (
                        // <Container>
                        //     <H1 style={{ alignSelf: "center" }}> Cart</H1>
                        //     {props.cart.map(item => {
                        //         return (
                        //             <ListItem
                        //                 avatar
                        //                 key={Math.random()}
                        //                 style={{alignItems:"center", justifyContent: "cebter"}}
                        //             >
                        //                 <Left>
                        //                     <Thumbnail source={{ uri: item.drug.image
                        //                     //? item.drug.image: .....
                        //                     }} />
                        //                 </Left>

                        //                 <Body style={{margin: 10, alignItems:"center", flexDirection: "row"}}>
                        //                     <Left>
                        //                             <Text>
                        //                         {item.drug.name}
                        //                     </Text>
                        //                     </Left>
                        //                     <Right>
                        //                         <Text>
                        //                            $ {item.drug.price}
                        //                         </Text>
                        //                     </Right>
                        //                 </Body>

                        //             </ListItem>

                        //         )
                        //     })}
                        // </Container>


                        <View style={{flex:1}}>

                            <Header  style={{backgroundColor:Color.secondary}}>
                                <Body style={{alignItems:"center"}}>  
                                <Title style={{color:"#000"}}> Cart</Title>
                                </Body>
                            
                            </Header>
                            

                            <View style={{
                                //   backgroundColor: "#eff4f0",
                                height: "15%",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: 20,
                                borderBottomWidth:2,
                                borderBottomColor: Color.secondary,
                                borderTopColor: Color.secondary,
                                // borderLeftWidth:3,
                                // borderRightWidth:3,
                                borderRadius: 15,

                            }}>
                            
                                <Left>
                                    <Text style={{ color: Color.primary }}>${totalPrice.toFixed(2)}</Text>
                                </Left>

                                <Right>
                                    <Button title="Clear" color="#CA0B00" onPress={() => props.ClearCart()} />
                                </Right>
                                {/* <Right>
                                    <Button title="CheckOut" color={Color.primary} onPress={()=> props.navigation.navigate(" Checkout")} />
                                </Right> */}

                                {/* 
                                    <View><Text style={{color: "red"}}>${totalPrice}</Text></View>
                                    <View style={{flexDirection: "row", justifyContent:"space-between" }}>  <Button title="Clear" />  <Button title="CheckOut" color={Color.primary} /></View>
                         */}
                            </View>

                            

                            <ScrollView 
                            constentContainerStyle={{justifyContent:"center"}}
                            showsVerticalScrollIndicator={false}>
                                
                                {props.cart.map(item => {
                                    return (

                                        
                                        <View style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            paddingHorizontal: 20,
                                            marginTop: 10,
                                            marginHorizontal:20,
                                            // marginHorizontal:10,
                                            backgroundColor: "#eff4f0",
                                            borderRadius: 10,
                                            height: width / 5,
                                            width: (width - width / 10)

                                        }}>

                                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                                <Thumbnail source={{ uri: item.drug.image }} />
                                                <Text style={{ paddingTop: 15 }}>
                                                    
                                                {item.drug.name.length> 10? item.drug.name.substring(0, 10-3)+ "...": item.drug.name}
                                                    </Text>

                                            </View>
                                            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                                <Text style={{ paddingTop: 20, marginRight:10 }}>${item.drug.price.toFixed(2)}</Text>
                                                <TouchableOpacity onPress={()=>props.removeItem(item)}>
                                                    <Icon
                                                        raised
                                                        name='trash'
                                                        type='font-awesome'
                                                        color="#CA0B00"
                                                        //{Color.primary}
                                                        style={{backgroundColor:"#eff4f0"}}
                                                    />
                                                </TouchableOpacity>
                                                

                                            </View>

                                        </View>
                                        

                                    )
                                })}
                                <View style={{height:15}}/>
                            </ScrollView>

                        </View>

                        //
                    ) :
                    (
                        <Container style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                           <Text>  OOOPS!</Text>
                           
                            <Text>
                              Looks Like your Cart is empty
                    </Text>
                            <Text>Add a drug to your cart to get started</Text>
                        </Container>
                    )
            }
        </Container>
        // <View style={styles.container}>
        //    {props.cart.map(item=>{
        //        return (<Text>{item.drug.name}</Text>)
        //    })}
        // </View>
    );
};

const mapStateToProps = (state) => {
    const { cart } = state;
    return {
        cart: cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ClearCart: () => dispatch(actions.clearCart()),
        removeItem: (drug)=>dispatch(actions.removeFromCart(drug))
    }
}
// define your styles
const styles = StyleSheet.create({
    container: {
        width: width / 2 - 20,
        height: width / 1.7
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});




//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
