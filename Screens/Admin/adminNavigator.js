import React from "react" 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import Products from "./products"
import Categories from "./categories"
import Orders from "./orders"
import Color from "../../Constants/Colors"
import Admin from "./Admin"
import PharmaRegistration from "./pharmaRegistration"
import { createStackNavigator } from '@react-navigation/stack'
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator 
    
    tabBarOptions={{
         indicatorStyle:{ backgroundColor: Color.primary},
         labelStyle: {
            fontSize: 7,
            margin: 0,
            padding: 0,
          },
      }}
     
      
    > 
         <Tab.Screen name="Pharmacies" component={Admin} />
        <Tab.Screen name="Registration" component={PharmaRegistration}/>
         <Tab.Screen name="Products" component={Products} />
        <Tab.Screen name="Categories" component={Categories} />
        <Tab.Screen name="Orders" component={Orders} />
        
        {/* <Tab.Screen name="Confirm" component={Confirm} /> */}
     
     
    </Tab.Navigator>

    // <View>
    //     <Text></Text>
    // </View>
  );
}
export default MyTabs