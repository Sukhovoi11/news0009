import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, Alert, TouchableOpacity, Keyboard,
  TouchableWithoutFeedback, KeyboardAvoidingView, Platform,
  ScrollView, ActivityIndicator, StyleSheet
} from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';
import AppButton from '../components/AppButton';

export default function TradeScreen() {
  const [mode, setMode] = useState('BUY');
  const [currency, setCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [portfolio, setPortfolio] = useState([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(false);
  const [codes, setCodes] = useState([]);
  const [loadingCodes, setLoadingCodes] = useState(false);

  const loadPortfolio = async () => {
    try {
      setLoadingPortfolio(true);
      const res = await api.get('/wallet/portfolio');
      setPortfolio(res.data || []);
    } catch (err) {
      console.log('ERR PORTFOLIO (trade):', err?.response?.data || err.message);
    } finally {
      setLoadingPortfolio(false);
    }
  };

  const loadCodes = async () => {
    try {
      setLoadingCodes(true);
      const res = await api.get('/rates/current');
      const list = (res.data.rates || []).map((r) => r.code);
      setCodes(list);
    } catch (err) {
      console.log('ERR CODES (trade):', err?.response?.data || err.message);
    } finally {
      setLoadingCodes(false);
    }
  };

  useEffect(() => {
    loadPortfolio();
    loadCodes();
  }, []);

  const plnBalance = portfolio.find((p) => p.currency_code === 'PLN')?.amount ?? 0;

  const handleSubmit = async () => {
    const value = parseFloat(amount);
    const notify = (t, m) => Platform.OS === 'web' ? window.alert(m) : Alert.alert(t, m);

    if (!value || value <= 0) return notify('Błąd', 'Podaj poprawną kwotę');

    try {
      if (mode === 'BUY') {
        const res = await api.post('/transactions/buy', {
          currencyTo: currency.toUpperCase(),
          amountPln: value,
        });
        notify('Sukces', `Kupiono ${res.data.amountForeign.toFixed(2)} ${currency} po kursie ${res.data.rate}`);
      } else {
        const res = await api.post('/transactions/sell', {
          currencyFrom: currency.toUpperCase(),
          amountForeign: value,
        });
        notify('Sukces', `Sprzedano za ${res.data.amountPln.toFixed(2)} PLN po kursie ${res.data.rate}`);
      }
      setAmount('');
      loadPortfolio();
    } catch (err) {
      notify('Błąd', err?.response?.data?.message || 'Nie udało się wykonać transakcji.');
    }
  };

  return (
      <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
              style={[styles.container, {backgroundColor: '#F8FAFC'}]}
              keyboardShouldPersistTaps="handled"
          >
            <Text style={[styles.title, {color: '#004D40'}]}>Giełda Walut</Text>

            {/* Баланс в новом стиле */}
            <View style={localStyles.balanceBox}>
              <Text style={{ color: '#E8F5E9', fontSize: 13, fontWeight: '600' }}>Dostępne środки:</Text>
              {loadingPortfolio ? (
                  <ActivityIndicator size="small" color="#FFF" />
              ) : (
                  <Text style={localStyles.balanceAmount}>{plnBalance.toFixed(2)} PLN</Text>
              )}
            </View>

            {/* Переключатель Купить/Продать */}
            <View style={localStyles.tabContainer}>
              <TouchableOpacity
                  style={[localStyles.tab, mode === 'BUY' && localStyles.tabActive]}
                  onPress={() => setMode('BUY')}
              >
                <Text style={[localStyles.tabText, mode === 'BUY' && localStyles.tabTextActive]}>Kupno</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={[localStyles.tab, mode === 'SELL' && localStyles.tabActive]}
                  onPress={() => setMode('SELL')}
              >
                <Text style={[localStyles.tabText, mode === 'SELL' && localStyles.tabTextActive]}>Sprzedaż</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Kwota ({mode === 'BUY' ? 'PLN' : currency}):</Text>
            <TextInput
                style={[styles.input, {backgroundColor: '#FFF'}]}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="0.00"
            />

            <AppButton
                title={mode === 'BUY' ? 'Realizuj kupno' : 'Realizuj sprzedaż'}
                onPress={handleSubmit}
                style={{ backgroundColor: '#00C853', borderColor: '#00C853' }} // Зеленая кнопка
            />

            <Text style={[styles.label, { marginTop: 10 }]}>Wybierz walutę:</Text>

            {loadingCodes ? (
                <ActivityIndicator color="#004D40" />
            ) : (
                <View style={localStyles.currencyGrid}>
                  {codes.map((code) => (
                      <TouchableOpacity
                          key={code}
                          style={[
                            localStyles.chip,
                            currency.toUpperCase() === code && localStyles.chipSelected,
                          ]}
                          onPress={() => setCurrency(code)}
                      >
                        <Text style={[
                          localStyles.chipText,
                          currency.toUpperCase() === code && { color: 'white' }
                        ]}>
                          {code}
                        </Text>
                      </TouchableOpacity>
                  ))}
                </View>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}

const localStyles = StyleSheet.create({
  balanceBox: {
    backgroundColor: '#004D40',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  balanceAmount: {
    fontWeight: '900',
    fontSize: 26,
    color: '#FFFFFF',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  tabText: {
    fontWeight: '600',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#004D40',
  },
  currencyGrid: {
    flexDirection: 'row', // В ряд
    flexWrap: 'wrap',    // Перенос строки
    marginTop: 10,
    paddingBottom: 40,
  },
  chip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    minWidth: 60,
    alignItems: 'center',
  },
  chipSelected: {
    backgroundColor: '#004D40',
    borderColor: '#004D40',
  },
  chipText: {
    fontWeight: '700',
    color: '#475569',
  }
});