import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/profile.styles';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { logout } = useAuth();


  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedName = await AsyncStorage.getItem('profile_name');
        const storedEmail = await AsyncStorage.getItem('profile_email');
        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
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
      Alert.alert('Perfil salvo com sucesso!');
    } catch (e) {
      console.error('Erro ao salvar perfil:', e);
      Alert.alert('Erro ao salvar perfil');
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
    </ScrollView>
  );
}
