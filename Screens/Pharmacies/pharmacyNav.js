import React from "react" 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import Products from "./Products"
import Orders from "./orders"
import Categories from "./categories"
import Color from "../../Constants/Colors"
// import Admin from "./Admin"

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
         {/* <Tab.Screen name="Admin" component={Admin} /> */}
         <Tab.Screen name="Drugs" component={Products} />
        {/* <Tab.Screen name="Categories" component={Categories} /> */}
        <Tab.Screen name="Orders" component={Orders} />
        {/* <Tab.Screen name="Confirm" component={Confirm} /> */}
     
     
    </Tab.Navigator>

    // <View>
    //     <Text></Text>
    // </View>
  );
}
export default MyTabs