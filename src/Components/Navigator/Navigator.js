import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import homeNavigator from "../homeScreenTabNavigator"
import drugDetail from "../../Shop/Drugs/DrugDetail"
import drugContainer from "../../Shop/Drugs/DrugContainer"
import checkOut from "../../Shop/CheckOut/CheckOut"
import cartScreen from "../../Shop/Cart/Cart"
import UpdateProductForm from '../../../Screens/Pharmacies/updateProductForm'
import AddProducts from '../../../Screens/Pharmacies/addProducts'
import Products from  "../../../Screens/Pharmacies/Products"
import AddPharma from "../../../Screens/Admin/addPharmacy"
import Registration from "../../../Screens/Admin/registration"
// import PharmaRegistration from "../../../Screens/Admin/pharmaRegistration"
const Stack = createStackNavigator();
const screenOptionStyle = {
    headerShown: false
}

const HomeStackNavigator = () => {
    return(
        <Stack.Navigator screenOptions={screenOptionStyle}>
             <Stack.Screen name="Home" component={homeNavigator}/>
            {/* <Stack.Screen name="Home Screen" component={homeScreen}/> */}
            <Stack.Screen name="DrugContainer" component={drugContainer}/>
            <Stack.Screen name="DrugDetail" component={drugDetail}/> 
            <Stack.Screen name="Checkout" component={checkOut}/>
            <Stack.Screen name="Cart" component={cartScreen}/>
            <Stack.Screen name="PharmaRegistration" component={Registration}/>
            
            <Stack.Screen name="UpdateProductForm" component={UpdateProductForm}/>
            <Stack.Screen name="AddProducts" component={AddProducts}/>
            <Stack.Screen name="Products" component={Products}/>
            <Stack.Screen name="AddPharma" component={AddPharma}/>

        </Stack.Navigator>
    )
}

export default HomeStackNavigator;

const styles = StyleSheet.create({})
