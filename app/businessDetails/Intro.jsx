import { Image, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import BusinessPhotos from './BusinessPhotos';
import BookingModal from './BookingModal';
import { ScrollView } from 'react-native-virtualized-view'

export default function Intro({ business }) {
  const [readMore, setReadMore] = useState(false);
  const [showModal, setShowModal] = useState(true);
  return (
    <View>
      <ScrollView style={{height:'90%'}}>
        <View>
          <Image source={{ uri: business?.image[0] }} style={{ width: '100%', height: 230 }} />
        </View>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 25, fontFamily: 'outfit-Bold', color: 'black' }}>{business?.name}</Text>
          <View style={styles.subContainer}>
            <Text style={{ fontSize: 18, fontFamily: 'outfit-Medium', color: Colors.Primary }}>{business?.contactPerson}</Text>
            <Text style={{ fontSize: 14, fontFamily: 'outfit', color: Colors.Primary, backgroundColor: Colors.PRIMARY_LIGHT, paddingHorizontal: 6, paddingVertical: 3, borderRadius: 5 }}>{business?.category}</Text>
          </View>
          <Text style={{ fontSize: 14, fontFamily: 'outfit', color: 'grey', alignItems: 'center' }}><FontAwesome6 name="location-dot" size={18} color={Colors.Primary} />{business?.address}</Text>

          <View style={styles.horizontalLine} />

          <View style={styles.aboutContainer}>
            <Text style={styles.Heading}>About Me</Text>
            <Text style={{ marginTop: 8, fontSize: 14, fontFamily: 'outfit', color: 'gray', lineHeight: 23 }} numberOfLines={readMore ? 20 : 5}>{business?.about}</Text>
            <TouchableOpacity onPress={() => setReadMore(!readMore)}>
              <Text style={{ fontSize: 14, fontFamily: 'outfit', color: Colors.Primary, lineHeight: 23 }}>
                {readMore ? 'Read Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.horizontalLine} />

          <BusinessPhotos business={business} />
        </View>

      </ScrollView>
      <View style={{display:'flex', marginBottom:5, flexDirection:'row',display:'flex', margin:5, gap:8}}>
        <TouchableOpacity style={styles.msgButton}>
          <Text style={{ fontSize: 17, fontFamily: 'outfit-Medium', color: Colors.Primary, textAlign:'center' }}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.BookButton} onPress={() => setShowModal(true)}>
          <Text style={{ fontSize: 17, fontFamily: 'outfit-Medium', color: Colors.White, textAlign:'center' }}>Book</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType='slide'
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:"rgba(0,0,0,0.5)"}}>
          <BookingModal hideModal={()=>setShowModal(false)}/> 
        </View>
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 5
  },
  horizontalLine: {
    borderWidth: 0.5,
    borderColor: 'gray',
    marginVertical: 17
  },
  aboutContainer: {

  },
  Heading: {
    fontSize: 17,
    fontFamily: 'outfit-Medium',
    color: 'black'
  },
  msgButton: {
    padding: 15, alignItems: 'center',
    borderWidth:1,
    borderColor: Colors.Primary,
    borderRadius: 99,
    flex:1
  },
  BookButton: {
    backgroundColor: Colors.Primary,
    padding: 15, alignItems: 'center',
    borderWidth:1,
    borderColor: Colors.Primary,
    borderRadius: 99,
    flex:1
  }
})