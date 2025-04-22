import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Import, Send, RadioReceiver as ReceiveIcon } from 'lucide-react-native';
import { useWallet } from '@/context/WalletContext';
import WalletCard from '@/components/WalletCard';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

export default function WalletScreen() {
  const router = useRouter();
  const { activeWallet, wallets, balance } = useWallet();
  
  const handleCreateWallet = () => {
    router.push('/modal/create-wallet');
  };
  
  const handleImportWallet = () => {
    router.push('/modal/import-wallet');
  };
  
  const handleSend = () => {
    router.push('/modal/send');
  };
  
  const handleReceive = () => {
    router.push('/modal/receive');
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
        <Text style={styles.title}>My Wallets</Text>
        
        {wallets.length > 0 ? (
          <>
            {wallets.map((wallet, index) => (
              <WalletCard 
                key={index}
                wallet={wallet}
                isActive={activeWallet && wallet.publicKey === activeWallet.publicKey}
              />
            ))}
          </>
        ) : (
          <View style={styles.emptyWalletContainer}>
            <Text style={styles.emptyWalletText}>No wallets created yet</Text>
            <Text style={styles.emptyWalletSubtext}>
              Create or import a wallet to start using TSDC coin
            </Text>
          </View>
        )}
        
        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCreateWallet}>
            <LinearGradient
              colors={[Colors.primaryLight, Colors.primary]}
              style={styles.actionButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Plus size={24} color={Colors.text} />
              <Text style={styles.actionButtonText}>Create</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleImportWallet}>
            <LinearGradient
              colors={[Colors.secondaryLight, Colors.secondary]}
              style={styles.actionButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Import size={24} color={Colors.text} />
              <Text style={styles.actionButtonText}>Import</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
        {activeWallet && (
          <View style={styles.transactionButtonsContainer}>
            <TouchableOpacity style={styles.transactionButton} onPress={handleSend}>
              <LinearGradient
                colors={['rgba(255, 100, 100, 0.8)', 'rgba(220, 50, 50, 0.8)']}
                style={styles.transactionButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Send size={24} color={Colors.text} />
                <Text style={styles.transactionButtonText}>Send</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.transactionButton} onPress={handleReceive}>
              <LinearGradient
                colors={['rgba(100, 200, 100, 0.8)', 'rgba(50, 180, 50, 0.8)']}
                style={styles.transactionButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <ReceiveIcon size={24} color={Colors.text} />
                <Text style={styles.transactionButtonText}>Receive</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.transactionHistoryContainer}>
          <Text style={styles.sectionTitle}>Transaction History</Text>
          
          {activeWallet ? (
            <View style={styles.emptyTransactionsContainer}>
              <Text style={styles.emptyTransactionsText}>No transactions yet</Text>
            </View>
          ) : (
            <View style={styles.noWalletContainer}>
              <Text style={styles.noWalletText}>Create a wallet to see transactions</Text>
            </View>
          )}
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
  emptyWalletContainer: {
    backgroundColor: 'rgba(30, 30, 40, 0.5)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyWalletText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 8,
  },
  emptyWalletSubtext: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.text,
    opacity: 0.7,
    textAlign: 'center',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  actionButtonGradient: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
  },
  actionButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text,
    marginTop: 8,
  },
  transactionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  transactionButton: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  transactionButtonGradient: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
  },
  transactionButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text,
    marginTop: 8,
  },
  transactionHistoryContainer: {
    backgroundColor: 'rgba(30, 30, 40, 0.5)',
    borderRadius: 16,
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: Colors.text,
    marginBottom: 16,
  },
  emptyTransactionsContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyTransactionsText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text,
    opacity: 0.7,
  },
  noWalletContainer: {
    padding: 24,
    alignItems: 'center',
  },
  noWalletText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.text,
    opacity: 0.7,
  },
});