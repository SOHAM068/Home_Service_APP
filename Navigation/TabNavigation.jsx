import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/HomeScreen/Home';
import Booking from '../Screens/BookingScreen/Booking';
import Profile from '../Screens/ProfileScreen/Profile';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false, tabBarActiveTintColor:'#8E3FFF'}}>
        <Tab.Screen name='Home' component={Home}
        options={{
            tabBarLabel: ({color})=>(
                <Text style={{color:color, fontSize:12, marginBottom:5}}>Home</Text>
            ),
            tabBarIcon: ({color, size})=>(
                <Text style={{color:color, fontSize:size-3}}>🏠</Text>
                // <FontAwesome name="home" size={size} color={color} />
            ),
        }}
        />
        <Tab.Screen name='Bookings' component={Booking}
        options={{
            tabBarLabel: ({color})=>(
                <Text style={{color:color, fontSize:12, marginBottom:5}}>Bookings</Text>
            ),
            tabBarIcon: ({color, size})=>(
                <FontAwesome name="bookmark" size={size} color={color} />
            ),
        }}
        />
        <Tab.Screen name='Profile' component={Profile}
        options={{
            tabBarLabel: ({color})=>(
                <Text style={{color:color, fontSize:12, marginBottom:5}}>Profile</Text>
            ),
            tabBarIcon: ({color, size})=>(
                <FontAwesome name="user" size={24} color={color} />
            ),
        }}
        />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})