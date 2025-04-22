import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Info, Scan } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useWallet } from '@/context/WalletContext';
import Colors from '@/constants/Colors';

export default function SendScreen() {
  const router = useRouter();
  const { activeWallet, balance, sendTransaction } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSend = async () => {
    setError('');
    
    // Validation
    if (!recipient.trim()) {
      setError('Please enter a recipient address');
      return;
    }
    
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    if (amountValue > (balance || 0)) {
      setError('Insufficient balance');
      return;
    }
    
    try {
      setIsLoading(true);
      await sendTransaction(recipient, amountValue);
      Alert.alert('Success', 'Transaction sent successfully');
      router.back();
    } catch (err) {
      setError('Transaction failed: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleScanQR = () => {
    // In a real app, this would open the camera to scan QR code
    Alert.alert('Feature Coming Soon', 'QR scanning will be available in the next update.');
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
          <Text style={styles.title}>Send</Text>
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
        <Text style={styles.title}>Send</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.balanceCard}>
          <LinearGradient
            colors={[Colors.cardGradientStart, Colors.cardGradientEnd]}
            style={styles.balanceGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceValue}>{balance ? balance.toFixed(4) : '0.0000'} TSDC</Text>
          </LinearGradient>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Recipient Address</Text>
          <View style={styles.addressContainer}>
            <TextInput
              style={styles.addressInput}
              placeholder="Enter recipient address"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={recipient}
              onChangeText={setRecipient}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={handleScanQR} style={styles.scanButton}>
              <Scan size={20} color={Colors.text} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Amount (TSDC)</Text>
          <TextInput
            style={styles.input}
            placeholder="0.0"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
          <View style={styles.maxContainer}>
            <TouchableOpacity
              style={styles.maxButton}
              onPress={() => setAmount(balance ? balance.toString() : '0')}
            >
              <Text style={styles.maxButtonText}>MAX</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {error ? (
          <View style={styles.errorContainer}>
            <Info size={16} color={Colors.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        
        <TouchableOpacity
          style={[styles.sendButton, (isLoading || !recipient || !amount) && styles.disabledButton]}
          onPress={handleSend}
          disabled={isLoading || !recipient || !amount}
        >
          <LinearGradient
            colors={['rgba(255, 100, 100, 0.8)', 'rgba(220, 50, 50, 0.8)']}
            style={styles.sendButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.text} />
            ) : (
              <Text style={styles.sendButtonText}>Send TSDC</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
        
        <View style={styles.infoContainer}>
          <Info size={16} color={Colors.text} style={{ opacity: 0.7 }} />
          <Text style={styles.infoText}>
            Double-check the recipient address before sending. Transactions cannot be reversed.
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
    fontSize: 32,
    color: Colors.text,
    marginTop: 8,
  },
  formGroup: {
    marginBottom: 20,
    position: 'relative',
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    color: Colors.text,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  addressContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
  },
  addressInput: {
    flex: 1,
    padding: 16,
    color: Colors.text,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  scanButton: {
    padding: 16,
  },
  maxContainer: {
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  maxButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  maxButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.text,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 100, 100, 0.2)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  errorText: {
    color: Colors.error,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginLeft: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  infoText: {
    color: Colors.text,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginLeft: 8,
    opacity: 0.7,
    flex: 1,
  },
  sendButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.6,
  },
  sendButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.text,
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