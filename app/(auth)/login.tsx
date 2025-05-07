import { useRouter } from 'expo-router';
import { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aqui você colocaria sua lógica real de login
    if (email === 'user@example.com' && password === '123456') {
      // Salvar estado de login (iremos criar isso já já)
      router.replace('/(tabs)'); // Redireciona para a home
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', padding: 20,
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5,
  },
  title: {
    fontSize: 24, marginBottom: 20, textAlign: 'center',
  },
});
