import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import Header from './Header'
import Slider from './Slider'
import Category from './Category'
import Business from './Business'

export default function Home() {
  return (
    <>
        <ScrollView>
          <Header />
          <View style={{padding: 20}}>
            <Slider />
            <Category />
            <Business />
          </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({

})