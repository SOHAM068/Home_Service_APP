import { StyleSheet, Text, View, Image, TextInput} from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '@/constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

export default function Header() {
  // const user = {
  //   imageUrl: 'https://www.w3schools.com/howto/img_avatar.png'
  // }
  const {user, isLoading} = useUser();
  return user&&( // if user is not null
    <View style={styles.cotainer}>
      <View style={styles.profileMainContainer}>
        <View style={styles.profileContainer}>
          <Image source={{uri:user?.imageUrl}} style={styles.UserImage}/>
          <View>
            <Text style={{color:Colors.White, fontFamily:'outfit-Medium', fontSize:13}}>Welcome,</Text>
            <Text style={{color:Colors.White, fontFamily:'outfit-Bold',fontSize:16}}>{user.fullName}</Text>
          </View>
        </View>
        <View>
          <FontAwesome name="bookmark-o" size={24} color={Colors.White} />
        </View>
      </View>
      {/* Search Container */}
      <View>
        <View style={{backgroundColor:Colors.White, height: 50, borderRadius: 10, marginTop: 10, display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 10}}>
          <FontAwesome name="search" size={24} color={Colors.Gray} />
          <TextInput style={{color:Colors.Gray, fontSize:16, marginLeft: 10}} placeholder='Search For The Service' />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    cotainer:{
        backgroundColor: '#8E3FFF',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        padding: 20,
    },
    profileMainContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    UserImage:{
        width: 40,
        height: 40,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'white',
        
    }
})