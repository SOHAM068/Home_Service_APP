import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import PageHeadingWithBack from '@/components/PageHeadingWithBack'
import { db } from '../../constants/FirebaseConfig'
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import Colors from '@/constants/Colors';

export default function Booking() {
  const [loading, setLoading] = useState(false);
  const [showbooking, setShowBooking] = useState();

  useEffect(() => {
    getBookings();
  },[])

  const getBookings = async() => {
    setLoading(true);
    setShowBooking([]);
    const q = query(collection(db, "bookings"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setShowBooking(prev => [...prev, doc.data()])
    });
    setLoading(false);
  }
  return (
    <View>
      <PageHeadingWithBack title="Bookings" />
      <View>
        <FlatList 
        data={showbooking}
        renderItem={({item, index}) => (
          <View>
            <View style={{padding:10, margin:10, backgroundColor:Colors.Primary, borderRadius:10}}>
              <Text style={{color:'white', fontFamily:'outfit-Bold', fontSize:20}}>{item?.name}</Text>
              <Text style={{color:'white', fontFamily:'outfit', fontSize:16}}>{item?.email}</Text>
              <Text style={{color:'white', fontFamily:'outfit', fontSize:16}}>{item?.phone}</Text>
              <Text style={{color:'white', fontFamily:'outfit', fontSize:16}}>{item?.date}</Text>
              <Text style={{color:'white', fontFamily:'outfit', fontSize:16}}>{item?.time}</Text>
            </View>
          </View>
        )}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})