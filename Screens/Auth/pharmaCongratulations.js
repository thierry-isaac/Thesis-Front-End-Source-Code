import React,{useState} from 'react'
import { View, StyleSheet } from 'react-native'
// import Colors from "../Constants/Colors"
import Icon from 'react-native-vector-icons/FontAwesome';
import {Image, Text, Button } from "react-native-elements"
import Colors from "../../Constants/Colors"

const StartScreen = ({navigation, route}) => {
    const [item, setIem] = useState(route.params.item) 
    return (
        <View style={styles.container}>
              <Image source={require("./congrats.png")} 
            style={styles.startScreen}
            />
            <Text h4 style={{color:"white", marginHorizontal:30}}> Thank you {item.name} !!!</Text>
            <Text h5 style={{color:"white", marginHorizontal:30, marginBottom:20}}>Your information have been recorded and will take 24 hours to process.</Text> 
           
          
                            <View style={styles.button}>
                                <Button title="GET STARTED"  
                                buttonStyle={{borderColor: "#11d6cd"}}
                                raised
                                type="outline"
                                titleStyle={{color: "#11d6cd"}}
                                rightIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                                onPress={()=>navigation.replace("PharmaLogin")}
                                
                                
                                    
                                        // icon={ 
                                        //     name: "arrow-right",
                                        //     size: 30,
                                        //     color: "#11d6cd"

                                        //   }

                                        icon={<Icon name="rocket" size={30} color={Colors.primary} />}


                                        

                                          iconRight
                                    
                                />

                                
                            </View>
                            <Text style={{color:"white", marginTop:20, marginHorizontal:30}}><Text h4 style={{color:"white",}}> Note:</Text>  Passed that time (24 hours), should you be unable to login, kindly contact our IT support team at <Text style={{color: "blue", talic: {fontStyle: 'italic'}}}>support@pharmaplus.org.</Text></Text>

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
        height:100,
        width:200,
        marginTop:10,
        marginBottom: 50,

    },
    button:{
        width: 300,
    
        
    }
})
export default StartScreen;