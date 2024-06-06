import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '@/constants/Colors'
import { db } from '../../constants/FirebaseConfig'
import { collection, query, getDocs } from 'firebase/firestore';
import { FlatList } from 'react-native';

export default function Business() {
  const [businessList, setBusinessList] = useState([]);
  useEffect(() => {
    GetBusinessList();
  }, [])

  const GetBusinessList = async () => {
    setBusinessList([]);
    const q = query(collection(db, "Business_List"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setBusinessList(prev => [...prev, doc.data()])
    });
  }
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.Heading}>Popular Business</Text>
        <Text style={{ fontFamily: 'outfit-Medium', color: Colors.Primary, marginTop: 6 }}>View All</Text>
      </View>
      <View>
        <FlatList
          data={businessList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => index <= 3 && (
            <View>
              <View style={styles.imageContainer}>
                <Image source={{ uri: item?.image[0] }} style={styles.image} />
                <View style={styles.infoContainer}>
                  <Text style={{ fontFamily:'outfit-Medium', fontSize: 17 }}>{item?.name}</Text>
                  <Text style={{ fontFamily: 'outfit', fontSize: 13, color:'grey' }}>{item?.contactPerson}</Text>
                  <Text style={{ fontFamily: 'outfit-Medium', fontSize: 10, padding:3, color:Colors.Primary, backgroundColor: Colors.PRIMARY_LIGHT, alignSelf:'flex-start', borderRadius:3, paddingHorizontal:7 }}>{item?.category}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  Heading: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: 'outfit-Bold',
  },
  infoContainer:{
    padding:7,
    display:'flex',
    gap:3
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    marginTop: 10,
    marginBottom: 10
  },
  image: {
    width: 160,
    height: 100,
    borderRadius: 10,
  },
  imageContainer: {
    padding: 10,
    backgroundColor: Colors.White,
    borderRadius: 10,
  }
})