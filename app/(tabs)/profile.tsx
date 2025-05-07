import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ScrollView, Button } from 'react-native';
import styles from '../styles/profile.styles';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { logout } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogout = () => {
    logout();
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
      
      <View style={styles.logoutButton}>
        <Button title="Sair da conta" onPress={handleLogout} color="#d9534f" />
      </View>
    </ScrollView>
  );
}
