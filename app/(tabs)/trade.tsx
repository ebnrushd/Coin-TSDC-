import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, RefreshCcw } from 'lucide-react-native';
import Colors from '@/constants/Colors';

export default function TradeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  
  const handleRefresh = () => {
    setIsLoading(true);
    setRefreshKey(prevKey => prevKey + 1);
  };
  
  return (
    <LinearGradient
      colors={[Colors.backgroundGradientStart, Colors.backgroundGradientEnd]}
      style={styles.container}
    >
      <View style={styles.statusBar} />
      <View style={styles.header}>
        <Text style={styles.title}>TSDC Trading</Text>
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
          <RefreshCcw size={20} color={Colors.text} />
        </TouchableOpacity>
      </View>
      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading DexTools...</Text>
        </View>
      )}
      
      <WebView
        key={refreshKey}
        source={{ uri: 'https://www.dextools.io/token/tsdcoin' }}
        style={[styles.webView, isLoading ? { opacity: 0 } : { opacity: 1 }]}
        onLoadEnd={() => setIsLoading(false)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    position: 'relative',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: Colors.text,
  },
  refreshButton: {
    position: 'absolute',
    right: 16,
    padding: 8,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 18, 22, 0.9)',
    zIndex: 10,
  },
  loadingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.text,
    marginTop: 16,
  },
  webView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});