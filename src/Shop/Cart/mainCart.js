import React from "react" 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import Cart from "./Cart"
import CheckOut from "../CheckOut/CheckOut"
import Payment from "../CheckOut/Payment"
import Confirm from "../CheckOut/Confirm"
import Color from "../../../Constants/Colors"

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator 
    
    tabBarOptions={{
         indicatorStyle:{ backgroundColor: Color.primary},
         labelStyle: {
          fontSize: 10,
          margin: 0,
          padding: 0,
        },
        
      }}
    > 
         <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Shipping" component={CheckOut} />
        <Tab.Screen name="Payment" component={Payment} />
        <Tab.Screen name="Confirm" component={Confirm} />
     
     
    </Tab.Navigator>

    // <View>
    //     <Text></Text>
    // </View>
  );
}
export default MyTabs