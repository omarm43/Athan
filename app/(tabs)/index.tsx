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
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDay, setCurrentDay] = useState(new Date().getDate());

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
    // console.log("Prayer times fetched");
  };

  useEffect(() => {
    fetchPrayerTimes();
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      if (now.getDate() !== currentDay) {
        setCurrentDay(now.getDate());
        fetchPrayerTimes();
      }
    }, 1000); // Update every second
    return () => clearInterval(interval);
  }, [currentDay]);

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

  function getClosestPrayerTime(prayerTimes: any): string {
    const now = new Date();
    const times = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];
    let closestTime = times[0];
    let minDiff = Infinity;

    times.forEach(time => {
      const [hour, minute] = prayerTimes[time].split(':').map(Number);
      const prayerTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
      const diff = Math.abs(prayerTime.getTime() - now.getTime());

      if (diff < minDiff) {
        minDiff = diff;
        closestTime = time;
      }
    });

    return closestTime;
  }

  const closestPrayerTime = prayerTimes ? getClosestPrayerTime(prayerTimes) : null;

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

      {date && (
        <View
          style={{
            alignItems: "center"
          }}>
          <Text>{date.gregorian.month.en} {date.gregorian.day}, {date.gregorian.year}</Text>
          <Text>{date.hijri.month.en} {date.hijri.day}, {date.hijri.year}</Text>
        </View>
      )}

      <Text style={{ marginVertical: 20 }}>{currentTime.toLocaleTimeString("en-US")}</Text>

      {prayerTimes && (
        <View
          style={{
            alignItems: "center",
          }}>
          {["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"].map((time) => (
            <Text key={time} style={closestPrayerTime === time ? { fontWeight: 'bold', color: 'green' } : {}}>
              {time}: {convertTo12HourFormat(prayerTimes[time])}
            </Text>
          ))}
        </View>
      )}

      <Text style={{ marginVertical: 20 }}>{text}</Text>

    </ScrollView>
  );
}
