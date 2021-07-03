//import liraries
import React, { Component, useContext, useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Container, ListItem, Left, Right } from "native-base"
import { useFocusEffect } from "react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import Icon from 'react-native-vector-icons/FontAwesome';
import baseUrl from "../../assets/Common/baseUrl"
import AuthGlobal from "../../ContextAPI/store/AuthGlobal"
import { logoutUser } from "../../ContextAPI/Actions/authactions"
import { useEffect } from "react/cjs/react.development"
import Color from "../../Constants/Colors"
// create a component
import { Button } from "react-native-elements"
import { Colors } from 'react-native/Libraries/NewAppScreen';
const Profile = (props) => {
    const context = useContext(AuthGlobal)
    const [userProfile, setUserProfile] = useState()
    const [userName, setUserName] = useState()
   


    useEffect(() => {
        if (
            context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("SecondScreen")
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
                    if (context.stateUser.user.onlyAdmin == true || context.stateUser.user.isAdmin == true) {
                        setUserName("Admin")
                        
                    }
                    else {
                        setUserName("Patient")
                      
                    }
                    // console.log(userProfile)
                })

                .catch((error) => console.log(error))
        }
        return () => {
            setUserProfile();
            // setUserName()
            // setNeb()

        }

    }, [context.stateUser.isAuthenticated])

    // useCallback(() => {
    //     if (
    //         context.stateUser.isAuthenticated === false || 
    //         context.stateUser.isAuthenticated === null
    //     ) {
    //         props.navigation.navigate("Login")
    //     }

    //     AsyncStorage.getItem("jwt")
    //         .then((res) => {
    //             axios
    //                 .get(`${baseUrl}users/${context.stateUser.user.sub}`, {
    //                     headers: { Authorization: `Bearer ${res}` },
    //                 })
    //                 .then((user) => setUserProfile(user.data))
    //         })

    //         .catch((error) => console.log(error))
    //         return () => {
    //             setUserProfile();

    //         }

    //     }, [context.stateUser.isAuthenticated])
    // // useEffect(() => {
    //     if(context.stateUser.isAuthenticated === false|| context.stateUser.isAuthenticated === null)
    //     {
    //         props.navigation.navigate("Login")
    //     }

    //     AsyncStorage.getItem("jwt")
    //     .then((res)=>{
    //         axios
    //         .get(`${baseUrl}users/${context.stateUser.user.sub}`,{
    //             headers: {Authorization: `Bearer ${res}`}
    //            })
    //            .then((user)=>setUserProfile(user.data))

    //         })
    //     .catch((error)=>console.log(error))
    //     return () => {
    //         setUserProfile();
    //     }
    // }, [context.stateUser.isAuthenticated])
    return (
        <View style={{ justifyContent: "center" }} >

            <View style={{ margin: 10, height: 135, justifyContent: "center", backgroundColor: "white", alignSelf: "center", borderWidth: 5, borderRadius: 20, width: 260, borderColor: Color.primary }}>
                {/* <Text style={{alignSelf:"center"}}>Admin</Text> */}

                {context.stateUser.user.isPharmacy == true ? (
                    <View>
                        <Image resizeMode="cover" source={require("../../assets/images/pharmacy.jpg")} style={{
                            width: 250,
                            height: 130, alignSelf: "center", borderRadius:20
                        }} />
                        <View style={{
                            position: "absolute",
                            left: -25,
                            bottom: -25,
                            backgroundColor: Color.secondary,
                            marginLeft: 28,
                            borderRadius: 100,
                            elevation: 20,
                            padding: 5
                            
                        }}>
                            <Text>Located at: {userProfile ? userProfile.neghborhood : ""} </Text>

                        </View>
                    </View>


                ) : (<View>
                    <Image resizeMode="cover" source={require("../../assets/images/defaultUser.png")} style={{
                        width: 120,
                        height: 120, alignSelf: "center", borderRadius: 100
                    }} />
                    <View style={{
                        position: "absolute",
                        left: -25,
                        bottom: -25,
                        backgroundColor: Color.secondary,
                        marginLeft: 28,
                        borderRadius: 100,
                        elevation: 20,
                        padding: 5
                    }}>
                        <Text>User: {userProfile ? userName : ""} </Text>

                    </View>
                </View>)}


            </View>

            <View style={{ marginHorizontal: 20, marginTop:30 }}>
                <ListItem >
                    <Text>Email: </Text>
                    <Text> {userProfile ? userProfile.email : ""} </Text>
                </ListItem>

                {context.stateUser.user.isPharmacy !== true?(<ListItem>
                    <Text>First Name: </Text>
                    <Text>{userProfile ? userProfile.username : ""}  </Text>
                </ListItem>):null}
                {context.stateUser.user.isPharmacy !== true?(
                <ListItem>
                    <Text>Last Name: </Text>
                    <Text> {userProfile ? userProfile.name : ""}</Text>
                </ListItem>):(
                     <ListItem>
                     <Text>Pharmacy Name: </Text>
                     <Text> {userProfile ? userProfile.username : ""}</Text>
                 </ListItem>
                    
                )}
                <ListItem>
                    <Text>Phone: </Text>
                    <Text> {userProfile ? userProfile.phone : ""}</Text>
                </ListItem>
                <ListItem>
                    <Text>Zip: </Text>
                    <Text>{userProfile ? userProfile.zip : ""}  </Text>
                </ListItem>

                {context.stateUser.user.isPharmacy !== true ? (<ListItem>
                    <Text>Neghborhood: </Text>
                    <Text>{userProfile ? userProfile.neghborhood : ""}  </Text>
                </ListItem>):null}


            </View>




            <Button title="Sign Out" containerStyle={{
                width: 100, marginTop: 20,
                alignSelf: "center",
                margin: 5,
            }} buttonStyle={{ backgroundColor: "red" }} onPress={() => [AsyncStorage.removeItem("jwt"), logoutUser(context.dispatch)]} />














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
    image: {
        width: '100%',
        height: 300,
        padding: 50,
    },
});

//make this component available to the app
export default Profile;
