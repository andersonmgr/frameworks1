import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../styles/currency.styles';

type CurrencyData = {
  USDBRL: { bid: string };
  EURBRL: { bid: string };
  BTCBRL: { bid: string };
};

const conversionOptions = [
  { label: 'BRL → USD', value: 'BRL_USD' },
  { label: 'BRL → EUR', value: 'BRL_EUR' },
  { label: 'BRL → BTC', value: 'BRL_BTC' },
  { label: 'USD → BRL', value: 'USD_BRL' },
  { label: 'EUR → BRL', value: 'EUR_BRL' },
  { label: 'BTC → BRL', value: 'BTC_BRL' },
];

export default function CurrencyScreen() {
  const [data, setData] = useState<CurrencyData | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [conversionType, setConversionType] = useState(conversionOptions[0].value);
  const [convertedValue, setConvertedValue] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => setData(null));
  }, []);

  useEffect(() => {
    if (!data || inputValue.trim() === '') {
      setConvertedValue('');
      return;
    }

    const usdToBrl = parseFloat(data.USDBRL.bid);
    const eurToBrl = parseFloat(data.EURBRL.bid);
    const btcToBrl = parseFloat(data.BTCBRL.bid);
    const input = parseFloat(inputValue.replace(',', '.'));

    if (isNaN(input)) {
      setConvertedValue('');
      return;
    }

    let result = 0;

    switch (conversionType) {
      case 'BRL_USD':
        result = input / usdToBrl;
        setConvertedValue(result.toFixed(2));
        break;
      case 'BRL_EUR':
        result = input / eurToBrl;
        setConvertedValue(result.toFixed(2));
        break;
      case 'BRL_BTC':
        result = input / btcToBrl;
        setConvertedValue(result.toFixed(6));
        break;
      case 'USD_BRL':
        result = input * usdToBrl;
        setConvertedValue(result.toFixed(2));
        break;
      case 'EUR_BRL':
        result = input * eurToBrl;
        setConvertedValue(result.toFixed(2));
        break;
      case 'BTC_BRL':
        result = input * btcToBrl;
        setConvertedValue(result.toFixed(2));
        break;
    }
  }, [inputValue, conversionType, data]);

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

      <Text style={styles.title}>Conversor de Moedas</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
          style={{
            backgroundColor: '#fff',
            borderColor: '#ccc',
            borderWidth: 1,
            padding: 10,
            width: 100,
            marginRight: 10,
            borderRadius: 5,
            textAlign: 'center',
          }}
          placeholder="Valor"
          keyboardType="numeric"
          value={inputValue}
          onChangeText={setInputValue}
        />

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            backgroundColor: '#eee',
            width: 160,
            alignItems: 'center',
          }}
        >
          <Text>{conversionOptions.find(opt => opt.value === conversionType)?.label}</Text>
        </TouchableOpacity>

        <TextInput
          style={{
            backgroundColor: '#fff',
            borderColor: '#ccc',
            borderWidth: 1,
            padding: 10,
            width: 100,
            marginLeft: 10,
            borderRadius: 5,
            textAlign: 'center',
          }}
          placeholder="Resultado"
          value={convertedValue}
          editable={false}
        />
      </View>

      {}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 20,
            width: '80%'
          }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Selecionar conversão</Text>
            <FlatList
              data={conversionOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setConversionType(item.value);
                    setModalVisible(false);
                  }}
                  style={{ padding: 10 }}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 10, alignSelf: 'center' }}
            >
              <Text style={{ color: 'red' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}
