import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import CalendarPicker from 'react-native-calendar-picker';
import Colors from '@/constants/Colors';
import { FlatList } from 'react-native';

export default function BookingModal({ hideModal }) {
    const [timeshow, setTimeShow] = useState();
    const [note, setNote] = useState('');
    useEffect(() => {
        getTime();
    }, [])
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
    }
    return (

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
                <View >
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
                            onDateChange={this.onDateChange}
                            width={300}
                            minDate={Date.now()}
                            selectedDayColor={Colors.Primary}
                            selectedDayTextColor='white'
                            todayBackgroundColor='#737373'
                        />
                    </View>
                    {/* Time Selection */}
                    <Text style={{ fontSize: 16, fontFamily: 'outfit-Medium', color: 'black', marginBottom: 8, marginTop: 12 }}>Select Time Slot</Text>
                    <View style={{ marginVertica: 8 }}>
                        <FlatList
                            data={timeshow}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={{ marginRight: 10 }}>
                                    <Text style={styles.unSelectedTime}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>

                    {/* Suggestion note area */}

                    <View contentContainerStyle={{ flexGrow: 1 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'outfit-Medium', color: 'black', marginBottom: 8, marginTop: 12 }}>Any Suggestions ( if any )</Text>
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder='Note'
                            onChangeText={(text) => setNote(text)}
                            numberOfLines={5}
                            multiline={true}
                        />
                    </View>
                </ScrollView>

            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    calanderStyle: {
        display: 'flex',
        padding: 10,
        backgroundColor: Colors.PRIMARY_LIGHT,
        borderRadius: 10,
        // marginHorizontal: 15,
    },
    unSelectedTime: {
        padding: 8,
        borderColor: Colors.PRIMARY_LIGHT,
        borderWidth: 1,
        borderRadius: 99,
        paddingHorizontal: 15,
    },
    textInputStyle:{
        borderWidth: 1, borderColor: Colors.PRIMARY_LIGHT, padding: 10, borderRadius: 10, padding: 10, height: 100, textAlignVertical: 'top' 
    }
})