import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import { Alert, Platform } from 'react-native';

interface Wallet {
  id: string;
  name: string;
  publicKey: string;
  encryptedPrivateKey: string;
}

interface WalletContextType {
  wallets: Wallet[];
  activeWallet: Wallet | null;
  balance: number | null;
  createWallet: (name: string, password: string) => Promise<void>;
  importWallet: (name: string, privateKey: string, password: string) => Promise<void>;
  setActiveWallet: (id: string) => void;
  sendTransaction: (recipient: string, amount: number) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [activeWallet, setActiveWallet] = useState<Wallet | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  // Load wallets from storage on initial render
  useEffect(() => {
    const loadWallets = async () => {
      try {
        const storedWallets = await getStoredWallets();
        if (storedWallets.length > 0) {
          setWallets(storedWallets);
          
          // Get active wallet ID from storage
          const activeWalletId = await getActiveWalletId();
          if (activeWalletId) {
            const active = storedWallets.find(w => w.id === activeWalletId) || storedWallets[0];
            setActiveWallet(active);
          } else {
            setActiveWallet(storedWallets[0]);
          }
        }
      } catch (error) {
        console.error('Failed to load wallets:', error);
      }
    };
    
    loadWallets();
  }, []);
  
  // Update balance when active wallet changes
  useEffect(() => {
    if (activeWallet) {
      fetchBalance(activeWallet.publicKey);
    } else {
      setBalance(null);
    }
  }, [activeWallet]);
  
  // Fetch balance from blockchain
  const fetchBalance = async (address: string) => {
    // This is a mock implementation
    // In a real app, this would call the Solana blockchain API
    try {
      // Mock balance for demo purposes
      const mockBalance = Math.random() * 1000;
      setBalance(mockBalance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      setBalance(null);
    }
  };
  
  // Generate a random Solana-like address
  const generateRandomAddress = async (): Promise<{ publicKey: string, privateKey: string }> => {
    // In a real app, this would use @solana/web3.js to generate a proper keypair
    const randomBytes = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      Math.random().toString()
    );
    
    const publicKey = randomBytes.substring(0, 44);
    const privateKey = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA512,
      randomBytes
    );
    
    return { publicKey, privateKey };
  };
  
  // Encrypt private key with password
  const encryptPrivateKey = async (privateKey: string, password: string): Promise<string> => {
    // This is a mock implementation
    // In a real app, this would use proper encryption techniques
    return privateKey + ':' + password; // Never do this in production!
  };
  
  // Store wallets in secure storage
  const storeWallets = async (walletsToStore: Wallet[]) => {
    if (Platform.OS === 'web') {
      // Use localStorage for web
      localStorage.setItem('tsdc_wallets', JSON.stringify(walletsToStore));
    } else {
      // Use SecureStore for native
      await SecureStore.setItemAsync('tsdc_wallets', JSON.stringify(walletsToStore));
    }
  };
  
  // Get stored wallets from secure storage
  const getStoredWallets = async (): Promise<Wallet[]> => {
    try {
      let walletsJson;
      
      if (Platform.OS === 'web') {
        // Use localStorage for web
        walletsJson = localStorage.getItem('tsdc_wallets');
      } else {
        // Use SecureStore for native
        walletsJson = await SecureStore.getItemAsync('tsdc_wallets');
      }
      
      return walletsJson ? JSON.parse(walletsJson) : [];
    } catch (error) {
      console.error('Error getting stored wallets:', error);
      return [];
    }
  };
  
  // Store active wallet ID
  const storeActiveWalletId = async (id: string) => {
    if (Platform.OS === 'web') {
      localStorage.setItem('tsdc_active_wallet', id);
    } else {
      await SecureStore.setItemAsync('tsdc_active_wallet', id);
    }
  };
  
  // Get active wallet ID
  const getActiveWalletId = async (): Promise<string | null> => {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem('tsdc_active_wallet');
      } else {
        return await SecureStore.getItemAsync('tsdc_active_wallet');
      }
    } catch (error) {
      console.error('Error getting active wallet ID:', error);
      return null;
    }
  };
  
  // Create a new wallet
  const createWallet = async (name: string, password: string) => {
    try {
      // Generate a new keypair
      const { publicKey, privateKey } = await generateRandomAddress();
      
      // Encrypt the private key
      const encryptedPrivateKey = await encryptPrivateKey(privateKey, password);
      
      // Create the wallet object
      const newWallet: Wallet = {
        id: Date.now().toString(),
        name,
        publicKey,
        encryptedPrivateKey,
      };
      
      // Update state
      const updatedWallets = [...wallets, newWallet];
      setWallets(updatedWallets);
      setActiveWallet(newWallet);
      
      // Store in secure storage
      await storeWallets(updatedWallets);
      await storeActiveWalletId(newWallet.id);
      
      // Fetch balance
      fetchBalance(publicKey);
    } catch (error) {
      console.error('Failed to create wallet:', error);
      throw new Error('Failed to create wallet');
    }
  };
  
  // Import an existing wallet
  const importWallet = async (name: string, privateKey: string, password: string) => {
    try {
      // In a real app, validate the private key and derive the public key
      // For this mock implementation, we'll generate a random public key
      const randomBytes = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        privateKey
      );
      const publicKey = randomBytes.substring(0, 44);
      
      // Encrypt the private key
      const encryptedPrivateKey = await encryptPrivateKey(privateKey, password);
      
      // Create the wallet object
      const newWallet: Wallet = {
        id: Date.now().toString(),
        name,
        publicKey,
        encryptedPrivateKey,
      };
      
      // Update state
      const updatedWallets = [...wallets, newWallet];
      setWallets(updatedWallets);
      setActiveWallet(newWallet);
      
      // Store in secure storage
      await storeWallets(updatedWallets);
      await storeActiveWalletId(newWallet.id);
      
      // Fetch balance
      fetchBalance(publicKey);
    } catch (error) {
      console.error('Failed to import wallet:', error);
      throw new Error('Failed to import wallet');
    }
  };
  
  // Change active wallet
  const handleSetActiveWallet = async (id: string) => {
    const wallet = wallets.find(w => w.id === id);
    if (wallet) {
      setActiveWallet(wallet);
      await storeActiveWalletId(id);
      fetchBalance(wallet.publicKey);
    }
  };
  
  // Send transaction
  const sendTransaction = async (recipient: string, amount: number) => {
    // This is a mock implementation
    // In a real app, this would sign and send a transaction using @solana/web3.js
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // Mock success for demo purposes
        if (Math.random() > 0.2) { // 80% chance of success
          // Update balance
          if (balance !== null) {
            setBalance(balance - amount);
          }
          resolve();
        } else {
          reject(new Error('Transaction failed. Please try again.'));
        }
      }, 2000);
    });
  };
  
  const value: WalletContextType = {
    wallets,
    activeWallet,
    balance,
    createWallet,
    importWallet,
    setActiveWallet: handleSetActiveWallet,
    sendTransaction,
  };
  
  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};