import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

const TokenInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Token Name</Text>
        <Text style={styles.infoValue}>TSDC Coin</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Symbol</Text>
        <Text style={styles.infoValue}>TSDC</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Network</Text>
        <Text style={styles.infoValue}>Solana</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Contract Address</Text>
        <Text style={styles.infoValue} numberOfLines={1}>7YCWYFDaKACX2Lqac2k8XV9v5nRdsMLwrDfeaUWSTfjv</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Token Type</Text>
        <Text style={styles.infoValue}>SPL Token</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Decimals</Text>
        <Text style={styles.infoValue}>9</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Launch Date</Text>
        <Text style={styles.infoValue}>2024</Text>
      </View>
      
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Website</Text>
        <Text style={styles.infoValue}>www.tsdcoin.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgba(75, 0, 130, 0.3)',
    borderRadius: 12,
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text,
    opacity: 0.7,
    flex: 1,
  },
  infoValue: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text,
    flex: 2,
    textAlign: 'right',
  },
});

export default TokenInfo;