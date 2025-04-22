import { Tabs } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { ChartBar as BarChart2, Wallet, ArrowLeftRight, Settings } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import Colors from '@/constants/Colors';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          ...styles.tabBar,
          height: 80 + (Platform.OS === 'ios' ? insets.bottom : 0),
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 10,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.inactiveTab,
        tabBarLabelStyle: styles.tabBarLabel,
        headerTransparent: true,
        headerStyle: { backgroundColor: 'transparent' },
        headerTitleStyle: styles.headerTitle,
        headerBackground: () => (
          <BlurView 
            intensity={100} 
            tint="dark" 
            style={StyleSheet.absoluteFill} 
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <BarChart2 size={size} color={color} />
          ),
          headerTitle: 'Coin (TSDC)',
          headerTitleAlign: 'center',
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color, size }) => (
            <Wallet size={size} color={color} />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Tabs.Screen
        name="trade"
        options={{
          title: 'Trade',
          tabBarIcon: ({ color, size }) => (
            <ArrowLeftRight size={size} color={color} />
          ),
          headerTitleAlign: 'center',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
          headerTitleAlign: 'center',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    borderTopWidth: 0,
    backgroundColor: 'rgba(18, 18, 22, 0.8)',
    elevation: 0,
    shadowOpacity: 0,
    paddingTop: 10,
  },
  tabBarLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#FFFFFF',
  },
});