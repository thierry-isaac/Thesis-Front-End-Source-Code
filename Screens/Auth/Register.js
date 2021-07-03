//import liraries
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Input, Button, Text } from "react-native-elements"
import { Colors } from 'react-native/Libraries/NewAppScreen'
import image from "../../assets/images/register.png"
import Color from "../../Constants/Colors"
import Error from "../../src/Components/Error"
import axios from "axios";
import baseUrl from "../../assets/Common/baseUrl"
import Toast from "react-native-toast-message"


// create a component
const Register = ({ navigation }) => {
    const [firstName, setFirstName] = useState("")
    const [error, setError] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const signIp = () => {


        if (firstName === "" || phone === "" || email === "" || password === "") {
            setError("All fields are required")
        }

        let user = {

            username: firstName,
            email: email.trim(),
            password: password,
            phone: phone,
            isAdmin: false,
            isPharmacy: false,
            onlyAdmin: false,
        };

        axios
            .post(`${baseUrl}users/register`, user)
            .then((res) => {
                if (res.status === 200) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Registration Succeeded",
                        text2: "Please Login into your account",
                    });


                    setTimeout(() => {
                        navigation.navigate("Login")
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
        <KeyboardAvoidingView style={styles.container}>

            <Text h3> Sign Up
         </Text>
            <Image source={image} style={styles.image} />

            <View style={styles.inputContainer}>
                <Input
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={text => {
                        setFirstName(text)
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
                <Input
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={text => {
                        setPassword(text)
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
                onPress={() => signIp()}

            />
            <View style={{ flexDirection: "row" }}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ color: Color.primary }}> Login</Text></TouchableOpacity>
            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
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
export default Register;
