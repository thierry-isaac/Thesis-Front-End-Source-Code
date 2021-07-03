//import liraries
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View, SafeAreaView, StatusBar } from 'react-native';
import {ListItem, Badge, Text} from "native-base"
import Color from "../../../Constants/Colors"
import { FlatList } from 'react-native-gesture-handler';

// create a component
const CategoryFilter = (props) => {

    // const {categories, ctgFilter , productCategory,  active, setActive } = props
    return (
        
       <View 
  
       bounces={true}
       horizontal={true}
       style={{backgroundColor: "#eff4f0", paddingHorizontal: 5,marginHorizontal:20, borderRadius: 10}}>
           
           
           <View style={{alignItems:"center"}}>
           <TouchableOpacity 
                key={1}
                onPress={()=>{
                    props.ctgFilter("all"), props.setActive(-1)
                }}
                
                
                >
                    <Badge style={[styles.container, {margin:5},
                    props.active == -1? styles.active: styles.inactive
                    ]}>
                        <Text style={{color: "white"}}>All</Text>
                    </Badge>

                </TouchableOpacity>
               </View> 


                <FlatList
                data={props.categories}
                horizontal
                contentContainerStyle ={{flexWrap : "wrap"}} 
                showsHorizontalScrollIndicator={false}

                renderItem={({item})=>(
                
                
                    <TouchableOpacity 
                    
                                key={item._id}
            
                                onPress={()=>{
                                    props.ctgFilter(item._id), props.setActive(props.categories.indexOf(item))
                                }}
                                
                                >
                                    <Badge style={[styles.container, {margin:5},
                                   props.active == props.categories.indexOf(item) ? styles.active: styles.inactive
                                    ]}>
                                        <Text style={{color: "white"}}>{item.name}</Text>
                                    </Badge>
                
                                </TouchableOpacity>
                
                    )}
                
                />
       </View>

      
//         <ScrollView 
//         bounces={true}
//         horizontal={true}
//         style={{backgroundColor: "#eff4f0", borderRadius:15}}
//         >
//             <ListItem style={{margin:0, padding: 0, borderRadius: 0 }}>
//                 <TouchableOpacity 
//                 key={1}
//                 onPress={()=>{
//                     ctgFilter("all"), setActive(-1)
//                 }}
                
//                 >
//                     <Badge style={[styles.container, {margin:5},
//                     active == -1? styles.active: styles.inactive
//                     ]}>
//                         <Text style={{color: "white"}}>All</Text>
//                     </Badge>

//                 </TouchableOpacity>

             
              

//                 {/* {categories.map((i)=>{
//                     <TouchableOpacity 
                    
//                     key={i._id}

//                     onPress={()=>{
//                         ctgFilter(i._id), setActive(categories.indexOf(i))
//                     }}
                    
//                     >
//                         <Badge style={[styles.container, {margin:5},
//                         active == categories.indexOf(i) ? styles.active: styles.inactive
//                         ]}>
//                             <Text style={{color: "white"}}>{i.name}</Text>
//                         </Badge>
    
//                     </TouchableOpacity>
//                 })} */}
// <SafeAreaView style={{ flex: 1,
//     marginTop: StatusBar.currentHeight || 0,}} >
// <FlatList
//                 data={categories}
//                 horizontal
//                 renderItem={({item})=>(
                
                
//                     <TouchableOpacity 
                    
//                                 key={item._id}
            
//                                 onPress={()=>{
//                                     ctgFilter(item._id), setActive(categories.indexOf(item))
//                                 }}
                                
//                                 >
//                                     <Badge style={[styles.container, {margin:5},
//                                     active == categories.indexOf(item) ? styles.active: styles.inactive
//                                     ]}>
//                                         <Text style={{color: "white"}}>{item.name}</Text>
//                                     </Badge>
                
//                                 </TouchableOpacity>
                
//                     )}
                
//                 />

// </SafeAreaView>
       
                
//             </ListItem>
//         </ScrollView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    active:{
        backgroundColor: Color.primary
    },
    inactive:{
        backgroundColor: "#b1e5d3"
    }
});

//make this component available to the app
export default CategoryFilter;
