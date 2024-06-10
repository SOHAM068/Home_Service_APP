import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import Colors from '@/constants/Colors';
import { FlatList } from 'react-native';
import { db } from '../../constants/FirebaseConfig';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { useLocalSearchParams } from 'expo-router';
// import { useUser } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';

export default function BookingModal({ hideModal }) {
    const [timeshow, setTimeShow] = useState([]);
    const [note, setNote] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('');
    const [businessDetails1, setBusinessDetails1] = useState();
    const { businessid } = useLocalSearchParams();
    // const { user } = useUser();

    const tokenCache = {
        async getToken(key) {
            try {
                return SecureStore.getItemAsync(key);
            } catch (err) {
                return null;
            }
        },
        async saveToken(key, value) {
            try {
                return SecureStore.setItemAsync(key, value);
            } catch (err) {
                return;
            }
        },
    };

    useEffect(() => {
        getTime();
        getBusinessDetailsById();
    }, []);

    const getTime = () => {
        const timeList = [];
        for (let i = 8; i < 12; i++) {
            timeList.push(i + ':00 AM');
            timeList.push(i + ':30 AM');
        }
        for (let i = 1; i < 7; i++) {
            timeList.push(i + ':00 PM');
            timeList.push(i + ':30 PM');
        }
        setTimeShow(timeList);
    };

    const onDateChange = (date) => {
        setSelectedDate(date);
    };

    const getBusinessDetailsById = async () => {
        const docRef = doc(db, "Business_List", businessid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setBusinessDetails1(docSnap.data());
        } else {
            console.log("No such document exists");
        }
    }

    const handleBooking = async () => {
        if (!selectedDate || !selectedTime) {
            Alert.alert('Error', 'Please select a date and time slot.');
            return;
        }

        try {
            const businessRef = doc(db, "Business_List", businessid);

            await addDoc(collection(db, 'bookings'), {
                date: selectedDate.toString(), // Ensure the date is saved as a string
                time: selectedTime,
                note: note,
                createdAt: new Date(),
                businessRef: businessRef, // Store the reference to the business document
                // userName: user.fullName,
            });

            Alert.alert('Success', 'Booking confirmed!');
            hideModal();
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
            console.error('Error adding document: ', error);
        }
    };


    return (
        <>

            <View style={{
                backgroundColor: 'white',
                borderRadius: 20,
                shadowColor: '#000',
                alignContent: 'center',
                padding: 15,
                elevation: 10, width: '93%', height: '95%'
            }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={100}
                >
                    <View>
                        <TouchableOpacity
                            onPress={() => hideModal()}
                            style={{ display: 'flex', flexDirection: 'row' }}
                        >
                            <AntDesign name="arrowleft" size={24} color="black" />
                            <Text style={{ fontSize: 20, fontFamily: 'outfit-Bold', color: 'black' }}>Booking</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <Text style={{ fontSize: 16, fontFamily: 'outfit-Medium', color: 'black', marginBottom: 8, marginTop: 12 }}>Select Date</Text>
                        <View style={styles.calanderStyle}>
                            <CalendarPicker
                                onDateChange={onDateChange}
                                width={300}
                                minDate={new Date()}
                                selectedDayColor={Colors.Primary}
                                selectedDayTextColor='white'
                                todayBackgroundColor='#737373'
                            />
                        </View>
                        <Text style={{ fontSize: 16, fontFamily: 'outfit-Medium', color: 'black', marginBottom: 8, marginTop: 12 }}>Select Time Slot</Text>
                        <View style={{ marginVertical: 8 }}>
                            <FlatList
                                data={timeshow}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={{ marginRight: 10 }}
                                        onPress={() => setSelectedTime(item)}
                                    >
                                        <Text style={[styles.unSelectedTime, selectedTime === item && styles.selectedTime]}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                        <View contentContainerStyle={{ flexGrow: 1 }}>
                            <Text style={{ fontSize: 16, fontFamily: 'outfit-Medium', color: 'black', marginBottom: 8, marginTop: 12 }}>Any Suggestions ( if any )</Text>
                            <TextInput
                                style={styles.textInputStyle}
                                placeholder='Note'
                                onChangeText={(text) => setNote(text)}
                                numberOfLines={5}
                                multiline={true}
                                value={note}
                            />
                        </View>
                        <TouchableOpacity
                            style={{ backgroundColor: Colors.Primary, padding: 10, borderRadius: 10, marginTop: 10 }}
                            onPress={handleBooking}
                        >
                            <Text style={{
                                fontSize: 18, fontFamily: 'outfit-Bold', color: 'white', textAlign: 'center',
                                elevation: 5,
                            }}>Confirm & Book</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    calanderStyle: {
        display: 'flex',
        padding: 10,
        backgroundColor: Colors.PRIMARY_LIGHT,
        borderRadius: 10,
    },
    unSelectedTime: {
        padding: 8,
        borderColor: Colors.PRIMARY_LIGHT,
        borderWidth: 1,
        borderRadius: 99,
        paddingHorizontal: 15,
    },
    selectedTime: {
        backgroundColor: Colors.Primary,
        color: 'white'
    },
    textInputStyle: {
        borderWidth: 1,
        borderColor: Colors.PRIMARY_LIGHT,
        padding: 10,
        borderRadius: 10,
        height: 100,
        textAlignVertical: 'top'
    }
});
