import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Platform } from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';
import AppButton from '../components/AppButton';

export default function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const notify = (title, msg) => {
      if (Platform.OS === 'web') {
        window.alert(`${title}: ${msg}`);
      } else {
        Alert.alert(title, msg);
      }
    };

    if (!email || !email.includes('@')) {
      return notify('Błąd', 'Podaj poprawny adres email');
    }
    if (!password || password.length < 4) {
      return notify('Błąd', 'Hasło musi mieć min. 4 znaki');
    }

    try {
      const res = await api.post('/auth/login', { email, password });
      onLogin(res.data.token);
    } catch (err) {
      console.log('ERR LOGIN:', err?.response?.data || err.message);
      notify('Błąd', 'Nie udało się zalogować. Sprawdź połączenie z serwerem.');
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.authCard}>
          <Text style={styles.title}>Finanse+</Text>
          <Text style={styles.subtitle}>Zaloguj się do panelu finansów osobistych</Text>

          <Text style={styles.label}>Adres Email</Text>
          <TextInput
              placeholder="email@finanse.pl"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
          />

          <Text style={styles.label}>Hasło</Text>
          <TextInput
              placeholder="wpisz hasło"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
          />

          <View style={{ marginTop: 10 }}>
            <AppButton title="Zaloguj się" onPress={handleLogin} />
          </View>

          <AppButton
              title="Nie masz konta? Zarejestruj się"
              variant="secondary"
              onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
  );
}
