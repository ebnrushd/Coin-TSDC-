import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Linking, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, Shield, Eye, Moon, Globe, CircleHelp as HelpCircle, Info } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [isBiometricEnabled, setIsBiometricEnabled] = React.useState(false);
  
  const toggleDarkMode = () => setIsDarkMode(previousState => !previousState);
  const toggleBiometric = () => setIsBiometricEnabled(previousState => !previousState);
  
  const openWebsite = () => {
    Linking.openURL('https://www.tsdcoin.com');
  };
  
  return (
    <LinearGradient
      colors={[Colors.backgroundGradientStart, Colors.backgroundGradientEnd]}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Settings</Text>
        
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://www.tsdcoin.com/images/logo.png' }} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <Text style={styles.appName}>Coin (TSDC)</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Moon size={22} color={Colors.text} style={styles.settingIcon} />
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              thumbColor={isDarkMode ? Colors.primary : Colors.inactiveTab}
              trackColor={{ false: 'rgba(255, 255, 255, 0.1)', true: 'rgba(139, 92, 246, 0.3)' }}
              ios_backgroundColor="rgba(255, 255, 255, 0.1)"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Shield size={22} color={Colors.text} style={styles.settingIcon} />
              <Text style={styles.settingText}>Security Settings</Text>
            </View>
            <ChevronRight size={20} color={Colors.text} opacity={0.5} />
          </TouchableOpacity>
          
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Eye size={22} color={Colors.text} style={styles.settingIcon} />
              <Text style={styles.settingText}>Biometric Authentication</Text>
            </View>
            <Switch
              value={isBiometricEnabled}
              onValueChange={toggleBiometric}
              thumbColor={isBiometricEnabled ? Colors.primary : Colors.inactiveTab}
              trackColor={{ false: 'rgba(255, 255, 255, 0.1)', true: 'rgba(139, 92, 246, 0.3)' }}
              ios_backgroundColor="rgba(255, 255, 255, 0.1)"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={openWebsite}>
            <View style={styles.settingLeft}>
              <Globe size={22} color={Colors.text} style={styles.settingIcon} />
              <Text style={styles.settingText}>Website</Text>
            </View>
            <ChevronRight size={20} color={Colors.text} opacity={0.5} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <HelpCircle size={22} color={Colors.text} style={styles.settingIcon} />
              <Text style={styles.settingText}>Help & Support</Text>
            </View>
            <ChevronRight size={20} color={Colors.text} opacity={0.5} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Info size={22} color={Colors.text} style={styles.settingIcon} />
              <Text style={styles.settingText}>Terms & Privacy Policy</Text>
            </View>
            <ChevronRight size={20} color={Colors.text} opacity={0.5} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 100,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.text,
    marginBottom: 24,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  appName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.text,
    marginBottom: 4,
  },
  appVersion: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text,
    opacity: 0.6,
  },
  section: {
    backgroundColor: 'rgba(30, 30, 40, 0.5)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 16,
  },
  settingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text,
  },
});