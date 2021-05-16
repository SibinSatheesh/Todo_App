import * as React from 'react';
import { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Alert,
} from 'react-native';

import {
   Card, FAB
} from 'react-native-paper';

import {useSelector, useDispatch} from 'react-redux'
const Home = ({navigation})=>{

    // const [data, setData] = useState([])
    //const [loading, setLoading] =  useState(true)

    const dispatch = useDispatch()

    const {data,loading} = useSelector((state)=>{
        return state
    })
    console.log(data)

    const fetchData = ()=>{
        fetch("http://10.0.2.2:3000/")
        .then(res=>res.json())
        .then(results=>{
            console.log(results)
            
            //setData(results)
            //setLoading(false) 

            dispatch({type:"ADD_DATA",payload:results})
            dispatch({type:"SET_LOADING",payload:false})

        }).catch(err=>{
            Alert.alert("Something went wrong")
        })
    }

     useEffect(()=>{
       fetchData()
    },[])
    
    const renderList = ((item)=>{

        return(
            
            <Card style={ styles.myCard}
                onPress={() => navigation.navigate("Profile",{item})}
                >
                <View style={ styles.cardView}>
                    <Image
                        style={{ height:70, width: 70}}
                        source={require('../assets/person.jpg')}
                    />
                    <View styles={{marginLeft:10}}>
                        <Text style={styles.text1}>{item.name}</Text> 
                        <Text style={styles.text2}>{item.position}</Text>
                    </View>
                </View>
            </Card>
        )
    })     
        return(
            
            <View style={{flex:1}}>
                 <FlatList
                    data={data}
                    renderItem={ ({item})=> {
                    return renderList(item)
                     }}
                    keyExtractor={item=>item._id}
                    onRefresh={()=>fetchData()}
                    refreshing={loading}
                />
           
                
                    <FAB 
                        onPress={() => navigation.navigate("Create")}
                        style={styles.fab}
                        icon="plus"
                        small={false}
                    />  
            </View>  
                   
   )     
}

const styles = StyleSheet.create({
    myCard:{
        margin:5,
        flexDirection:"row",
    },
    cardView:{
        padding:7,
        flexDirection:"row",
    },
    text1:{
        fontSize:20,
        fontWeight:"bold",
        marginTop:5,
        marginLeft:5,
        color:"#2f4f4f"
    },
    text2:{
        fontSize:17,
        marginTop:5,
        marginLeft:5,
        fontStyle:"italic",
        color:"#2f4f4f",
    },
    fab:{
        position:'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor:"#008b8b"
    },
})

export default Home;