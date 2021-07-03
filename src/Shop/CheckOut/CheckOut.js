//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Button } from "react-native-elements"
import { Item } from "native-base"
// import {Picker} from '@react-native-picker/picker';
// import DropDownPicker from 'react-native-dropdown-picker';
import Icon from "react-native-vector-icons/FontAwesome";
import FormContainer from "../../Components/Form/formContainer"
import Input from "../../Components/Form/input"
import { Container, Text } from "native-base"
import { Image } from "react-native-elements"
import { Thumbnail } from "native-base"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Color from "../../../Constants/Colors"
import { Picker } from '@react-native-picker/picker';
import { connect } from "react-redux"
import pres from "../../../assets/images/images-removebg-preview.png"

import mime from "mime";
// import { Icon } from 'react-native-elements'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const countries = require("../../../data/120 countries.json")

// create a component
const CheckOut = (props) => {
    const [orderedItems, setOrderedItems] = useState();
    const [shippingAddress, setShippingAddress] = useState()
    const [city, setCity] = useState()
    const [zip, setZip] = useState()
    const [country, setCountry] = useState()
    const [phone, setPhone] = useState()
    const [prescription, setPrescription] = useState()



    useEffect(() => {
        setOrderedItems(props.cart)

        return () => {
            setOrderedItem()
        }
    }, [])


    // const checkOut = () => {
    //     let order = {
    //         city,
    //         country,
    //         dateOrdered: Date.now(),
    //         orderItems,
    //         phone,
    //         shippingAddress1: address,
    //         status: "3",
    //         user,
    //         zip,
    //     }

    //     props.navigation.navigate("Payment", {order: order })
    // }

    const checkOut = () => {

        const imageUri = "file:///" + prescription.split("file:/").join("");

        const prescriptionImage =  {
            uri: imageUri,
            type: mime.getType(imageUri),
            name: imageUri.split("/").pop()
        };
        let order = {
            city,
            country,
            dateOrdered: Date.now(),
            orderedItems,
            phone,
            shippingAddress,
            zip,
            prescriptionImage,
        }

        props.navigation.navigate("Payment", { order: order })
    }



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
                setPrescription(response.uri)
                // setMainImage(response.uri)

            }

        });
    };
    return (

        <Container>
            {props.cart.length ? (

                <KeyboardAwareScrollView
                    viewIsInsideTabBar={true}
                    extraHeight={200}
                    enableOnAndroid={true}

                >
                    <FormContainer title={"Shipping Address"}>

                        <View style={{ height: 30 }} />
                        <Input
                            placeholder={"Phone"}
                            name={"phone"}
                            value={phone}
                            keyboardType={"numeric"}
                            onChangeText={(text) => { setPhone(text) }}
                        />


                        <Input
                            placeholder={"Shipping Address"}
                            name={"shippingAdress"}
                            value={shippingAddress}
                            onChangeText={(text) => { setShippingAddress(text) }}
                        />

                        <Input
                            placeholder={"City"}
                            name={"city"}
                            value={city}
                            onChangeText={(text) => { setCity(text) }}
                        />

                        <Input
                            placeholder={"Zip"}
                            name={"zip"}
                            value={zip}
                            onChangeText={(text) => { setZip(text) }}
                        />
                        <View style={{
                            flexDirection: 'row',
                            width: "80%",
                            // justifyContent: "space-between",
                            backgroundColor: "white",
                            alignSelf: "center",
                            height: 60,

                            margin: 10,
                            // borderRadius: 20,
                            // borderWidth: 2,
                            // borderColor: Color.primary
                        }}>
                           
                            <View style={{ marginBottom: 15 }}>
                                <TouchableOpacity onPress={() => pickImage()} style={{
                                    position: "absolute",
                                    backgroundColor: Color.primary,
                                    padding: 8,
                                    borderRadius: 100,
                                    elevation: 20,
                                    bottom:-10
                                    // marginBottom:10
                                }}>
                                    {prescription?<Thumbnail source={{ uri: prescription }} />:<Icon style={{ color: "white" }} size={25} name="photo" />  }
                                    

                                    {/* <Icon style={{ color: "white" }} size={40} name="photo" /> */}
                                    {/* <Icon style={{ color: "white" }} size={25} name="photo" /> */}
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignSelf: "center",marginLeft:80 }}>
                                <TouchableOpacity onPress={() => { pickImage() }}>
                                    <Text style={{ color: "grey" }}>Prescription</Text>
                                </TouchableOpacity>

                            </View>


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
                            {/* <Picker
                                mode="dropdown"
                                iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select your Country"
                                selectedValue={pickerValue}
                                placeholderStyle={{ color: "#007aff" }}
                                placeholderIconColor="#007aff"
                                onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
                            >
                                {countries.map((c) => {
                                    return <Picker.Item key={c.id} label={c.name} value={c.id} />
                                })}
                            </Picker>
                             */}

                            <Picker


                                mode="dropdown"
                                iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select your Country"
                                selectedValue={country}
                                placeholderStyle={{ color: "#007aff" }}
                                placeholderIconColor="#007aff"
                                onValueChange={(e, i) => setCountry(e)}
                            >
                                {countries.map((c) => {
                                    return <Picker.Item
                                        key={c.code}
                                        label={c.name}
                                        value={c.name}
                                    />
                                })}
                            </Picker>
                        </View>
                        {/* <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
            style={{ width: ""}}
            selectedValue={country}
            placeholder="Select your country"
            placeholderStyle={{ color: '#007aff' }}
            placeholderIconColor="#007aff"
            onValueChange={(e, i) => setCountry(e)}
        >
            {countries.map((c) => {
                return <Picker.Item 
                        key={c.code} 
                        label={c.name}
                        value={c.name}
                        />
            })}
        </Picker> */}

                        {/* <DropDownPicker
            items={countries}
            defaultNull
            placeholder="Select your country"
            containerStyle={{ height: 40 }}
            onChangeItem={item => setCountry(item)}
        /> */}


                        {/* <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
    >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
    </Picker> */}
                        <View style={{ paddingHorizontal: "20%", justifyContent: "center" }}>
                            <Button
                                containerStyle={{ width: 200, margin: 5, justifyContent: "center" }}
                                buttonStyle={{ backgroundColor: Color.primary }}

                                title="Confirm" onPress={() => checkOut()} />
                        </View>

                    </FormContainer>

                </KeyboardAwareScrollView>
            ) :
                (
                    <Container style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text>  OOOPS!</Text>

                        <Text>
                            Looks Like your Cart is empty
         </Text>
                        <Text>Add a drug to your cart to get started</Text>
                    </Container>


                )}

        </Container>
    );
};


const mapStateToProps = (state) => {
    const { cart } = state;
    return {
        cart: cart
    }
}
// define your styles
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#2c3e50',
//     },
// });

//make this component available to the app
export default connect(mapStateToProps)(CheckOut);
