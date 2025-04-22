import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Copy } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import TokenChart from '@/components/TokenChart';
import TokenInfo from '@/components/TokenInfo';
import { useWallet } from '@/context/WalletContext';
import Colors from '@/constants/Colors';

export default function DashboardScreen() {
  const { activeWallet, balance } = useWallet();
  
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync('7YCWYFDaKACX2Lqac2k8XV9v5nRdsMLwrDfeaUWSTfjv');
    if (Platform.OS !== 'web') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
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
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://images2.imgbox.com/8b/3e/ZFLnvFPL_o.png' }}
              style={styles.logo} 
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Coin (TSDC)</Text>
        </View>
        
        <View style={styles.balanceCard}>
          <LinearGradient
            colors={[Colors.cardGradientStart, Colors.cardGradientEnd]}
            style={styles.balanceGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.balanceLabel}>TSDC Balance</Text>
            <Text style={styles.balanceValue}>{balance ? balance.toFixed(4) : '0.0000'}</Text>
            
            {activeWallet ? (
              <Text style={styles.walletAddress} numberOfLines={1}>
                {activeWallet.publicKey.slice(0, 6)}...{activeWallet.publicKey.slice(-6)}
              </Text>
            ) : (
              <TouchableOpacity style={styles.createWalletButton} onPress={() => {}}>
                <Text style={styles.createWalletText}>Create Wallet</Text>
              </TouchableOpacity>
            )}
          </LinearGradient>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.sectionTitle}>Price Chart</Text>
          <TokenChart />
        </View>
        
        <View style={styles.tokenInfoContainer}>
          <Text style={styles.sectionTitle}>Token Info</Text>
          <TokenInfo />
        </View>
        
        <View style={styles.contractContainer}>
          <Text style={styles.contractLabel}>Contract Address</Text>
          <View style={styles.contractAddressRow}>
            <Text style={styles.contractAddress} numberOfLines={1}>
              7YCWYFDaKACX2Lqac2k8XV9v5nRdsMLwrDfeaUWSTfjv
            </Text>
            <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
              <Copy size={18} color={Colors.text} />
            </TouchableOpacity>
          </View>
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
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: Colors.secondary,
    borderRadius: 60,
    padding: 5,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: Colors.text,
    textAlign: 'center',
  },
  balanceCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  balanceGradient: {
    padding: 24,
    borderRadius: 16,
  },
  balanceLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text,
    opacity: 0.8,
  },
  balanceValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 42,
    color: Colors.text,
    marginVertical: 8,
  },
  walletAddress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text,
    opacity: 0.7,
  },
  createWalletButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  createWalletText: {
    fontFamily: 'Poppins-Medium',
    color: Colors.text,
    fontSize: 14,
  },
  chartContainer: {
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
  tokenInfoContainer: {
    backgroundColor: 'rgba(30, 30, 40, 0.5)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  contractContainer: {
    backgroundColor: 'rgba(30, 30, 40, 0.5)',
    borderRadius: 16,
    padding: 16,
  },
  contractLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 8,
  },
  contractAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contractAddress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text,
    opacity: 0.8,
    flex: 1,
  },
  copyButton: {
    padding: 8,
  },
});