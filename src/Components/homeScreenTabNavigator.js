//import liraries
import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import drugContainer from "../Shop/Drugs/DrugContainer"
import { Image } from "react-native-elements"
import Profile from "../../Screens/Users/Profile"
import mainCart from "../Shop/Cart/mainCart"
import { Icon } from 'react-native-elements'
import Color from "../../Constants/Colors"
import CartIcon from "../Shop/Cart/CartIcon"
import AdminNav from "../../Screens/Admin/adminNavigator"
import AuthGlobal from '../../ContextAPI/store/AuthGlobal';
import PharmaNav from "../../Screens/Pharmacies/pharmacyNav"

const Tab = createBottomTabNavigator();


const navigator = (props) => {

    const context = useContext(AuthGlobal)
    return (
        <Tab.Navigator
            tabBarOptions={{
                style: {
                    height: 65,
                    justifyContent: "center",
                    // paddingVertical:5,
                    backgroundColor: "#eff4f0",
                    // elevation:2
                    //    borderTopRightRadius:10,

                },
                keyboardHidesTabBar: true,
                activeBackgroundColor: Color.primary,
            }}
        >



            <Tab.Screen
                name="Home"
                component={drugContainer}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => (
                        // <Image
                        //     source={require("./images/8.png")}
                        //     style={{ height:20, width:20 }}
                        // />
                        <Icon
                            raised
                            name='home'
                            type='font-awesome'
                            color={Color.primary}
                            size={16}
                        />
                    )
                }}
            />

{context.stateUser.user.isAdmin == false? ( <Tab.Screen
                name="MainCart"
                component={mainCart}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => (
                        <View>
                            <CartIcon />
                            <Icon
                                raised
                                name='shopping-cart'
                                type='font-awesome'
                                color={Color.primary}
                                size={16}
                            />


                        </View>

                    )
                }}
            />): null}
           
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({ color, size }) => (
                        <Icon
                            raised
                            name='user'
                            type='font-awesome'
                            color={Color.primary}
                            size={16}
                        />
                    )
                }}
            />

            
{context.stateUser.user.isAdmin == true? (
            context.stateUser.user.isPharmacy !== true ? (
                 <Tab.Screen
                 name="Admin"
                 component={AdminNav}
                 options={{
                     tabBarLabel: "",
                     tabBarIcon: ({ color, size }) => (
                         <Icon
                             raised
                             name='cog'
                             type='font-awesome'
                             color={Color.primary}
                             size={16}
                         />
                     )
                 }}
             />

             ): 
             (
                 <Tab.Screen
                 name="Pharmacy"
                 component={PharmaNav}
                 options={{
                     tabBarLabel: "",
                     tabBarIcon: ({ color, size }) => (
                         <Icon
                             raised
                             name='cog'
                             type='font-awesome'
                             color={Color.primary}
                             size={16}
                         />
                     )
                 }}
             />

             )
): null}

           



        </Tab.Navigator>
    )
}


//make this component available to the app
export default navigator;
