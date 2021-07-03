//import liraries
import React, { Component, useState, useEffect,useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import {useFocusEffect} from "@react-navigation/native"
// import {useSelector} from "react-redux"
import {Image,Button, Icon} from "react-native-elements"
// import data from "../../../data/084 products.json"
import { SearchBar } from 'react-native-elements';
// import SearchBox from "../../Components/search-box"
import Color from "../../../Constants/Colors"
import {Container, Input, Item,Hearder, Header} from "native-base"
import SearchBox from './search-Box';
import category from "../../../data/094 categories.json";
import CategoryFilter from "./CategoryFilter"
import DrugItem from "./DrugItem"
import baseUrl from "../../../assets/Common/baseUrl"
import axios from "axios"
import { ActivityIndicator } from 'react-native';
// create a component

const DrugList = ({navigation}) => {
  // const drugs = useSelector(state => state.drugs.availableDrugs)
 const [drug, setDrug] = useState([]);
 const [searchedDrug, setSearchedDrug] = useState([])
 const [focus, setFocus] = useState();
 const [categories, setCategories] = useState([]);
 const [initialState, setInitialState] = useState([]);
 const [active, setActive] = useState();
 const [productCategory, setProductCategory] = useState([])
 const [loading, setLoading] = useState(false)

 useFocusEffect

 useFocusEffect ((
     useCallback(
         () => {
             setFocus(false);
     
             setActive(-1)
        
             axios
             .get(`${baseUrl}products`)
             .then((res)=>{
             setDrug(res.data);
             setSearchedDrug(res.data);
             setCategories(res.category);
             setInitialState(res.data)
             setLoading(true)
             })
             .done()
        
             return () => {
                setDrug([])
                setFocus()
                setSearchedDrug([])
                setActive()
                setCategories([])
                setInitialState()
             }
         },
         [],
     )
 ))


//  useEffect(() => {
    
//      setFocus(false);
    
//      setActive(-1)

//      axios
//      .get(`${baseUrl}products`)
//      .then((res)=>{
//      setDrug(res.data);
//      setSearchedDrug(res.data);
//      setCategories(res.category);
//      setInitialState(res.data)

//      })
//      .done()

//      return () => {
//         setDrug([])
//         setFocus()
//         setSearchedDrug([])
//         setActive()
//         setCategories([])
//         setInitialState()
//      }
//  }, [])

 const filterDrug = (drugS)=>{
     setSearchedDrug(
         drug.filter((item)=> item.name.toLowerCase().includes(drugS.toLowerCase()))
     )
 }
 const turnFocusOn =()=>{
     setFocus(true)
 }

 const turnFocusOff = () =>{
     setFocus(false)
 }

 const changeCategory = (cat)=>{
     {
         cat === "all" ?
         [setProductCategory(initialState), setActive(true)]:
         [setProductCategory(drug.filter((item)=> item.category._id === cat),
             setActive(true)
         )]
     }
 }
    return (
        <View>
        {loading?(
            
                
        <View>
            <Container>


            
              <Header searchBar rounded style={{backgroundColor:"#FFF", borderRadius: 10, marginVertical:30, borderColor: Color.primary, borderWidth: 5}}>
                <Item>
                    <Icon name="search"/>
                    <Input 
                    onFocus={turnFocusOn}
                    onChangeText={(text)=>{filterDrug(text)}}
                    placeholder="Type here ..."/>
                    {focus == true? (<Icon onPress={turnFocusOff} name="close"/>):null}

                </Item>
            </Header>

      
        {/* <CategoryFilter
        
        categories = {categories}
        ctgFilter = {changeCategory}
        productCategory = {productCategory} 
        active={active}
        setActive = {setActive}
        
        /> */}
    
       
            

            {focus==true? (

               <SearchBox 
               navigation={navigation}
               filteredDrug={searchedDrug}/>
            ):
            (
              <View style={{justifyContent: "center", alignItems: "center"}}>

                 
                   <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={key=> key._id}
                    numColumns={2}
                    data={drug}
                    renderItem={({item})=>( 
    
                    <DrugItem 
                    {...item}
                    onViewDetails={
                        ()=>navigation.navigate("DrugDetail", {item:item})
                   }/>
          )}  
          contentContainerStyle={{paddingBottom: 150}}
          /> 
              </View> 
            )}


            
       </Container>
        </View>):(
            <View style={{flex: 1,
                justifyContent: 'center',
                alignItems: 'center',flexDirection:"column"}}>
                    <Text style={{color:Color.primary}}>Loading...</Text>
                   <ActivityIndicator size="large" color={Color.primary}/>
               </View>
        )}
        </View>


    );
};

export default DrugList;
