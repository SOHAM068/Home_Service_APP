import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView} from 'react-native'
import React,{useState, useEffect} from 'react'
import Colors from '@/constants/Colors'
import { db } from '../../constants/FirebaseConfig'
import { collection, query, getDocs } from 'firebase/firestore';
import { FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import CategorySlider from './CategorySlider';

export default function Category() {
    const [categoryList, setCategoryList] = useState([]);
    const router = useRouter();
  useEffect(() => {
    GetCategoryList();
  },[])

  const GetCategoryList = async() => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setCategoryList(prev => [...prev, doc.data()])
    });
  }
  return (
    <>
    <View>
        <View style={styles.container}>
            <Text style={styles.Heading}>Categories</Text>
            <Text style={{fontFamily:'outfit-Medium', color:Colors.Primary, marginTop:6}}>View All</Text>
        </View>
        <SafeAreaView >
            <FlatList 
                data={categoryList}
                numColumns={4}
                renderItem={({item, index}) =>index<=3&&(
                    <CategorySlider 
                    category={item}
                    key={index}
                    onCategoryPress={(category) => router.push('/businessByCategory/'+item.name)}
                    />
                )}
            />
        </SafeAreaView>  
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    Heading: {
      fontSize: 18,
      fontFamily: 'outfit-Bold',
    },
    Itemcontainer:{
        backgroundColor: Colors.Light_Gray ,
        borderRadius:99,
        padding: 17,
    },
    categoryListContainer:{
        flex:1,
        alignItems: 'center',
    },
    Icons:{
        width: 30,
        height: 30,
    },
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        display: 'flex',
        marginTop: 10,
        marginBottom: 10
    },
  })