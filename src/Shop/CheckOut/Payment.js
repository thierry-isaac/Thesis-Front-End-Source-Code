//import liraries
import React, { Component, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import {
    Container,
    Header,
    Content,
    ListItem,
    Text,
    Radio,
    Right,
    Left,
    Icon,
    Body,
    Title
} from 'native-base';
import {Button } from "react-native-elements"
import Color from "../../../Constants/Colors"
import { Picker } from '@react-native-picker/picker';


const methods = [
    { name: 'Cash on Delivery', value: 1 },
    { name: 'MoMo Transfer', value: 2 },
    { name: 'Card Payment', value: 3 }
]

const paymentCards = [
    { name: 'Wallet', value: 1 },
    { name: 'Visa', value: 2 },
    { name: 'MasterCard', value: 3 },
    { name: 'Other', value: 4 }
]

// create a component
const Payment = (props) => {

    const order = props.route.params

    const [selected, setSelected] = useState()
    const [card, setCard] = useState()
    return (
        <Container>


            {props.route.params?(<Container>
            <Header style={{ backgroundColor: Color.secondary }}>
                {/* <View style={{backgroundColor:Color.primary}}>
                <Title>Choose your payment method</Title>
                </View> */}
                <Body style={{ alignItems: "center" }}>
                    <Title style={{ color: "#000" }}>Choose your payment method</Title>
                </Body>
            </Header>
            <Content>
                {methods.map((item, index) => {
                    return (
                        <ListItem key={item.name} onPress={() => setSelected(item.value)}>
                            <Left>
                                <Text>{item.name}</Text>
                            </Left>
                            <Right >
                                <Radio selected={selected == item.value} contentStyle={{ color: Color.primary }} />
                            </Right>
                        </ListItem>
                    )
                })}


                {selected == 3 ? (
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name={"arrow-down"} />}
                        headerStyle={{ backgroundColor: 'orange' }}
                        headerBackButtonTextStyle={{ color: '#fff' }}
                        headerTitleStyle={{ color: '#fff' }}
                        selectedValue={card}
                        onValueChange={(x) => setCard(x)}
                    >
                        {paymentCards.map((c, index) => {
                            return <Picker.Item
                                key={c.name}
                                label={c.name}
                                value={c.name} />
                        })}
                    </Picker>
                ) : null}
                
                {/* {selected == 3 ? (
                    
                    <Container style={{width:"80%",alignSelf:"center"}}>
                      <Header style={{backgroundColor:Color.primary, borderBottomLeftRadius:10, borderBottomRightRadius:10}}>
                          <Body style={{alignItems:"center"}}><Text>Card Payment</Text></Body>
                      </Header>

                    {paymentCards.map((i, index) =>{
                    return(

                        
                        <ListItem onPress={() => setCard(item.value)}>
                        <Left>
                            <Text>{i.name}</Text>
                        </Left>
                        <Right >
                            <Radio selected={card == i} contentStyle={{ color: Color.primary }} />
                        </Right>
                    </ListItem>

                     ) })}


                    </Container>) : null} */}

                <View style={{ marginTop: 60, alignSelf: 'center' }}>
                    <Button

                        containerStyle={{ width: 200, margin: 5, justifyContent: "center" }}
                        buttonStyle={{ backgroundColor: Color.primary }}
                        title={"Confirm"}
                        onPress={() => props.navigation.navigate("Confirm", { order })} />
                </View>

            </Content>
            </Container>):(<Container style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>  OOOPS!</Text>
                
                 <Text>
                   Looks Like your Cart is empty
         </Text>
                 <Text>Add a drug to your cart to get started</Text>
             </Container>)}

        </Container>

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
export default Payment;
