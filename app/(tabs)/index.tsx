import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/index.styles';

export default function CalculatorScreen() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const parse = (value: string): number => parseFloat(value) || 0;

  const saveOperation = async (operation: string) => {
    try {
      const stored = await AsyncStorage.getItem('operations');
      let operations = stored ? JSON.parse(stored) : [];

      operations.unshift(operation);
      if (operations.length > 10) operations = operations.slice(0, 10);

      await AsyncStorage.setItem('operations', JSON.stringify(operations));
    } catch (e) {
      console.error('Erro ao salvar operação:', e);
    }
  };

  const handleCalc = (op: string) => {
    const a = parse(num1);
    const b = parse(num2);
    let res = 0;

    switch (op) {
      case '+': res = a + b; break;
      case '-': res = a - b; break;
      case '*': res = a * b; break;
      case '/': res = b !== 0 ? a / b : 0; break;
    }

    setResult(res);
    saveOperation(`${a} ${op} ${b} = ${res}`);
  };

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
        <Button title="+" onPress={() => handleCalc('+')} />
        <Button title="-" onPress={() => handleCalc('-')} />
        <Button title="×" onPress={() => handleCalc('*')} />
        <Button title="÷" onPress={() => handleCalc('/')} />
      </View>
      <Text style={styles.result}>Resultado: {result !== null ? result : ''}</Text>
    </ScrollView>
  );
}
