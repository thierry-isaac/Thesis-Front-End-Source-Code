//import liraries
import React, { Component, useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { Button } from "react-native-elements"
import { Item } from "native-base"
import baseUrl from "../../assets/Common/baseUrl"
// import * as ImagePicker from 'expo-image-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import Input from "../../src/Components/Form/input"
import Error from "../../src/Components/Error"
import Icon from "react-native-vector-icons/FontAwesome"
import Toast from "react-native-toast-message"
import AsyncStorage from "@react-native-async-storage/async-storage"

import axios from "axios"
import FormContainer from "../../src/Components/Form/formContainer"
import { TextInput } from 'react-native';
import Color from "../../Constants/Colors"
import AuthGlobal from "../../ContextAPI/store/AuthGlobal"
import countries from "../../data/120 countries.json"


// create a component
const AddPharmacy = ({navigation, route}) => {
    // const [item, setItem] = useState()

    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [password, setPassword] = useState("")
    const [neghborhood, setNeghborhood] = useState("")
    const [street, setStreet] = useState("")
    const [zip, setZip] = useState("")
    const [error, setError] = useState("")

// useEffect(() => {
//     if(route.params){
//     setItem(route.params)
//     setUserName(item.item.name)
//     setEmail(item.item.email)
//     setPhone(item.item.phone)
//     setCity(item.item.city)
//     setCountry(item.item.country)
//     setPassword(item.item.createPassword)



//     console.log(phone)
//     }
//     return () => {
//         setUserName()
//     }
// }, [])
   

    const addPharma = () => {
        if (userName === "" ||
            phone === "" ||
            email === "" ||
            password === "" ||
            country === "" ||
            city === "" ||
            neghborhood === "" ||
            street === "" ||
            zip === "") 
            {
            return setError("All fields are required")
        }

    //   const  isAdmin = true
    //    const isPharmacy = true

    //     let formData = new FormData();

    //     formData.append("username", userName);
    //     formData.append("phone", phone);
        // formData.append("price", price);
        // formData.append("email", email.trim());
        // formData.append("password", password);
        // formData.append("country", country);     
        // formData.append("city", city);
        // formData.append("neghborhood", neghborhood);
        // formData.append("street", street);
        // formData.append("zip", zip);
        // formData.append("isAdmin", isAdmin);
        // formData.append("isPharmacy", isPharmacy);

        
        let user = {
            username: userName,
            email: email.trim(),
            password: password,
            phone: phone,
            isAdmin: true,
            isPharmacy: true,
            city: city,
            zip: zip,
            street: street,
            country: country,
            neghborhood: neghborhood,
            

        };

        axios
            .post(`${baseUrl}users/register`, user)
            .then((res) => {
                if  (res.status == 200 || res.status == 201)  {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Registration Succeeded",
                        text2: `${userName} has been registred`,
                    });


                    setTimeout(() => {
                        navigation.goBack()
                    }, 500)
                }
            })
            .catch((error) => {

                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again",
                });

            })

    }



    return (
        <View >
            <FormContainer title={"Register Pharmacy"}>
                <View style={{ height: 50 }} />
                <View style={{ marginTop: 7, marginLeft: 50 }}>
                    <Text>Pharmacy Name</Text>
                </View>
                <Input
                    placeholder="Pharmacy Name"
                    value={userName}
                    onChangeText={(text) => setUserName(text)}
                    id={"username"}
                />
                <View style={{ marginTop: 7, marginLeft: 50 }}>
                    <Text>Email</Text>
                </View>
                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text.toLowerCase())}
                    id={"email"}
                />

                <View style={{ marginTop: 7, marginLeft: 50 }}>
                    <Text>Phone</Text>
                </View>
                <Input
                    placeholder="Phone"
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    id={"Phone"}
                    keyboardType={"numeric"}
                />

                <View style={{ marginTop: 7, marginLeft: 50 }}>
                    <Text>City</Text>
                </View>
                <Input
                    placeholder="City"
                    value={city}
                    onChangeText={(text) => setCity(text)}
                    id={"city"}
                />
                <View style={{ marginTop: 7, marginLeft: 50 }}>
                    <Text>Country</Text>
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
                <View style={{ marginTop: 7, marginLeft: 50 }}>
                    <Text>Zip</Text>
                </View>
                <Input
                    placeholder="Zip"
                    value={zip}
                    onChangeText={(text) => setZip(text)}
                    id={"zip"}
                />
                <View style={{ marginTop: 7, marginLeft: 50 }}>
                    <Text>Street</Text>
                </View>
                <Input
                    placeholder="Steet"
                    value={street}
                    onChangeText={(text) => setStreet(text)}
                    id={"street"}
                />
                <View style={{ marginTop: 7, marginLeft: 50 }}>
                    <Text>Neghborhood</Text>
                </View>
                <Input
                    placeholder="Neghborhood"
                    value={neghborhood}
                    onChangeText={(text) => setNeghborhood(text)}
                    id={"neghborhood"}
                />
                <View style={{ marginTop: 7, marginLeft: 50 }}>
                    <Text>Password</Text>
                </View>
                <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    id={"password"}
                />
                  {error!=="" ? <Error message={error} /> : null}
                <View style={{ marginTop: 10, alignSelf: 'center' }}>

                    <Button

                        containerStyle={{ width: 200, margin: 5, justifyContent: "center" }}
                        buttonStyle={{ backgroundColor: Color.primary }}
                        title={"Register"}
                        onPress={() => addPharma()} />
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
export default AddPharmacy;
