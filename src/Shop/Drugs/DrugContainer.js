import React, { useContext, useEffect, useState } from 'react'
import { View, ImageBackground, StyleSheet } from 'react-native'
import { Text } from "react-native-elements"
import { TextInput, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Image } from "react-native-elements"
import Color from "../../../Constants/Colors"
import DrugList from './DrugList'
import AuthGlobal from '../../../ContextAPI/store/AuthGlobal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import baseUrl from "../../../assets/Common/baseUrl"

const DrugContainer = ({ navigation }) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()

    useEffect(() => {
        if (
            context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null
        ) {
            navigation.navigate("Login")
        }
        else {
            AsyncStorage.getItem("jwt")
                .then((res) => {
                    // console.log(context.stateUser.user.userId)
                    const uid = context.stateUser.user.userId
                    axios
                        .get(`${baseUrl}users/${uid}`, {
                            headers: { Authorization: `Bearer ${res}` },
                        })
                        .then((user) =>
                            // console.log(user.data),
                            setUserProfile(user.data))
                })
        }
        return () => {
            setUserProfile()
        }
    }, [context.stateUser.isAuthenticated])

    return (


        <View style={{
            backgroundColor: "#FFF",
            flex: 1
        }}>
            <View style={{
                backgroundColor: Color.primary,
                height: "18%",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                justifyContent: "center",
                //    alignItems:"center",

                padding: 20
            }}>



                <Image source={require("../../../assets/images/startscreen.png")} style={{
                    height: 60,
                    width: 80,
                    alignSelf: "center",
                    // marginBottom: 100,
                    // marginLeft:20
                    justifyContent: "center"

                }} />

                <View style={{
                    position: "absolute",
                    right: 30,
                    top: 35,
                    backgroundColor: Color.secondary,
                    marginLeft: 28,
                    borderRadius: 100,
                    elevation: 20,
                    padding: 5,
                    

                }}>
                      <View style={{
                    position: "absolute",
                    right: -5,
                    top: -3,
                    backgroundColor: "#5fdba7",
                    marginLeft: 28,
                    borderRadius: 100,
                    elevation: 20,
                    padding: 7

                }}/>
                    <Text> {userProfile ? userProfile.username : "User"} </Text>

                </View>
            </View>


            <View style={{ justifyContent: "center", alignItems: "center", marginVertical: 25, paddingBottom: 50 }}>
                <DrugList navigation={navigation} />
            </View>

        </View>

    )

}
export default DrugContainer

const styles = StyleSheet.create({})
