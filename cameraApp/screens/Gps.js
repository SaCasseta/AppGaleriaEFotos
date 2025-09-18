import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Gps() {
  const [isGpsEnabled, setIsGpsEnabled] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => { 
    toggleGps(); 
  }, []);

  const toggleGps = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão para acessar a localização foi negada.");
      setIsGpsEnabled(false);
      return;
    }
    setIsGpsEnabled((prev) => !prev);
  };

  useEffect(() => {
    if (isGpsEnabled) {
      const getGpsLocation = async () => {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        const latitude = currentLocation.coords.latitude
        const longitude = currentLocation.coords.longitude
        console.log(latitude)
        console.log(longitude)
        await AsyncStorage.setItem('latitudeAtual',JSON.stringify(latitude))
        await AsyncStorage.setItem('longitudeAtual',JSON.stringify(longitude))
      };
      getGpsLocation();
    } else {
      setLocation(null);
    }
  }, [isGpsEnabled]);

  return (
    <SafeAreaView>
    </SafeAreaView>
  );
}


