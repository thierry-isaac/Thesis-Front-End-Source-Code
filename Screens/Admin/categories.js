//import liraries
import React, { Component, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { Button } from "react-native-elements"
import Input from "../../src/Components/Form/input"
import Form from "../../src/Components/Form/formContainer"
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Item } from "native-base"
import Color from "../../Constants/Colors"
import baseUrl from "../../assets/Common/baseUrl"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import axios from "axios"
// import Icon from "react-native-vector-icons/FontAwesome"
import Toast from "react-native-toast-message"
import Error from "../../src/Components/Error"

var { height, width } = Dimensions.get("window")
// create a component
const Categories = (props) => {
    const [categoryFilter, setCategoryFilter] = useState()
    const [categoryList, setCategoryList] = useState()
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState()
    const [catId, setCatId] = useState()
    const [categoryName, setCategoryName] = useState("")
    const [categories, setCategories] = useState()
    const [error, setError] = useState("")


    useEffect(() => {


        AsyncStorage.getItem("jwt")
            .then((res) => {
                setToken(res)
            })
            .catch((error) => console.log(error))

        axios
            .get(`${baseUrl}categories`)
            .then((res) => {
                setCategories(res.data)
                // setCategoryFilter(res.data)
                setLoading(false)
                // console.log(res.data)
            })
        return () => {
            // setCategoryList()
            // setCategoryFilter()
            setCategories()
            setLoading(true)
        }
    },
        [],
    )

    const addCategory = () => {
        // let formData = new FormData();
        // formData.append("name", category);
        // const config = {
        //     headers: {
        //         "Content-Type": "multipart/form-data",
        //         Authorization: `Bearer ${token}`
        //     }}

        //     axios
        //     .post(`${baseUrl}categories`, formData, config)
        //     .then((res) => {
        //         if (res.status == 200 || res.status == 201) {
        //             Toast.show({
        //                 topOffset: 60,
        //                 type: "success",
        //                 text1: "New Category added",
        //                 text2: ""
        //             });
        //             setTimeout(() => {
        //                setCategoryFilter(res.data)
        //                setCategoryList(res.data)
        //             }, 500)
        //         }
        //     })
        //     .catch((error) => {
        //         Toast.show({
        //             topOffset: 60,
        //             type: "error",
        //             text1: "Something went wrong",
        //             text2: "Please try again"
        //         }),
        //             console.log(error)
        //     })
        if( categoryName === ""){
           return setError("Please fill in the name")
        }

        const category = {
            name: categoryName
        };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        axios
            .post(`${baseUrl}categories`, category, config)
            .then((res) => {

                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Category Successfully Created",
                        text2: ""
                    });
                    setCategories([...categories, res.data])
                    console.log(categories)
                }
            })
            .catch((error) => { alert("Error to load categories"), console.log(error) });

        setCategoryName("");
    }

    const deleteCategory = (item) => {
        // setCatId(item)

        axios
            .delete(`${baseUrl}categories/${item}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                })
            .then((res) => {


                if (res.status == 200 || res.status == 201) {
                    const category = categoryFilter.filter((item) => item.id !== catId)
                    // setPorductFilter(category)
                    setTimeout(() => {
                        setCategoryFilter(category)
                        setCategoryList(category)
                    }, 500)
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Category Successfully Deleted",
                        text2: ""
                    });
                
                }
               
                
            })
            .catch((error) => console.log(error))

    }
    return (
        <Container >
            {/* <Form> */}
            <View style={styles.container}>
                {/* <Header searchBar rounded style={{ backgroundColor: "#FFF", borderRadius: 10,  height:45,borderColor: Color.primary, borderWidth: 5, width:250 }}>
                <View style={styles.container}> */}

                <TextInput
                    style={{
                        width: "80%",
                        height: 50,
                        backgroundColor: "white",
                        margin: 10,
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: Color.primary
                    }}
                    value={categoryName}
                    onChangeText={(text) => setCategoryName(text)}
                    placeholder={"Add Category"}
                />

                {/* </View> */}
                {/* </Header> */}
                {/* </Form> */}
                
                <Button
                    //  buttonStyle={{borderColor: "#11d6cd"}}
                    containerStyle={{ width: "16%", margin: 5, justifyContent: "center" }}
                    buttonStyle={{ borderRadius: 10, backgroundColor: Color.primary, }}
                    //    type="outline"
                    //    titleStyle={{color: "#11d6cd"}}
                    onPress={() => addCategory()}
                    title={"Add"} />

            </View>
            {error? (<Error message={error} />): null}
            <View>
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
                                data={categories}
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
                                            {/* <Thumbnail source={{ uri: item.icon }} /> */}
                                            <Text style={{ paddingTop: 15 }}>
                                                {item.name.length > 10 ? item.name.substring(0, 20 - 3) + "..." : item.name}
                                            </Text>

                                        </View>
                                        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>

                                            <TouchableOpacity onPress={() => deleteCategory(item._id)}>
                                                {/* {console.log(item.id)} */}
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
                            <View style={{ height: 150, marginTop: 5 }} />
                        </ScrollView>

                    )}

            </View>

        </Container>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
        // width:"80%",
        margin: 30
    },
});

//make this component available to the app
export default Categories;
