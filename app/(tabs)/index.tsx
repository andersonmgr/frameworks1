import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import styles from '../styles/index.styles';

export default function CalculatorScreen() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const parse = (value: string): number => parseFloat(value) || 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Número 1"
        value={num1}
        onChangeText={setNum1}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Número 2"
        value={num2}
        onChangeText={setNum2}
      />
      <View style={styles.buttonRow}>
        <Button title="+" onPress={() => setResult(parse(num1) + parse(num2))} />
        <Button title="-" onPress={() => setResult(parse(num1) - parse(num2))} />
        <Button title="×" onPress={() => setResult(parse(num1) * parse(num2))} />
        <Button title="÷" onPress={() => setResult(parse(num2) !== 0 ? parse(num1) / parse(num2) : 0)} />
      </View>
      <Text style={styles.result}>Resultado: {result !== null ? result : ''}</Text>
    </ScrollView>
  );
}
