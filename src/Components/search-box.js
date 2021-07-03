//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Color from "../../Constants/Colors"


// create a component
const SearchBox = (props) => {
    // const [search, setSearch] = useState("")
    return (
        <SearchBar
        placeholder="Type Here..."
        onChangeText={props.setSearch}
        value={props.search}
        containerStyle={{backgroundColor: Color.primary, borderWidth: 5, borderRadius: 25, marginBottom: 30, borderColor: "white",      
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent'}}
        inputContainerStyle={{backgroundColor:"white"}}
        
        round
      />
    );
};
//make this component available to the app
export default SearchBox;
