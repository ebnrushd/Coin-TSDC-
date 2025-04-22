import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CircleCheck as CheckCircle2 } from 'lucide-react-native';
import { useWallet } from '@/context/WalletContext';
import Colors from '@/constants/Colors';

interface WalletCardProps {
  wallet: {
    id: string;
    name: string;
    publicKey: string;
  };
  isActive: boolean;
}

const WalletCard = ({ wallet, isActive }: WalletCardProps) => {
  const { setActiveWallet } = useWallet();
  
  const handleSelect = () => {
    setActiveWallet(wallet.id);
  };
  
  return (
    <TouchableOpacity onPress={handleSelect} disabled={isActive}>
      <View style={[styles.walletCard, isActive && styles.activeWalletCard]}>
        <LinearGradient
          colors={isActive ? 
            [Colors.cardGradientStart, Colors.cardGradientEnd] : 
            ['rgba(60, 60, 80, 0.6)', 'rgba(40, 40, 50, 0.6)']}
          style={styles.walletGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.walletHeader}>
            <Text style={styles.walletName}>{wallet.name}</Text>
            {isActive && <CheckCircle2 size={20} color={Colors.success} />}
          </View>
          
          <Text style={styles.walletBalance}>0.0000 TSDC</Text>
          
          <Text style={styles.walletAddress} numberOfLines={1}>
            {wallet.publicKey.slice(0, 12)}...{wallet.publicKey.slice(-12)}
          </Text>
          
          {isActive && (
            <View style={styles.activeIndicator}>
              <Text style={styles.activeText}>Active</Text>
            </View>
          )}
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  walletCard: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  activeWalletCard: {
    shadowColor: Colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  walletGradient: {
    padding: 16,
    borderRadius: 16,
  },
  walletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  walletName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.text,
  },
  walletBalance: {
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    color: Colors.text,
    marginBottom: 8,
  },
  walletAddress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text,
    opacity: 0.7,
  },
  activeIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(100, 200, 100, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  activeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: Colors.success,
  },
});

export default WalletCard;