import { FlatList, StyleSheet, Text, View, Image} from 'react-native'
import React from 'react'

export default function BusinessPhotos({business}) {
  return (
    <View>
        <Text style={{ fontSize: 17, fontFamily: 'outfit-Medium', color: 'black' }}>Service Photos</Text>
        <FlatList 
        data={business?.image}
        numColumns={2}
        renderItem={({item})=>{
            return <Image 
            source={{uri: item}}
            style={{width: '50%', height: 100, borderRadius: 15, flex: 1, margin: 5}}
            />

        }}
        />
    </View>
  )
}

const styles = StyleSheet.create({})