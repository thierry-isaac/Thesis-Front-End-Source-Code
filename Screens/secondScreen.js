import React from 'react'
import { View, StyleSheet } from 'react-native'
import Colors from "../Constants/Colors"
import Icon from 'react-native-vector-icons/FontAwesome';
import {Image, Text, Button } from "react-native-elements"

const seconScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
           
               
            {/* <Text h3 style={{color:Colors.primary}}>Login As</Text> */}
            <Image source={require("./second.png")} 
            style={styles.startScreen}
            />
                            <View style={styles.button}>
                                <Button title="Patient "  
                                containerStyle={{marginVertical:10}}
                                buttonStyle={{borderColor: "#11d6cd", }}
                                raised
                                type="outline"
                                titleStyle={{color: Colors.primary}}
                                rightIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                                onPress={()=>navigation.navigate("Login")}
                                
                                    
                                        // icon={ 
                                        //     name: "arrow-right",
                                        //     size: 30,
                                        //     color: "#11d6cd"

                                        //   }

                                        icon={<Icon name="user" size={30} color={Colors.primary} />}


                                        

                                          iconRight
                                    
                                />

                                <Button title="Pharmacy  "  
                                buttonStyle={{borderColor: "#11d6cd",}}
                                raised
                                type="outline"
                                titleStyle={{color: Colors.primary}}
                                rightIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                                onPress={()=>navigation.navigate("PharmaRegis")}
                                
                                    
                                        // icon={ 
                                        //     name: "arrow-right",
                                        //     size: 30,
                                        //     color: "#11d6cd"

                                        //   }

                                        icon={<Icon name="plus" size={30} color={Colors.primary} />}


                                        

                                          iconRight
                                    
                                />

                                
                            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:  Colors.primary,
        // "#ededed",
        justifyContent: "center",
        alignItems: "center",
    },
    startScreen: {
        height:200,
        width:250,
      marginVertical:20

    },
    button:{
        width: 300,
    
        
    }
})
export default seconScreen;