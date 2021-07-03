//import liraries
import React, { Component, useState, useCallback, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, ActivityIndicator, TouchableOpacity, } from 'react-native';
import { Header, Item, Input, Container, Left, Right, ListItem, Thumbnail, Body, Modal } from "native-base"
import { Button } from "react-native-elements"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios"
import baseUrl from "../../assets/Common/baseUrl"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Color from "../../Constants/Colors"
import { ScrollView } from 'react-native';
import { Profiler } from 'react';
import { ObjectID } from "bson"
import AuthGlobal from '../../ContextAPI/store/AuthGlobal';

var { height, width } = Dimensions.get("window")

// create a component
const Products = ({ navigation }) => {
const context = useContext(AuthGlobal)  
  // const {naviagtion = props} 
    const [productList, setProductList] = useState()
    const [porductFilter, setPorductFilter] = useState()
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState()
    const [drugCount, setDrugCount] = useState(null)
    useFocusEffect(
        useCallback(
            () => {
                AsyncStorage.getItem("jwt")
                    .then((res) => {
                        setToken(res)
                    })
                    .catch((error) => console.log(error))

                axios
                    .get(`${baseUrl}products`)
                    .then((res) => {
                        const data = res.data;
                    // console.log(data)
                    const products = data.filter(
                        (drug)  => drug.userLocation._id === context.stateUser.user.userId
                      
                    );
                    console.log(products)
                        setProductList(products)
                        setPorductFilter(products)
                        setLoading(false)
                    })

                    axios
                    .get(`${baseUrl}get/count`)
                    .then((res)=>{
                        setDrugCount(res.data) 
                        // console.log(drugCount)               
                    })
                    .catch((error)=>{console.log(error)})

                return () => {
                    setProductList()
                    setPorductFilter()
                    setDrugCount()
                    setLoading(true)
                }
            },
            [],
        )
    )

    const searchProduct = (text) => {
        if (text == "") {
            setPorductFilter(productList)
        }
        setPorductFilter(
            productList.filter((e) =>
                e.name.toLowerCase().includes(text.toLowerCase())
            )
        )

    }

    const deleteProduct = (id) => {

        axios
            .delete(`${baseUrl}products/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                })
            .then((res) => {
                const products = productFilter.filter((item) => item.id !== id)
                setPorductFilter(products)
            })
            .catch((error) => console.log(error))

    }

   

    return (
        <Container>
            <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center", paddingHorizontal: 15, marginTop:10 }}>
                <Text>{drugCount} Products</Text>
                <Button
                    containerStyle={{ width: 70, margin: 5, justifyContent: "center" }}
                    buttonStyle={{ backgroundColor: Color.primary }}

                    title="  Add" onPress={() => navigation.navigate("AddProducts")}
                    
                    icon={<Icon name="plus" size={15} color={Color.secondary}
                        iconLeft
                    />}

                />

            </View>

            <Header searchBar rounded style={{ backgroundColor: "#FFF", borderRadius: 10, marginTop: 20, borderColor: Color.primary, borderWidth: 5, marginHorizontal: 20, }}>
                <Item>
                    <Icon name="search" />
                    <Input
                        // onFocus={turnFocusOn}
                        onChangeText={(text) => { searchProduct(text) }}
                        placeholder="Type here ..." />
                    {/* {focus == true? (<Icon onPress={turnFocusOff} name="close"/>):null} */}

                </Item>
            </Header>

            <View style={{ height: 10, borderBottomWidth: 3, borderRadius: 50, borderColor: Color.secondary }} />
            {loading ?
                (<View style={{
                    marginTop: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ActivityIndicator size="large" color={Color.primary} />
                </View>) : (
                    <ScrollView>
                        <FlatList
                            data={porductFilter}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item, index }) => (


                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingHorizontal: 20,
                                    marginTop: 10,
                                    marginHorizontal: 20,
                                    // marginHorizontal:10,
                                    backgroundColor: "#eff4f0",
                                    borderRadius: 10,
                                    height: width / 5.5,
                                    width: (width - width / 10),
                                }}>
                                    <TouchableOpacity onPress={() => navigation.navigate("DrugDetail", { item: item })}>

                                        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                            <Thumbnail source={{ uri: item.image }} />
                                            <Text style={{ paddingTop: 15 }}>

                                                {item.name.length > 10 ? item.name.substring(0, 10 - 3) + "..." : item.name}
                                            </Text>
                                            {/* <TouchableOpacity onPress={()=>{} }>
                                                <Icon
                                                    raised
                                                    name='trash'
                                                    type='font-awesome'
                                                    color="#CA0B00"
                                                    //{Color.primary}
                                                    style={{ backgroundColor: "#eff4f0", marginLeft: 30 }}
                                                />
                                            </TouchableOpacity> */}

                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ justifyContent: "space-between", }}>
                                        <Text style={{ paddingBottom: 10 }}>${item.price.toFixed(2)}</Text>

                                        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>

                                            <TouchableOpacity onPress={() => navigation.navigate("AddProducts",{item: item})}>
                                                <Icon
                                                    raised
                                                    name='edit'
                                                    type='font-awesome'
                                                    color={Color.primary}
                                                    //{Color.primary}
                                                    style={{ backgroundColor: "#eff4f0" }}
                                                />
                                            </TouchableOpacity>
                                            
                                            {/* {console.log(item._id)} */}

                                        </View>


                                    </View>
                                </View>

                            )}
                        />
                        <View style={{ height: 20, marginTop: 5 }} />
                    </ScrollView>

                )}


        </Container>
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

//make this component available to the app
export default Products;
