import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useNavigation } from 'expo-router';
import { db } from '../../constants/FirebaseConfig'
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import Colors from '@/constants/Colors';
import Intro from './Intro';
import { FontAwesome6 } from '@expo/vector-icons';
import BusinessPhotos from './BusinessPhotos';



export default function BusinessDetails(business) {
    const { businessid } = useLocalSearchParams();
    const navigation = useNavigation();
    const [businessDetails1, setBusinessDetails1] = useState();
    const [loading, setLoading] = useState(false);
    const [readMore, setReadMore] = useState(false);


    useLayoutEffect(() => {
        if (businessDetails1) {
            navigation.setOptions({
                headerShown: true,
                headerTitle: businessDetails1.name,
                headerStyle: styles.headerStyle,
                headerTintColor: styles.headerTintColor,
                headerTitleStyle: styles.headerTitleStyle,
            });
        } else {
            navigation.setOptions({
                headerShown: false,
            });
        }
    }, [businessDetails1]);

    useEffect(() => {
        getBusinessDetailsById();
    }, []);

    const getBusinessDetailsById = async () => {
        // Get Business Details by ID
        setLoading(true);
        const docRef = doc(db, "Business_List", businessid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setBusinessDetails1(docSnap.data());
        } else {
            console.log("No such document exists");
        }
        setLoading(false);
    }
    return (
        <View style={{ flex: 1 }}>
            {loading ? <ActivityIndicator style={{ marginTop: '70%' }} size={'large'} color={Colors.Primary} /> :
            <>
                <Intro business={businessDetails1}/>
            </>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: Colors.Primary,  // Set your desired header background color
    },
    headerTintColor: '#fff',  // Set your desired header text color
    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,  // Set your desired header title font size
    },
    subContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingVertical: 5
    },
    horizontalLine: {
        borderWidth: 0.5,
        borderColor: 'gray',
        marginVertical: 17
    },
    aboutContainer: {

    },
    Heading: {
        fontSize: 17,
        fontFamily: 'outfit-Medium',
        color: 'black'
    }
})