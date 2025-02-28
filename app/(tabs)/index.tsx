import { Text, View, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import { Link } from 'expo-router';
import * as Location from 'expo-location';
import { useEffect, useState, useCallback } from 'react';

export default function Index() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<any | null>(null);
  const [date, setDate] = useState<any | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPrayerTimes = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    const datee = new Date();
    const day = String(datee.getDate()).padStart(2, '0');
    const month = String(datee.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = datee.getFullYear();
    const d = `${day}-${month}-${year}`;
    const response = await fetch(`http://api.aladhan.com/v1/timings/${d}?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}&method=2&`);
    const data = await response.json();
    setPrayerTimes(data.data.timings);
    setDate(data.data.date);
  };

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPrayerTimes().then(() => setRefreshing(false));
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }

  function convertTo12HourFormat(time: string): string {
    const [hour, minute] = time.split(':').map(Number);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const adjustedHour = hour % 12 || 12;
    return `${adjustedHour}:${minute < 10 ? '0' : ''}${minute} ${ampm}`;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false} // Hide vertical scrollbar
      // showsHorizontalScrollIndicator={false} // Hide horizontal scrollbar
    >
      {refreshing && (
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
      )}
      {/* <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/direction">
        Go to About screen
      </Link> */}
      <Text>{new Date().toLocaleString()}</Text>
      <Text>{text}</Text>
      
      {prayerTimes && (
        <View
          style={{
            alignItems: "center",
          }}>
          <Text>Fajr: {convertTo12HourFormat(prayerTimes.Fajr)} </Text>
          <Text>Sunrise: {convertTo12HourFormat(prayerTimes.Sunrise)}</Text>
          <Text>Dhuhr: {convertTo12HourFormat(prayerTimes.Dhuhr)}</Text>
          <Text>Asr: {convertTo12HourFormat(prayerTimes.Asr)}</Text>
          <Text>Maghrib: {convertTo12HourFormat(prayerTimes.Maghrib)} </Text>
          <Text>Isha: {convertTo12HourFormat(prayerTimes.Isha)}</Text>
        </View>
      )}
      {date && (
        <View
          style={{
            alignItems: "center",
          }}>
          <Text>{date.gregorian.month.en} {date.gregorian.day}, {date.gregorian.year}</Text>
          <Text>{date.hijri.month.en} {date.hijri.day}, {date.hijri.year}</Text>
        </View>
      )}
    </ScrollView>
  );
}
