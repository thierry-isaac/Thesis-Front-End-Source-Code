//import liraries
import React, { Component } from 'react';
import { View,  StyleSheet, Dimensions } from 'react-native';
import {Content, Left, Body, ListItem, Thumbnail, Text, Right} from "native-base";
import Color from "../../../Constants/Colors"

var {width} = Dimensions.get("window")
// create a component
const searchBox = (props) => {
    const {filteredDrug} = props   
    return (
        <Content style={{width: width}}>
            {filteredDrug.length> 0? (filteredDrug.map((drug)=>(
                
                <ListItem
                button={true}
                onPress={()=> props.navigation.navigate("DrugDetail",{item: drug})}
                key={drug._id}
                avatar
                useForeground={true}
                >
                    <Left>
                        <Thumbnail source={{uri: drug.image
                        // ? drug.image: url
                    }}/>
                    </Left>
                    <Body>
                        <Text>
                            {drug.name}
                        </Text>
                        <Text note>
                            {drug.description}
                            
                        </Text>

                        <Text style={{color: Color.primary}} note>
                           $ {drug.price}
                        </Text>
                        {/* <Text></Text> */}
                    </Body>
                    <Right>
                    <Text style={{fontSize:10}}>{drug.userLocation.username}</Text>
                    <Text style={{fontSize:7}}>{drug.userLocation.neghborhood}, {drug.userLocation.street}</Text>
                    </Right>
                </ListItem>
            )))
        
        : (
            <View style={{justifyContent:"center", alignItems: "center"}}>
                <Text style = {{alignSelf: "center"}}>
                    No such drug found
                </Text>
            </View>
        )
        }
        </Content>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default searchBox;
