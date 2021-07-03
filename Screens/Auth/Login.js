//import liraries

import React, { useState, useEffect, useContext } from 'react';
import { StatusBar, StyleSheet, View,Image, TextInput } from 'react-native'
import image from "../../assets/images/login.png"
import { Input, Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAvoidingView } from 'react-native';
import { Header } from 'react-navigation-stack';
import Error from "../../src/Components/Error"
import AuthGlobal from "../../ContextAPI/store/AuthGlobal"
import {loginUser} from "../../ContextAPI/Actions/authactions"

// create a component
const LoginScreen = ({navigation}) => {
const context = useContext(AuthGlobal)

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    useEffect(() => {
        if(context.stateUser.isAuthenticated === true)
        navigation.navigate("Navigator")
        // return () => {
        //     cleanup
        // }
    }, [context.stateUser.isAuthenticated])

    const signIn = () =>{
        const user ={
            email: email.trim(),
            password: password,
        }


        if(email === ""){
            setEmailError("Email field is required")
        }else{
            setEmailError("")
        }
        if(password === ""){
            setPasswordError("Password field is required")
        }else{
            setPasswordError("")
        }
        
        if(email !== "" && password !== "")
        {
            loginUser(user, context.dispatch)
        }

    // navigation.navigate("Navigator")
    }
    
  
   
   
    return (
  
        <KeyboardAvoidingView  style={styles.conatiner}>
         <Text h3 style={{marginTop:150, marginBottom:10}}> Login
         </Text>
         
            <Image resizeMode="cover" source={image} style={styles.image}/>
           <View style={styles.inputContainer}>
           <Input
            placeholder='Email'
            autoFocus 
            type="email" 
            id="email"
            value={email}
            onChangeText={text =>{
                setEmail(text.toLowerCase())
                }}/>
                {emailError?(<Error message={emailError}/>):null}
            
            <Input
            placeholder='Password'
            type="password"
            id="password"
            secureTextEntry
            value={password}
            onChangeText={password=>{
                setPassword(password)
            }}
            />
            {passwordError?(<Error message={passwordError}/>):null}
            
        </View>
           <Button
           buttonStyle={{backgroundColor: "#11d6cd"}}
           onPress = {()=>signIn()}
           containerStyle={styles.button}
           title="Login"/>
           <Button
           raised
           onPress = {() =>navigation.navigate("Register")}
           buttonStyle={{borderColor: "#11d6cd"}}  //backgroundColor:"#dbe1f1"
           titleStyle={{color: "#11d6cd"}}
            containerStyle={styles.button}
           type="outline"
           title="Sign Up" 
           />
           <View style={{height:200 }}/>
        </KeyboardAvoidingView>
    );
};

// define your styles
const styles = StyleSheet.create({
    conatiner:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        backgroundColor: "white",
        // backgroundColor: "#dbe1f1"
    },
    imageView:{
        width: "80%",
        flexDirection: "row",
        // justifyContent: "space-between"
    },

    image: {
        width: 250,
        height: 150, 
        
      
    },

    inputContainer:{
        width: 300,
    },
    button: {
        width: 200,
        margin: 5,
        // borderRadius: 50,
        
        

    }
});

//make this component available to the app
export default LoginScreen;
