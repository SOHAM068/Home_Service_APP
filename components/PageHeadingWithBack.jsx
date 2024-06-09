import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { AntDesign } from '@expo/vector-icons';

export default function PageHeadingWithBack({title}) {
    const router = useRouter();
  return (
    <TouchableOpacity
        onPress={() => router.back()}
        style={{display: 'flex', flexDirection: 'row', padding: 10}}
    >
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={{fontSize: 20, fontFamily: 'outfit-Bold', color: 'black'}}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})