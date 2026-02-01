import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Platform } from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';
import AppButton from '../components/AppButton';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
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
      await api.post('/auth/register', { email, password });
      notify('Sukces', 'Konto utworzone pomyślnie! Możesz się teraz zalogować.');
      navigation.navigate('Login');
    } catch (err) {
      console.log('ERR REGISTER:', err?.response?.data || err.message);
      notify('Błąd', 'Nie udało się zarejestrować. Email może być już zajęty.');
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.authCard}>
          <Text style={styles.title}>Finanse+</Text>
          <Text style={styles.subtitle}>Załóż konto i uporządkuj budżet</Text>

          <Text style={styles.label}>Twój Email</Text>
          <TextInput
              style={styles.input}
              placeholder="np. kasa@finanse.pl"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
          />

          <Text style={styles.label}>Hasło Dostępu</Text>
          <TextInput
              style={styles.input}
              placeholder="minimum 4 znaki"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
          />

          <View style={{ marginTop: 10 }}>
            <AppButton title="Utwórz konto" onPress={handleRegister} />
          </View>

          <AppButton
              title="Mam już konto? Zaloguj się"
              variant="secondary"
              onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
  );
}
