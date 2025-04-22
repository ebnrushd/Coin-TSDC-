import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, EyeOff, Eye, Info } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useWallet } from '@/context/WalletContext';
import Colors from '@/constants/Colors';

export default function CreateWalletScreen() {
  const router = useRouter();
  const { createWallet } = useWallet();
  const [walletName, setWalletName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleCreateWallet = async () => {
    setError('');
    
    // Validation
    if (!walletName.trim()) {
      setError('Please enter a wallet name');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      setIsLoading(true);
      await createWallet(walletName, password);
      router.back();
    } catch (err) {
      setError('Failed to create wallet: ' + (err instanceof Error ? err.message : String(err)));
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
        <Text style={styles.title}>Create New Wallet</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.content}>
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
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter password"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeButton}>
              {showPassword ? (
                <EyeOff size={20} color={Colors.text} />
              ) : (
                <Eye size={20} color={Colors.text} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            placeholderTextColor="rgba(255, 255, 255, 0.5)"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
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
          style={[styles.createButton, (isLoading || !walletName || !password || !confirmPassword) && styles.disabledButton]}
          onPress={handleCreateWallet}
          disabled={isLoading || !walletName || !password || !confirmPassword}
        >
          <LinearGradient
            colors={[Colors.primaryLight, Colors.primary]}
            style={styles.createButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.text} />
            ) : (
              <Text style={styles.createButtonText}>Create Wallet</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
  },
  eyeButton: {
    padding: 16,
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
  createButton: {
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
  createButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.text,
  },
});