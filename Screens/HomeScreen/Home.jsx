import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Header'
import Slider from './Slider'
import Category from './Category'

export default function Home() {
  return (
    <View>
      <Header />
      <View style={{padding: 20}}>
        <Slider />
        <Category />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

})