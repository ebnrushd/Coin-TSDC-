import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, EyeOff, Eye, Info } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useWallet } from '@/context/WalletContext';
import Colors from '@/constants/Colors';

export default function ImportWalletScreen() {
  const router = useRouter();
  const { importWallet } = useWallet();
  const [walletName, setWalletName] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [password, setPassword] = useState('');
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const togglePrivateKeyVisibility = () => {
    setShowPrivateKey(!showPrivateKey);
  };
  
  const handleImportWallet = async () => {
    setError('');
    
    // Validation
    if (!walletName.trim()) {
      setError('Please enter a wallet name');
      return;
    }
    
    if (!privateKey.trim()) {
      setError('Please enter a private key');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    try {
      setIsLoading(true);
      await importWallet(walletName, privateKey, password);
      router.back();
    } catch (err) {
      setError('Failed to import wallet: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <LinearGradient
      colors={[Colors.backgroundGradientStart, Colors.backgroundGradientEnd]}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Import Wallet</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Wallet Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter wallet name"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={walletName}
            onChangeText={setWalletName}
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Private Key</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter private key"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={privateKey}
              onChangeText={setPrivateKey}
              secureTextEntry={!showPrivateKey}
              autoCapitalize="none"
              multiline
            />
            <TouchableOpacity onPress={togglePrivateKeyVisibility} style={styles.eyeButton}>
              {showPrivateKey ? (
                <EyeOff size={20} color={Colors.text} />
              ) : (
                <Eye size={20} color={Colors.text} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Create password"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            autoCapitalize="none"
          />
        </View>
        
        {error ? (
          <View style={styles.errorContainer}>
            <Info size={16} color={Colors.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        
        <View style={styles.infoContainer}>
          <Info size={16} color={Colors.text} style={{ opacity: 0.7 }} />
          <Text style={styles.infoText}>
            Your password will be used to encrypt your private key. Make sure to remember it.
          </Text>
        </View>
        
        <TouchableOpacity
          style={[styles.importButton, (isLoading || !walletName || !privateKey || !password) && styles.disabledButton]}
          onPress={handleImportWallet}
          disabled={isLoading || !walletName || !privateKey || !password}
        >
          <LinearGradient
            colors={[Colors.secondaryLight, Colors.secondary]}
            style={styles.importButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.text} />
            ) : (
              <Text style={styles.importButtonText}>Import Wallet</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
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
  formGroup: {
    marginBottom: 20,
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
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    color: Colors.text,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  eyeButton: {
    padding: 16,
    alignSelf: 'flex-start',
    marginTop: 10,
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
    marginBottom: 32,
  },
  infoText: {
    color: Colors.text,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginLeft: 8,
    opacity: 0.7,
    flex: 1,
  },
  importButton: {
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
  importButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  importButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.text,
  },
});