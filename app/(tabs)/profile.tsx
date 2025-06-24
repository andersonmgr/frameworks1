import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/profile.styles';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [operations, setOperations] = useState<string[]>([]);
  const { logout } = useAuth();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedName = await AsyncStorage.getItem('profile_name');
        const storedEmail = await AsyncStorage.getItem('profile_email');
        const storedOps = await AsyncStorage.getItem('operations');

        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
        if (storedOps) setOperations(JSON.parse(storedOps));
      } catch (e) {
        console.error('Erro ao carregar perfil:', e);
      }
    };

    loadProfile();
  }, []);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('profile_name', name);
      await AsyncStorage.setItem('profile_email', email);
      alert('Perfil salvo com sucesso!');
    } catch (e) {
      console.error('Erro ao salvar perfil:', e);
      alert('Erro ao salvar perfil');
    }
  };

  const handleUpdateOperations = async () => {
    try {
      const storedOps = await AsyncStorage.getItem('operations');
      if (storedOps) {
        setOperations(JSON.parse(storedOps));
        alert('Lista de cálculos atualizada!');
      } else {
        alert('Não há cálculos salvos.');
      }
    } catch (e) {
      console.error('Erro ao atualizar a lista de cálculos:', e);
      alert('Erro ao atualizar a lista');
    }
  };

  const handleClearOperations = async () => {
    try {
      await AsyncStorage.removeItem('operations');
      setOperations([]);
      alert('Últimos cálculos limpos com sucesso!');
    } catch (e) {
      console.error('Erro ao limpar cálculos:', e);
      alert('Erro ao limpar cálculos');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Digite seu nome"
      />
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
      />
      <View style={{ marginTop: 20 }}>
        <Button title="Salvar" onPress={handleSave} />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button title="Deslogar" onPress={logout} color="#d9534f" />
      </View>

      <View style={{ marginTop: 30 }}>
        <View style={[styles.operationsHeader, { flexDirection: 'row', alignItems: 'center' }]}>
          <Text style={styles.label}>Últimos 10 cálculos:</Text>

          <TouchableOpacity onPress={handleUpdateOperations} style={styles.updateButton}>
            <Text style={styles.updateButtonText}>↻</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleClearOperations}
            style={[styles.updateButton, { marginLeft: 10 }]}
            accessibilityLabel="Limpar últimos cálculos"
          >
            <Text style={styles.updateButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>

        {operations.length > 0 ? (
          operations.map((op, index) => (
            <Text key={index} style={{ marginBottom: 4 }}>{op}</Text>
          ))
        ) : (
          <Text style={{ fontStyle: 'italic', color: '#888', marginTop: 8 }}>
            Nenhum cálculo salvo.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
