import { View, Text, FlatList } from 'react-native'
import React from 'react'
import UserIntro from './UserIntro'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
// import MenuList from './userIntro'

export default function Profile() {
  const profileMenu = [
    {id : 1, name : "Home", icon: "home"},
    {id : 2, name : "My Bookings", icon: "bookmark-sharp"},
    {id : 3, name : "Contact Us", icon: "mail"},
    {id : 4, name : "Logout", icon: "log-out"},
  ];
  return (
    <View>
      <View style={{padding:20, backgroundColor:Colors.Primary}}>
        <Text style={{
          fontFamily: 'outfit-Bold',
          fontSize: 35,
        }}> Profile</Text>
        <UserIntro />
        {/* <MenuList/> */}
      </View >
      <View style={{paddingVertical:50}}>
        <FlatList 
          data={profileMenu}
          renderItem={({item, index}) => (
            <View style={{flexDirection:'row', display:'flex', alignItems: 'center', gap:10, marginBottom:30, paddingHorizontal:80}}>
              <Ionicons name={item.icon} size={33} color={Colors.Primary} />
              <Text style={{fontSize:20, fontFamily:'outfit'}}>{item.name}</Text>
            </View>
          )}
        />
      </View>
    </View>
  )
}