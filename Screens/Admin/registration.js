//import liraries
import React, { Component, useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, } from 'react-native';
import { Container, ListItem, Left, Right, Title, Header, Body } from "native-base"
import { useFocusEffect } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import { Button } from "react-native-elements"

import Color from "../../Constants/Colors"
import baseUrl from '../../assets/Common/baseUrl';
import Toast from "react-native-toast-message"


// create a component
const regitration = (props) => {
    const [item, setItem] = useState(props.route.params.item)
    const [licenceInfo, setLicenceInfo] = useState()
    const [status, setStatus] = useState(false)
    const [approvef, setApprovef] = useState(false)
    // const pharma = props.route.params.item

    useFocusEffect(
        useCallback(
            () => {
                // AsyncStorage.getItem("jwt")
                //     .then((res) => {
                //         setToken(res)
                //     })
                //     .catch((error) => console.log(error))

                if(item.pharmaApprove === "Rejected"){
                    setStatus(true)
                }
                axios
                    .get(`${baseUrl}licenceInfo`)
                    .then((res) => {


                        const data = res.data;
                        // console.log(data)
                        // data.filter(
                        //     // (item) => item.LICNO == item.licence
                        //     (it) => {
                        //         it.LICNO.toLowerCase().includes(item.licence.toLowerCase())
                        //         setLicenceInfo(it)
                        //     }

                        // );
                        data.map((it)=>{
                            if( it.LICNO.toLowerCase().includes(item.licence.toLowerCase())){
                                setLicenceInfo(it)
                            }
                            // setLicenceInfo("")
                        })


                        // console.log(licenceIn)
                        // setPorductFilter(users)
                        // setLoading(false)
                    }).catch((error) => {
                        console.log(error)
                        console.log(licenceInfo)
                    })

                    axios
                    .get(`${baseUrl}users`)
                    .then((res) => {
    
    
                        const data = res.data;
                        // console.log(data)
                        // const users = data.filter(
                        //     (user) => {
                        //         user.isPharmacy ==true
                        //     }
                        // )
                        data.map((user)=>{
                            if(user.username.toLowerCase().includes(item.name.toLowerCase())){
                                // setStatus("Approved")
                                setApprovef(true)
                                // console.log(status)
                            }
                        })
                        })
                return () => {
                    setLicenceInfo()
                    setApprovef()
                }
            },
            [],
        )
    )

    // const approve = ()=>{
    
    //     Toast.show({
    //         topOffset: 60,
    //         type: "success",
    //         text1: "Approved",
    //         text2: `${item.name} has been Approved`,
    //     });

    
    //  props.navigation.replace("AddPharma", {item:item})


    // }



   const reject = (idre)=>{

    const appo = "Rejected"
    const regis ={
        pharmaApprove: appo
     }
     axios
     .put(`${baseUrl}registrationRequest/${idre}`, regis)
     .then((res)=>{
         console.log(res)
         Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: `${item.name} has been registred`,
        });


        setTimeout(() => {
          props.navigation.goBack()
        }, 500)
     }).catch((error)=>{
         console.log(error)
     })
    
   } 

    const approve = (regId) => {
        if (item.name === "" ||
            item.phone === "" ||
            item.email === "" ||
            item.password === "" ||
            item.country === "" ||
            item.city === "" ||
           item.neighborhood === "" ||
            item.street === "" ||
           item.zip === "") 
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
        const appo = "Approved"
       const regis ={
           pharmaApprove: appo
        }
        
        let user = {
            username: item.name,
            email: item.email.trim(),
            password: item.createPassword,
            phone: item.phone,
            isAdmin: true,
            isPharmacy: true,
            city: item.city,
            zip: item.zip,
            street: item.street,
            country: item.country,
            neghborhood: item.neighborhood,
            // pharmaApprove: pharmaApprove,
            

        };
        axios
        .put(`${baseUrl}registrationRequest/${regId}`, regis)
        .then((res)=>{
            console.log(res)
        }).catch((error)=>{
            console.log(error)
        })

        axios
            .post(`${baseUrl}users/register`, user)
            .then((res) => {
                if  (res.status === 200 )  {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Registration Succeeded",
                        text2: `${item.name} has been registred`,
                    });


                    setTimeout(() => {
                      props.navigation.goBack()
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

                console.log(error)
            })

    }

    return (
        <View style={{ justifyContent: "center" }}>
            <Header style={{ backgroundColor: Color.secondary, }}>
                <Body style={{ alignItems: "center" }}>
                    <Title style={{ justifyContent: "center", color: "#000", fontSize: 20 }}> PHARMACY DETAILS</Title>
                </Body>

            </Header>
            <ScrollView>
                <View style={{ marginHorizontal: 20, marginTop: 30 }}>



                    <ListItem >
                        <Text>Pharmacy Name: </Text>
                        <Text>{item.name}</Text>

                    </ListItem>
                    <ListItem >
                        <Text>Country: </Text>
                        <Text>{item.country} </Text>
                    </ListItem>
                    <ListItem >
                        <Text>City: </Text>
                        <Text>{item.city} </Text>
                    </ListItem>
                    <ListItem >
                        <Text>Neighborhood: </Text>
                        <Text>{item.neighborhood} </Text>
                    </ListItem>
                    <ListItem >
                        <Text>Street: </Text>
                        <Text>{item.street} </Text>
                    </ListItem>

                    <ListItem >
                        <Text>Email: </Text>
                        <Text>{item.email} </Text>
                    </ListItem>


                    <ListItem >
                        <Text>Phone: </Text>
                        <Text>{item.phone} </Text>
                    </ListItem>

                    <ListItem >
                        <Text>Zip: </Text>
                        <Text>{item.zip} </Text>
                    </ListItem>

                    <ListItem >
                        <Text>Available Pharmacists: </Text>
                        <Text>{item.availPharmacists} </Text>
                    </ListItem>

                    <ListItem style={{ borderBottomColor: "red" }} >
                        <Text>LICENCE NO. : </Text>
                        <Text style={{ color: Color.primary }}>{item.licence} </Text>
                    </ListItem>

                </View>

                <View style={{ marginHorizontal: 20, marginTop: 30 }}>
                    <Text style={{ alignSelf: "center", fontSize: 20, margin: 20 }}>LICENCE DETAILS</Text>
                    {/* {console.log(licenceInfo)} */}
                    {licenceInfo ? 
                    
                    
                    (
                        <View>

                            <ListItem style={{ borderBottomColor: "red" }} >
                                <Text>LICENCE NO. : </Text>
                                <Text style={{ color: Color.primary }}>{licenceInfo.LICNO} </Text>
                            </ListItem>
                            <ListItem  >
                                <Text>Pharmacy Name : </Text>
                                <Text>{licenceInfo.pharmaName} </Text>
                            </ListItem>
                            <ListItem  >
                                <Text>Country: </Text>
                                <Text >{licenceInfo.country} </Text>
                            </ListItem>
                            <ListItem  >
                                <Text>City: </Text>
                                <Text >{licenceInfo.city} </Text>
                            </ListItem>
                            <ListItem  >
                                <Text>Neighborhood: </Text>
                                <Text >{licenceInfo.neighborhood} </Text>
                            </ListItem>
                            <ListItem  >
                                <Text>Street: </Text>
                                <Text >{licenceInfo.street} </Text>
                            </ListItem>


                        </View>
                    )
                : (
                    <View style={{alignSelf:"center"}}> 

                        <Text style={{fontSize:15}}> Sorry!!</Text>
                        <Text style={{fontSize:15}}>This Pharmacy's Licence Number is not Valid</Text>
                    </View>
                    
                    )}
                    {/* <ListItem style={{ borderBottomColor: "red" }} >
                        <Text>LICENCE NO. : </Text>
                        <Text style={{ color: Color.primary }}>{licenceInfo.LICNO} </Text>
                    </ListItem>
                    <ListItem style={{ borderBottomColor: "red" }} >
                        <Text>LICENCE NO. : </Text>
                        <Text style={{ color: Color.primary }}>{licenceInfo.pharmaName} </Text>
                    </ListItem> */}

                    {licenceInfo ? 
                    approvef == false?
                    (<Button 
                    buttonStyle={{ backgroundColor: "#11d6cd" }}
                        onPress={() => approve(item.id)}
                        containerStyle={{width:200, margin:30, alignSelf:"center"}} title="Approve" />)
                        
                        : <View style={{alignSelf:"center"}}> 

                    <Text style={{ margin:50,
                        fontSize:15, color: Color.primary}}> Registration has been Approved</Text>
                    {/* <Text style={{fontSize:15}}>This Pharmacy's Licence Number is not Valid</Text> */}
                </View> 
                        : 
                        
                        
                        (
                        
                        status == true? (
                            <View style={{alignSelf:"center"}}> 
                            <Text style={{ margin:50,
                                fontSize:15, color: "red"}}> Registration has been Rejected</Text>
                           
                        </View>

                        ):
                        (<Button  buttonStyle={{ backgroundColor: "red" }}
                        onPress={() => reject(item.id)}
                        containerStyle={{width:200, margin:30, alignSelf:"center"}} title="reject" />))}
                    <View style={{ height: 50 }} />
                </View>

            </ScrollView>



        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default regitration;
