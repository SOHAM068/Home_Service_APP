import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation, useLocalSearchParams, useRouter } from 'expo-router';
import { db } from '../../constants/FirebaseConfig'
import { collection, query, getDocs } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function BusinessListByCategory() {
  const router = useRouter(); //To push to ListedCategories to the Details Screen
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headershown: false,
      headerTitle: category
    })
    GetBusinessList();
  }, [])

  const GetBusinessList = async () => {
    setLoading(true);
    setBusinessList([]);
    const q = query(collection(db, "Business_List"), where("category", "==", category));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setBusinessList(prev => [...prev, {id:doc?.id, ...doc.data()}])
    });
    setLoading(false);
  }
  return (
    <View style={{ padding: 5 }}>
      {businessList?.length > 0 ?
        <FlatList
          data={businessList}
          onRefresh={GetBusinessList}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <TouchableOpacity 
            onPress={() => router.push('/businessDetails/'+item.id)}
            style={styles.container}>
              <Image source={{ uri: item?.image[2] }} style={{ width: 100, height: 100, borderRadius: 15 }} />
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 15, fontFamily: 'outfit', color: Colors.Gray }}>{item.contactPerson}</Text>
                <Text style={{ fontSize: 18, fontFamily: 'outfit-Bold', color: Colors.Black }}>{item.name}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Ionicons name="location-sharp" size={20} color={Colors.Primary} />
                  <Text style={{ fontSize: 13, fontFamily: 'outfit', color: Colors.Gray, numberOfLines: 2 }}>
                    {item.address}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        /> :
        loading ? <ActivityIndicator style={{ marginTop: '70%'}} color={Colors.Primary} size={45} /> :
          <Text style={{ fontFamily: 'outfit', fontSize: 16, padding: 19, marginTop: '70%' }}>Currently no services for {category}, <Text style={{ fontFamily: 'outfit', fontSize: 16 }}>Please come check later!</Text></Text>

      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginRight: 9,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  subContainer: {
    flex: 1,
    display: 'flex',
    gap: 8
  }
})