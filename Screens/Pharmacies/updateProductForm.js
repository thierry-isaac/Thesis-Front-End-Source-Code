//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput,Button } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { Item } from "native-base"
import Color from "../../Constants/Colors"

// import * as ImagePicker from 'expo-image-picker';
import Input from "../../src/Components/Form/input"
import Error from "../../src/Components/Error"
import Icon from "react-native-vector-icons/FontAwesome"
import Toast from "react-native-toast-message"
import AsyncStorage from "@react-native-async-storage/async-storage"
import baseURL from "../../assets/Common/baseUrl"
import axios from "axios"
import FormContainer from "../../src/Components/Form/formContainer"
// import mime from "mime";

// create a component
import baseUrl from "../../assets/Common/baseUrl"
const ProductForm = (props) => {


    const [pickerValue, setPickerValue] = useState();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [description, setDescription] = useState();
    const [image, setImage] = useState();
    const [mainImage, setMainImage] = useState();
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState();
    const [error, setError] = useState();
    const [countInStock, setCountInStock] = useState();
    const [userLocation, setUserLocation] = useState();
    const [item, setItem] = useState();

    // (props.route.params.item


    useEffect(() => {


        
        if(!props.route.params){
            setItem(null)
           
        }
        else{
            console.log(props.route.params)
            axios
            .get(`${baseUrl}categories`)
            .then((res) => setCategories(res.data))
            .catch((error) => { console.log(error) });

            setItem(props.route.params.item)
            setUserLocation(props.route.params.item.userLocation._id)
            setName(props.route.params.item.name)
            setPrice(props.route.params.item.price.toString())
            setCategory(props.route.params.category)
            setCountInStock(props.route.params.item.countInStock.toString())
            setImage(props.route.params.item.image)
            setMainImage(props.route.paramas.item.image)
            
        }
        
        // return () => {
        //     cleanup
        // }
    }, [])

    const pickImage = () => {
        // let result = await ImagePicker.launchImageLibraryAsync({
        //   mediaTypes: ImagePicker.MediaTypeOptions.All,
        //   allowsEditing: true,
        //   aspect: [4, 3],
        //   quality: 1,
        // });

        // console.log(result);

        // if (!result.cancelled) {
        //   setMainImage(result.uri)
        //   setImage(result.uri);
        // }
        const options = {
            storageOptions: {
                path: "image",
                mediaType: "photo",
                quality: 1,
                allowsEditing: "true",
                aspect: [4, 3],
            },
            // includeBase64: "true"
        };

        launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log("Image picker cancelled")
            }
            else if (response.error) {
                console.log(response.error)
            }
            else if (response.customButton) {
                console.log(response.customButton)
            }
            else {
                // const imageSource = {uri: response.base64}
                setImage(response.uri)
                setMainImage(response.uri)

            }

        });
    };

    return (
        <View>
            <FormContainer title={"Update Product"}>
            <View style={{
                    marginTop: 20,
                    width: 200,
                    height: 200,
                    borderStyle: "solid",
                    borderWidth: 8,
                    padding: 0,
                    justifyContent: "center",
                    borderRadius: 100,
                    borderColor: "#E0E0E0",
                    elevation: 10,
                    alignSelf: "center"
                }}>
                    <Image style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 100
                    }} source={{ uri: mainImage }} />
                    
                    <TouchableOpacity onPress={() => pickImage()} style={{
                        position: "absolute",
                        right: 5,
                        bottom: 5,
                        backgroundColor: "grey",
                        padding: 8,
                        borderRadius: 100,
                        elevation: 20
                    }}>
                        <Icon style={{ color: "white" }} name="photo" />
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={()=>pickImageFromGalery()} style={{
                        position: "absolute",
                        left: 50,
                        bottom: -50,
                        backgroundColor: "grey",
                        padding: 8,
                        borderRadius: 100,
                        elevation: 20,
                        flexDirection:"row",
                        justifyContent:"space-between",
                        width:70
                        
                    }}>
                        <Icon style={{ color: "white", marginTop:5 }} name="photo" />
                        <Text style={{color:"white", }}>Galery</Text>
                    </TouchableOpacity> */}

                </View>
            <View style={{ marginTop: 7, marginLeft: 50 }}>
                    <Text>Name</Text>
                </View>

                <Input
                    placeholder={"name"}
                    name="name"
                    value={name}
                    id={"name"}

                    onChangeText={(text) => setName(text)}
                // onFocus = {props.onFocus}
                // secureTextEntry = {props.secureTextEntry}
                // keyboardType= {props.keyboardType}
                />
                 <View style={{ marginTop: 7, marginLeft: 50 }}>
                    <Text>Price</Text>
                </View>


                <Input
                    placeholder={"price"}
                    name="price"
                    value={price}
                    id={"price"}

                    onChangeText={(text) => setPrice(text)}
                    // onFocus = {props.onFocus}
                    // secureTextEntry = {props.secureTextEntry}
                    keyboardType={"numeric"}
                />
                 <View style={{ marginTop: 7, marginLeft: 50 }}>
                    <Text>Quantity</Text>
                </View>


                <Input
                    placeholder={"Qantity"}
                    name="Qantity"
                    value={countInStock}

                    onChangeText={(text) => setCountInStock(text)}
                // onFocus = {props.onFocus}
                // secureTextEntry = {props.secureTextEntry}
                // keyboardType= {props.keyboardType}
                />

                <View style={{ marginTop: 7, marginLeft: 50 }}>
                    <Text>Description</Text>
                </View>

                <TextInput
                    style={{
                        width: "80%",
                        height: 100,
                        backgroundColor: "white",
                        margin: 10,
                        alignSelf: "center",
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: Color.primary
                    }}
                    placeholder={"Description"}
                    name="Description"
                    value={description}

                    onChangeText={(text) => setDescription(text)}
                // onFocus = {props.onFocus}
                // secureTextEntry = {props.secureTextEntry}
                // keyboardType= {props.keyboardType}
                />
                <View style={{ marginTop: 7, marginLeft: 50 }}>
                    <Text>Category</Text>
                </View>
                <View style={{
                    width: "80%", alignSelf: 'center', height: 60,
                    backgroundColor: "white",
                    margin: 10,
                    marginTop: 7,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: Color.primary
                }}>

                    <Picker

                        mode="dropdown"
                        iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select your Category"
                        selectedValue={pickerValue}
                        placeholderStyle={{ color: "#007aff" }}
                        placeholderIconColor="#007aff"
                        onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
                    >
                        {categories.map((c) => {
                            return <Picker.Item key={c.id} label={c.name} value={c.id} />
                        })}
                    </Picker>
                </View>
                {error ? <Error massage={error} /> : null}

                <View style={{ marginTop: 10, alignSelf: 'center' }}>

                    <Button

                        containerStyle={{ width: 200, margin: 5, justifyContent: "center" }}
                        buttonStyle={{ backgroundColor: Color.primary }}
                        title={"Confirm"}
                        onPress={() => addProduct()} />
                </View>
                <View style={{ height: 150 }} />

            </FormContainer>
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

//make this component available to the app
export default ProductForm;
