import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useLocalSearchParams } from 'expo-router';

export default function BusinessListByCategory() {
    const navigation = useNavigation();
    const {category} = useLocalSearchParams();
    useEffect(() => {
        navigation.setOptions({
            headershown: true,
            headerTitle: category
        })
    },[])
  return (
    <View>
      <Text>{category}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})