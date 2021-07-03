//import liraries
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Input, Button, Text } from "react-native-elements"
import { Colors } from 'react-native/Libraries/NewAppScreen'
import image from "../../assets/images/register.png"
import Color from "../../Constants/Colors"
import Error from "../../src/Components/Error"
import axios from "axios";
import baseUrl from "../../assets/Common/baseUrl"
import Toast from "react-native-toast-message"
import { Header, Body, Title } from "native-base"
import { Picker } from '@react-native-picker/picker';
import countries from "../../data/120 countries.json"
import Icon from "react-native-vector-icons/FontAwesome"
// create a component
const registrationRequest = ({ navigation }) => {
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [neighborhood, setNeighborhood] = useState("")
    const [street, setStreet] = useState("")
    const [license, setLicense] = useState("")
    const [zip, setZip] = useState("")
    const [createPassword, setCreatePassword] = useState("")
    const [availPharmacists, setAvailPharmacists] = useState("")

    const signUp = () => {


        if (name === "" || phone === "" || email === "" || country === "" || city==="" || neighborhood ===""|| street==="" || license ===""|| zip==="") {
            return setError("All fields are required")
        }

        let user = {

            name: name,
            email: email.trim(),
            country: country,
            phone: phone,
            createPassword: createPassword,
            city: city,
            neighborhood: neighborhood,
            street: street,
            licence: license,
            zip:zip,
            availPharmacists: availPharmacists
        };

        axios
            .post(`${baseUrl}registrationRequest/pharmacy`, user)
            .then((res) => {
                if (res.status === 200) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Registration Succeeded",
                        text2: "Please Login into your account",
                    });


                    setTimeout(() => {
                        navigation.navigate("Congrats", {item:user})
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
        
        <KeyboardAvoidingView >
            <Header style={{ backgroundColor: Color.secondary, }}>
                    <Body style={{alignItems:"center"}}>
                        <Title style={{ justifyContent: "center", color: "#000" }}> Register</Title>
                    </Body>

                </Header>
              {/* <Text h3> Sign Up
         </Text> */}
<ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          
            <Image source={image} style={styles.image} />



<View style={styles.inputContainer} >
                <Input
                    placeholder="Pharmacy Name"
                    value={name}
                    onChangeText={text => {
                        setName(text)
                    }}
                />

                <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={text => {
                        setEmail(text.toLowerCase())
                    }}
                />

                <Input
                    placeholder="Phone"
                    value={phone}
                    onChangeText={text => {
                        setPhone(text)
                    }}
                    keyboardType="numeric"
                />
                {/* <Input
                    placeholder="Country"
                    secureTextEntry
                    value={country}
                    onChangeText={text => {
                        setCountry(text)
                    }}
                // onSubmitEditing={signUp}
                /> */}


<View style={{
                    width: "100%", alignSelf: 'center', height: 60,
                    backgroundColor: "white",
                    margin: 10,
                    marginTop: 7,
                    borderRadius: 20,
                    // borderWidth: 2,
                    // borderColor: Color.primary
                    borderBottomWidth:1,
                    color: "grey",
                    borderBottomColor:"grey"
                  
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
                <Input
                    placeholder="City"
                  
                    value={city}
                    onChangeText={text => {
                        setCity(text)
                    }}
                // onSubmitEditing={signUp}
                />
                <Input
                    placeholder="Neighborhood"
                   
                    value={neighborhood}
                    onChangeText={text => {
                        setNeighborhood(text)
                    }}
                // onSubmitEditing={signUp}
                />
                <Input
                    placeholder="Street"
                    // secureTextEntry
                    value={street}
                    onChangeText={text => {
                        setStreet(text)
                    }}
                // onSubmitEditing={signUp}
                />
                <Input
                    placeholder="Zip"
                    // secureTextEntry
                    value={zip}
                    onChangeText={text => {
                        setZip(text)
                    }}
                // onSubmitEditing={signUp}
                />

<Input
                    placeholder="Available Pharmacists on duty"
                    // secureTextEntry
                    value={availPharmacists}
                    onChangeText={text => {
                        setAvailPharmacists(text)
                    }}
                    keyboardType="numeric"
                // onSubmitEditing={signUp}
                />
                <Input
                    placeholder="Licence ID"
                    // secureTextEntry
                    value={license}
                    onChangeText={text => {
                        setLicense(text)
                    }}
                // onSubmitEditing={signUp}
                />
                   <Input
                    placeholder="Create a Password"
                    secureTextEntry
                    value={createPassword}
                    onChangeText={text => {
                        setCreatePassword(text)
                    }}
                // onSubmitEditing={signUp}
                />
              
              
                


                {error ? <Error message={error} /> : null}

            </View>
            <Button
                title="Register"
                buttonStyle={{ backgroundColor: "#11d6cd" }}
                //    onPress = {() =>navigation.navigate("Navigator")}
                containerStyle={styles.button}
                onPress={() => signUp()}

            />
            <View style={{ flexDirection: "row" }}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("PharmaLogin")}><Text style={{ color: Color.primary }}> Login</Text></TouchableOpacity>
            </View>
            <View style={{height:100}}/>
</ScrollView>
            

            

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    container: {
        // flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        backgroundColor: "white"
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        margin: 5,
    },
    image: {
        width: 200,
        height: 100,
    }
})

//make this component available to the app
export default registrationRequest;
