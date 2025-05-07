import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import styles from '../styles/currency.styles';

type CurrencyData = {
  USDBRL: { bid: string };
  EURBRL: { bid: string };
  BTCBRL: { bid: string };
};

export default function CurrencyScreen() {
  const [data, setData] = useState<CurrencyData | null>(null);

  useEffect(() => {
    fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cotações:</Text>
      <Text>Dólar: R$ {parseFloat(data.USDBRL.bid).toFixed(2)}</Text>
      <Text>Euro: R$ {parseFloat(data.EURBRL.bid).toFixed(2)}</Text>
      <Text>Bitcoin: R$ {parseFloat(data.BTCBRL.bid).toFixed(2)}</Text>
    </ScrollView>
  );
}
