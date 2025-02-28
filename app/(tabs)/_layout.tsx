import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#008A00', tabBarLabelStyle: { fontSize: 18 }, tabBarIconStyle: { display: "none" } }}>
      <Tabs.Screen name="index" options={{ title: 'Times', headerShown: false, }} />
      
      <Tabs.Screen name="direction" options={{ title: 'Qibla', headerShown: false }} />
    </Tabs>
  );
}
