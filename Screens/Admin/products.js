//import liraries
import React, { Component, useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Header, Item, Input, Container, Left, Right, ListItem, Thumbnail, Body, } from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios"
import baseUrl from "../../assets/Common/baseUrl"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Color from "../../Constants/Colors"
import { ScrollView } from 'react-native';
var { height, width } = Dimensions.get("window")

// create a component
const Products = () => {
    const [productList, setProductList] = useState()
    const [porductFilter, setPorductFilter] = useState()
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState()

    // useFocusEffect(
    useEffect(
        () => {
            AsyncStorage.getItem("jwt")
                .then((res) => {
                    setToken(res)
                })
                .catch((error) => console.log(error))

            axios
                .get(`${baseUrl}products`)
                .then((res) => {
                    setProductList(res.data)
                    setPorductFilter(res.data)
                    setLoading(false)
                })
            return () => {
                setProductList()
                setPorductFilter()
                setLoading(true)
            }
        },
        [],
    )
    // )

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


    return (
        <Container>

            <Header searchBar rounded style={{ backgroundColor: "#FFF", borderRadius: 10, marginTop: 40, borderColor: Color.primary, borderWidth: 5, marginHorizontal: 20, }}>
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
            {loading == true ?
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

                                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                        <Thumbnail source={{ uri: item.image }} />
                                        <View>
                                            <Text style={{ paddingTop: 10 }}>

                                                {item.name.length > 15 ? item.name.substring(0, 10 - 3) + "..." : item.name}
                                            </Text>
                                            <Text style={{ padding: 5, color:Color.primary }}>

                                                {item.category.name}
                                            </Text>
                                        </View>



                                    </View>
                                    <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                        <Text style={{ paddingTop: 20, marginRight: 10 }}>${item.price.toFixed(2)}</Text>
                                        <TouchableOpacity onPress={() => { }}>
                                            <Icon
                                                raised
                                                name='trash'
                                                type='font-awesome'
                                                color="#CA0B00"
                                                //{Color.primary}
                                                style={{ backgroundColor: "#eff4f0" }}
                                            />
                                        </TouchableOpacity>


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
