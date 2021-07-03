import React from 'react'
import { View, StyleSheet } from 'react-native'
import Colors from "../Constants/Colors"
import Icon from 'react-native-vector-icons/FontAwesome';
import {Image, Text, Button } from "react-native-elements"

const StartScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text h3 style={{color:"white"}}> Welcome to Pharma+</Text>
            <Image source={require("../assets/images/startscreen.png")} 
            style={styles.startScreen}
            />
                            <View style={styles.button}>
                                <Button title="GET STARTED"  
                                buttonStyle={{borderColor: "#11d6cd"}}
                                raised
                                type="outline"
                                titleStyle={{color: "#11d6cd"}}
                                rightIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                                onPress={()=>navigation.replace("SecondScreen")}
                                
                                    
                                        // icon={ 
                                        //     name: "arrow-right",
                                        //     size: 30,
                                        //     color: "#11d6cd"

                                        //   }

                                        icon={<Icon name="rocket" size={30} color={Colors.primary} />}


                                        

                                          iconRight
                                    
                                />

                                
                            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    startScreen: {
        height:250,
        width:300,
        marginTop:10,
        marginBottom: 100,

    },
    button:{
        width: 300,
    
        
    }
})
export default StartScreen;