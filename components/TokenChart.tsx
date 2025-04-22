import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Colors from '@/constants/Colors';

const TokenChart = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  const chartHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: transparent;
            overflow: hidden;
          }
          iframe {
            width: 100%;
            height: 100%;
            border: none;
          }
        </style>
      </head>
      <body>
        <iframe
          id="dextswap-aggregator-widget"
          title="DEXTswap Aggregator"
          src="https://www.dextools.io/widget-aggregator/en/swap/solana/7YCWYFDaKACX2Lqac2k8XV9v5nRdsMLwrDfeaUWSTfjv"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </body>
    </html>
  `;
  
  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading DEXTswap...</Text>
        </View>
      )}
      
      <WebView
        originWhitelist={['*']}
        source={{ html: chartHTML }}
        style={styles.webview}
        onLoadEnd={() => setIsLoading(false)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scrollEnabled={false}
        bounces={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 420,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(30, 30, 40, 0.5)',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(18, 18, 22, 0.7)',
    zIndex: 10,
  },
  loadingText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.text,
    marginTop: 12,
  },
  webview: {
    backgroundColor: 'transparent',
  },
});

export default TokenChart;