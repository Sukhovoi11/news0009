import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Alert, Keyboard,
  TouchableWithoutFeedback, TouchableOpacity,
  ActivityIndicator, Platform, StyleSheet, ScrollView
} from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';
import * as WebBrowser from 'expo-web-browser';
import AppButton from '../components/AppButton';

export default function WalletTopUpScreen() {
  const [amount, setAmount] = useState('');
  const [portfolio, setPortfolio] = useState([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(false);

  const loadPortfolio = async () => {
    try {
      setLoadingPortfolio(true);
      const res = await api.get('/wallet/portfolio');
      setPortfolio(res.data || []);
    } catch (err) {
      console.log('ERR PORTFOLIO (topup):', err?.response?.data || err.message);
    } finally {
      setLoadingPortfolio(false);
    }
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  const plnBalance = portfolio.find((p) => p.currency_code === 'PLN')?.amount ?? 0;

  const notify = (title, msg) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}: ${msg}`);
    } else {
      Alert.alert(title, msg);
    }
  };

  const performPayUTopup = async (value) => {
    try {
      const res = await api.post('/payments/payu/create', { amount: value });
      const redirectUri = res.data.redirectUri;

      if (!redirectUri) {
        return notify('Błąd', 'Brak adresu płatności PayU');
      }

      // Открываем браузер для оплаты
      await WebBrowser.openBrowserAsync(redirectUri);

      // Эмуляция зачисления (для Sandbox)
      await api.post('/wallet/topup', { amount: value });

      notify('Sukces', 'Konto zostało zasilone (PayU Sandbox)');
      setAmount('');
      loadPortfolio();
    } catch (err) {
      console.log('ERR PAYU:', err?.response?.data || err.message);
      notify('Błąd', 'Nie udało się utworzyć płatności');
    }
  };

  const handleTopUpPayU = () => {
    const value = parseFloat(amount);
    if (!value || value <= 0) {
      return notify('Błąd', 'Podaj poprawną kwotę w PLN');
    }

    if (Platform.OS === 'web') {
      if (window.confirm(`Czy chcesz zasilić konto kwotą ${value.toFixed(2)} PLN przez PayU?`)) {
        performPayUTopup(value);
      }
    } else {
      Alert.alert(
          'Potwierdzenie',
          `Czy na pewno chcesz zasilić konto kwotą ${value.toFixed(2)} PLN przez PayU?`,
          [
            { text: 'Anuluj', style: 'cancel' },
            { text: 'Tak', onPress: () => performPayUTopup(value) },
          ]
      );
    }
  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={[styles.container, { backgroundColor: '#F8FAFC' }]}>
          <Text style={[styles.title, { color: '#0F172A' }]}>Dodaj przychód</Text>

          {/* Инфо-бокс с балансом */}
          <TouchableOpacity onPress={loadPortfolio} activeOpacity={0.8}>
            <View style={localStyles.balanceCard}>
              <Text style={{ color: '#E2E8F0', fontSize: 14 }}>Dostępne środki w budżecie:</Text>
              {loadingPortfolio ? (
                  <ActivityIndicator size="small" color="#FFF" />
              ) : (
                  <Text style={localStyles.balanceText}>{plnBalance.toFixed(2)} PLN</Text>
              )}
              <Text style={{ color: '#A5D6A7', fontSize: 11, marginTop: 10 }}>
                Kliknij, aby odświeżyć saldo
              </Text>
            </View>
          </TouchableOpacity>

          <View style={localStyles.authCardCustom}>
            <Text style={styles.label}>Kwota przychodu (PLN)</Text>
            <TextInput
                style={[styles.input, localStyles.bigInput]}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor="#94A3B8"
            />

            {/* Сетка быстрых кнопок */}
            <View style={localStyles.quickGrid}>
              {[100, 500, 1000].map((val) => (
                  <TouchableOpacity
                      key={val}
                      style={localStyles.quickChip}
                      onPress={() => setAmount(val.toString())}
                  >
                    <Text style={localStyles.quickChipText}>+{val}</Text>
                  </TouchableOpacity>
              ))}
            </View>

            <AppButton
                title="Dodaj przychód"
                onPress={handleTopUpPayU}
                style={{ backgroundColor: '#0F766E', borderColor: '#0F766E' }}
            />

            <Text style={localStyles.footerNote}>
              Przychód zostanie zapisany w historii finansowej.
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
  );
}

const localStyles = StyleSheet.create({
  balanceCard: {
    backgroundColor: '#0F172A',
    padding: 25,
    borderRadius: 24,
    marginBottom: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  balanceText: {
    fontWeight: '900',
    fontSize: 32,
    color: '#FFFFFF',
    marginTop: 5,
  },
  authCardCustom: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  bigInput: {
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
    height: 70,
    backgroundColor: '#F8FAFC',
    color: '#0F172A',
  },
  quickGrid: {
    flexDirection: 'row', // В ряд
    flexWrap: 'wrap',    // Перенос
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickChip: {
    width: '30%',
    backgroundColor: '#E2E8F0',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  quickChipText: {
    color: '#0F172A',
    fontWeight: '700',
  },
  footerNote: {
    textAlign: 'center',
    marginTop: 15,
    color: '#94A3B8',
    fontSize: 12,
  }
});
