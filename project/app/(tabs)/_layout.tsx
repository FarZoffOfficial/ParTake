import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Chrome as Home, Users, Target, ShoppingBag, User } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E2FF3D',
        tabBarInactiveTintColor: '#718096',
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <BlurView tint="dark" intensity={70} style={StyleSheet.absoluteFill} />
        ),
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="play-finder"
        options={{
          title: 'Find Play',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="score-tracker"
        options={{
          title: 'Scores',
          tabBarIcon: ({ color, size }) => <Target size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{
          title: 'Market',
          tabBarIcon: ({ color, size }) => <ShoppingBag size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(26, 30, 35, 0.85)',
    borderTopWidth: 1,
    borderTopColor: '#2D3748',
    height: 56,
    elevation: 0,
  },
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
});