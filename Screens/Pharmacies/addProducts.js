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

// import ImagePicker from 'react-native-image-crop-picker';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import mime from "mime";

// create a component
const AddProducts = (props) => {

    const context = useContext(AuthGlobal)


    const [pickerValue, setPickerValue] = useState();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [mainImage, setMainImage] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [token, setToken] = useState();
    const [error, setError] = useState();
    const [countInStock, setCountInStock] = useState("");
    const [userLocation, setUserLocation] = useState();
    const [item, setItem] = useState(null);
    const [userProfile, setUserProfile] = useState()
    const [title, setTitle] = useState()
  
    const [user, setUser] = useState()

    // (props.route.params.item


    useEffect(() => {

        if(!props.route.params){
            setItem(null)
           setTitle("Add Drug")
        }
        else{
            // console.log(props.route.params.item.description)
            axios
            .get(`${baseUrl}categories`)
            .then((res) => setCategories(res.data))
            .catch((error) => { console.log(error) });

            setTitle("Update Drug")
            setItem(props.route.params.item)
            setUser(props.route.params.item.userLocation)
            setName(props.route.params.item.name)
            setPrice(props.route.params.item.price.toString())
            setCategory(props.route.params.category)
            setCountInStock(props.route.params.item.countInStock.toString())
            setImage(props.route.params.item.image)
            setDescription(props.route.params.item.description)
            setMainImage(props.route.params.item.image)
            
        }

        if (
            context.stateUser.isAuthenticated === false ||
            context.stateUser.isAuthenticated === null
        ) {
            props.navigation.navigate("Login")
        }
        else {
            AsyncStorage.getItem("jwt")
                .then((res) => {
                    setToken(res)
                    // console.log(context.stateUser.user.userId)
                    const uid = context.stateUser.user.userId
                    axios
                        .get(`${baseUrl}users/${uid}`, {
                            headers: { Authorization: `Bearer ${res}` },
                        })
                        .then((user) =>
                            // console.log(user.data),
                            setUserProfile(user.data))
                    // console.log(userProfile)
                })
                .catch((error) => console.log(error))

            axios
                .get(`${baseUrl}categories`)
                .then((res) => setCategories(res.data))
                .catch((error) => { console.log(error) });


            //         const uid =context.stateUser.user.userId
            //         axios
            //             .get(`${baseUrl}users/${uid}`, {
            //                 headers: { Authorization: `Bearer ${token}` },
            //             })
            //             .then((user) => 
            //             // console.log(user.data),
            //             setUserProfile(user.data),
            //             console.log(userProfile)
            //             )

            //             // console.log(userProfile)
            //    .catch((error) => console.log(error))
            //  axios
            //         .get(`${baseUrl}users`)
            //         .then((res) => {res.data.filter((user)=>{
            //             if(user._id===context.stateUser.isAuthenticated.userId){
            //                 setUsers(user.data)
            //                  console.log()
            //             }
            //             else{
            //                 console.log("Something went wrong, can't find user Id")
            //             }
            //         })})
            //         .catch((error) => { console.log(error) });

            //         }




            axios
                .get(`${baseUrl}users`)
                .then((x) => {
                    const data = x.data;
                    // console.log(data)
                    data.filter(
                        (info) => 
                        {
                            if(info._id === context.stateUser.user.userId){
                        setUser(info._id)}}
                    );
                    ;
                    // console.log(users);
                    // console.log(categories)

                })
                .catch((error) => console.log(error))
        }



        // (async () => {
        //     if (Platform.OS !== 'web') {
        //         const { status } = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
        //     //   const { status } = await ImagePicker.requestCameraPermissionsAsync();
        //     //   ImagePicker.requestMediaLibraryPermissionsAsync();
        //       if (status !== 'granted') {
        //         alert('Sorry, we need camera roll permissions to make this work!');
        //         return;
        //       }
        //     }
        //   })();

        return () => {
            setCategories([])
            // setUserLocation()
            setUser()
            setUserProfile()
        }
    }, [context.stateUser.isAuthenticated])
    // await Permissions.askAsync(Permissions.CAMERA_ROLL);

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
    // const pickImageFromGalery = () => {

    //     const options = {
    //         storageOptions: {
    //             path: "image",
    //             mediaType: "photo",
    //             quality: 1,
    //             allowsEditing: "true",
    //             aspect: [4, 3],
    //         },
    //         // includeBase64: "true"
    //     };

    //     launchCamera(options, response => {
    //         if (response.didCancel) {
    //             console.log("Image picker cancelled")
    //         }
    //         else if (response.error) {
    //             console.log(response.error)
    //         }
    //         else if (response.customButton) {
    //             console.log(response.customButton)
    //         }
    //         else {
    //             // const imageSource = {uri: response.base64}
    //             setImage(response.uri)
    //             setMainImage(response.uri)
    //         }

    //     });
    // }


    const addProduct = () => {

        //    axios
        // .get(`${baseUrl}users`)
        // .then((x) => {
        //     const data = x.data;
        //     console.log(data)
        //     const usersInfo = data.filter(
        //         (info) => info._id === context.stateUser.user.userId
        //     );
        //    return  setUserLocation(usersInfo);
        //     // console.log(usersInfo);
        //     // console.log(categories)

        // })
        // .catch((error) => console.log(error))




        // axios
        // .get(`${baseUrl}users`,{
        //     headers: { Authorization: `Bearer ${token}` },
        // })
        // .then((res) => {res.data.filter((user)=>{

        //     {userProfile? ( user._id === userProfile.id? setUsers(user):console.log("something went wrong")):console.log("something went wrong")}

        //     // if(user._id===context.stateUser.isAuthenticated.userId){
        //     //     setUsers(user.data)
        //     //     // console.log(token)
        //     // }
        //     // else{
        //     //     console.log("Something went wrong, can't find user Id")
        //     // }

        // })})
        // .catch((error) => { console.log(error) });

        //    users.map((user)=>{setUserLocation(user)})

        // const neghborhood = userProfile.neghborhood
        // console.log(neghborhood)
        // {userProfile? setUserLocation(neghborhood.toString()):null}
        // console.log(users)

        //  users.map((user)=>{ if(user._id===context.stateUser.user.userId)

        //     setUser(user)})


        if (
            name == "" ||
            price == "" ||
            description == "" ||
            category == "" ||
            countInStock == "" ||
            image == ""
        ) {
            setError("Please Update all fields")
        }


        // setUser(users[0])
        let formData = new FormData();

        const imageUri = "file:///" + image.split("file:/").join("");

        formData.append("image", {
            uri: imageUri,
            type: mime.getType(imageUri),
            name: imageUri.split("/").pop()
        });
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("countInStock", countInStock);
        // formData.append("detailedDescription", detailedDescription);
        formData.append("userLocation", user);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        }
        if(item !==null){
            axios
            .put(`${baseUrl}products`, formData, config)
            .then((res)=>{
                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "Drug Successfully Updated",
                        text2: ""
                    });
                    setTimeout(() => {
                        props.navigation.goBack();
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again"
                }),
                    console.log(error)
            })
        
        }
        else{
        axios
            .post(`${baseUrl}products`, formData, config)
            .then((res) => {
                if (res.status == 200 || res.status == 201) {
                    Toast.show({
                        topOffset: 60,
                        type: "success",
                        text1: "New Drug added",
                        text2: ""
                    });
                    setTimeout(() => {
                        props.navigation.goBack();
                    }, 500)
                }
            })
            .catch((error) => {
                Toast.show({
                    topOffset: 60,
                    type: "error",
                    text1: "Something went wrong",
                    text2: "Please try again"
                })
                // ,
                //     console.log(error)
            })
        
        }


    }
    
    // {item!==null?title=="Update Drug": title="Add Drug"} 

    return (
        <View>

            <FormContainer title={title}>
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
{/* {console.log(user)} */}
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
                    keyboardType={"numeric"}

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

                    {/* <Picker

                        mode="dropdown"
                        iosIcon={<Icon color={"#007aff"} name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Select your Category"
                        selectedValue={pickerValue}
                        placeholderStyle={{ color: "#007aff" }}
                        placeholderIconColor="#007aff"
                        onValueChange={(e) => [setPickerValue(e), setUser(e)]}
                    >
                        {categories.map((c) => {
                            return <Picker.Item key={c.id} label={c.neghborhood} value={c.id} />
                        })}
                    </Picker> */}
                </View>

                {/* <View style={{
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
                        onValueChange={(e) => [setPickerValue(e), setUser(e)]}
                    >
                        {categories.map((c) => {
                            return <Picker.Item key={c.id} label={c.name} value={c.id} />
                        })}
                    </Picker>
                </View> */}


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
        // flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default AddProducts;
