import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '@/constants/Colors';

export default function UserIntro() {
    const {user} = useUser();
  return (
    <View style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:10
        // backgroundColor: Colors.Primary,
    }}>
      <Image source={{uri:user?.imageUrl}}
      style={{
        width:100,
        height:100,
        borderRadius:99
      }}
      />
      <Text style={{
        fontFamily:'outfit-Bold',
        fontSize:20, color: 'white'
      }}>{user?.fullName}</Text>
      <Text style={{
        fontFamily:'outfit',
        fontSize:16, color:'white'
      }}>~ {user?.primaryEmailAddress?.emailAddress}</Text>
    </View>
  )
}