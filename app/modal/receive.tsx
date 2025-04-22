import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Copy } from 'lucide-react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useWallet } from '@/context/WalletContext';
import Colors from '@/constants/Colors';

export default function ReceiveScreen() {
  const router = useRouter();
  const { activeWallet } = useWallet();
  
  const copyToClipboard = async () => {
    if (activeWallet) {
      await Clipboard.setStringAsync(activeWallet.publicKey);
      if (Platform.OS !== 'web') {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    }
  };
  
  if (!activeWallet) {
    return (
      <LinearGradient
        colors={[Colors.backgroundGradientStart, Colors.backgroundGradientEnd]}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Receive</Text>
          <View style={{ width: 24 }} />
        </View>
        
        <View style={styles.centerContent}>
          <Text style={styles.noWalletText}>No active wallet</Text>
          <Text style={styles.createWalletPrompt}>Please create or import a wallet first</Text>
          <TouchableOpacity
            style={styles.navigateButton}
            onPress={() => {
              router.back();
              router.push('/modal/create-wallet');
            }}
          >
            <LinearGradient
              colors={[Colors.primaryLight, Colors.primary]}
              style={styles.navigateButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.navigateButtonText}>Create Wallet</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
  
  return (
    <LinearGradient
      colors={[Colors.backgroundGradientStart, Colors.backgroundGradientEnd]}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Receive</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.subtitle}>Your Wallet Address</Text>
        
        <View style={styles.qrContainer}>
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
            style={styles.qrGradient}
          >
            <View style={styles.qrBackground}>
              <QRCode
                value={activeWallet.publicKey}
                size={200}
                backgroundColor="white"
                color="black"
              />
            </View>
          </LinearGradient>
        </View>
        
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>TSDC Address</Text>
          <View style={styles.addressBox}>
            <Text style={styles.addressText} numberOfLines={2}>
              {activeWallet.publicKey}
            </Text>
            <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
              <Copy size={20} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>How to Receive TSDC?</Text>
          <Text style={styles.infoText}>
            1. Share your QR code or wallet address with the sender.
          </Text>
          <Text style={styles.infoText}>
            2. The sender needs to input your address and specify the amount.
          </Text>
          <Text style={styles.infoText}>
            3. Once the transaction is processed on the Solana blockchain, your balance will be updated.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.text,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    alignItems: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 24,
  },
  qrContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 32,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  qrGradient: {
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrBackground: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
  },
  addressContainer: {
    width: '100%',
    marginBottom: 32,
  },
  addressLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 8,
  },
  addressBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  addressText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  copyButton: {
    padding: 8,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    width: '100%',
  },
  infoTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 16,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text,
    opacity: 0.8,
    marginBottom: 12,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  noWalletText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.text,
    marginBottom: 8,
  },
  createWalletPrompt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text,
    opacity: 0.7,
    marginBottom: 24,
    textAlign: 'center',
  },
  navigateButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  navigateButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigateButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.text,
  },
});