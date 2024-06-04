import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import GlobalApi from '../../constants/GlobalApi'
import { FlatList } from 'react-native';

export default function Slider() {

  const [slider, setSliders] = React.useState();
  useEffect(() => {
    getSliders();
  },[])
  const getSliders = () => {
    GlobalApi.getSlider().then(resp => {
      console.log("resp",resp.sliders)
      setSliders(resp?.sliders)
    })
  }
  return (
    <View>
      <Text style={styles.Heading}>Offers For You</Text>
      <FlatList
        data={slider}
        horizontal={true}
        renderItem={({item, index}) => (
          <View>
            <Text>{item?.name}</Text>
            <Image style={styles.sliderImage} source={{uri: item?.image?.url}} />
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  Heading: {
    fontSize: 18,
    fontFamily: 'outfit-Bold',
  },
  sliderImage: {
    width: 270,
    height: 150,
    objectFit: 'contain',
    borderRadius:20
  }
})