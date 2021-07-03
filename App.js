/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StyleSheet, View, Text, LogBox } from "react-native"
import StartScreen from './Screens/StartScreen';
import Colors from "./Constants/Colors"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/Auth/Login';
import Register from './Screens/Auth/Register';
import navigator from "./src/Components/Navigator/Navigator";
import homeNavigator from "./src/Components/homeScreenTabNavigator"
// import drugDetail from "./src/Shop/Drugs/DrugDetail"
// import drugContainer from "./src/Shop/Drugs/DrugContainer"
// import checkOut from "./src/Shop/Cart/CheckOut"

import Auth from "./ContextAPI/store/Auth"

import { Provider } from "react-redux"
import store from "./store/store"
import Toast from 'react-native-toast-message'
import SecondScreen from "./Screens/secondScreen"
import PharmaRegis from "./Screens/Auth/requestRegistration"
import PharmaLogin from "./Screens/Auth/pharmacyLogin"
import Congrats from "./Screens/Auth/pharmaCongratulations"

LogBox.ignoreAllLogs(true)

class App extends Component {
  render() {

    const Stack = createStackNavigator();
    const globalScreenOption = {
      headerShown: false
    }
    return (
      <Auth>
        <Provider store={store}>
        <NavigationContainer >
        
          <Stack.Navigator screenOptions={globalScreenOption}>
            <Stack.Screen name="Start Page" component={StartScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Navigator" component={navigator} />
            {/* <Stack.Screen name="Home" component={homeNavigator} />
            <Stack.Screen name="Home Screen" component={homeScreen}/>
            <Stack.Screen name="DrugContainer" component={drugContainer} />
            <Stack.Screen name="DrugDetail" component={drugDetail} />
            <Stack.Screen name="CheckOut" component={checkOut} /> */}
          <Stack.Screen name="PharmaRegis" component={PharmaRegis}/>
          <Stack.Screen name="PharmaLogin" component={PharmaLogin}/>
            <Stack.Screen name="SecondScreen" component={SecondScreen}/> 
            <Stack.Screen name="Congrats" component={Congrats}/> 
          </Stack.Navigator>
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NavigationContainer>
      </Provider>



      </Auth>

      


    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary
  }
})


export default App;
