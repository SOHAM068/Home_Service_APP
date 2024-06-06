import { StyleSheet, Text, View} from 'react-native'
import React from 'react'
import Header from './Header'
import Slider from './Slider'
import Category from './Category'
import Business from './Business'
import { ScrollView } from 'react-native-virtualized-view'

export default function Home() {
  return (
    <View>
      <ScrollView>
        <Header />
        <View style={{padding: 20}}>
          <Slider />
          <Category />
          <Business />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({

})