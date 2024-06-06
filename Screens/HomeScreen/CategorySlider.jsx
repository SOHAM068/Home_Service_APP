import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'


export default function CategorySlider({ category, onCategoryPress }) {
    return (
        <TouchableOpacity
            onPress={() => onCategoryPress(category)}
            style={styles.categoryListContainer}>
            <View style={styles.Itemcontainer}>
                <Image source={{ uri: category?.icon }} style={styles.Icons} />
            </View>
            <Text style={{ fontFamily: 'outfit-Medium', marginTop: 4, fontSize: 13 }}>{category?.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Itemcontainer:{
        backgroundColor: Colors.Light_Gray ,
        borderRadius:99,
        padding: 17,
    },
    categoryListContainer:{
        flex:1,
        alignItems: 'center',
    },
    Icons:{
        width: 30,
        height: 30,
    },
})