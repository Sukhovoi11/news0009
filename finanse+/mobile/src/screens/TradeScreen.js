import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';
import AppButton from '../components/AppButton';

const EXPENSE_CATEGORIES = [
  { key: 'TRANSPORT', label: 'Transport' },
  { key: 'JEDZENIE', label: 'Jedzenie' },
  { key: 'MIESZKANIE', label: 'Mieszkanie' },
  { key: 'ZDROWIE', label: 'Zdrowie' },
  { key: 'ROZRYWKA', label: 'Rozrywka' },
  { key: 'INNE', label: 'Inne' },
];

export default function TradeScreen() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0].key);
  const [portfolio, setPortfolio] = useState([]);
  const [loadingPortfolio, setLoadingPortfolio] = useState(false);

  const loadPortfolio = async () => {
    try {
      setLoadingPortfolio(true);
      const res = await api.get('/wallet/portfolio');
      setPortfolio(res.data || []);
    } catch (err) {
      console.log('ERR PORTFOLIO (expenses):', err?.response?.data || err.message);
    } finally {
      setLoadingPortfolio(false);
    }
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  const plnBalance = portfolio.find((p) => p.currency_code === 'PLN')?.amount ?? 0;

  const handleSubmit = async () => {
    const value = parseFloat(amount);
    const notify = (t, m) => (Platform.OS === 'web' ? window.alert(m) : Alert.alert(t, m));

    if (!value || value <= 0) return notify('Błąd', 'Podaj poprawną kwotę');

    try {
      const res = await api.post('/transactions/expense', {
        category,
        amountPln: value,
      });
      notify('Sukces', `Wydatek zapisany: ${res.data.amountPln.toFixed(2)} PLN`);
      setAmount('');
      loadPortfolio();
    } catch (err) {
      notify('Błąd', err?.response?.data?.message || 'Nie udało się zapisać wydatku.');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={[styles.container, { backgroundColor: '#F8FAFC' }]} keyboardShouldPersistTaps="handled">
          <Text style={[styles.title, { color: '#0F172A' }]}>Wydatki i kategorie</Text>
          <Text style={localStyles.subtitle}>
            Wybierz kategorię i zapisz wydatek, aby od razu pojawił się w historii.
          </Text>

          <View style={localStyles.balanceBox}>
            <Text style={localStyles.balanceLabel}>Dostępne środki:</Text>
            {loadingPortfolio ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={localStyles.balanceAmount}>{plnBalance.toFixed(2)} PLN</Text>
            )}
          </View>

          <Text style={styles.label}>Kwota wydatku (PLN)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: '#FFF' }]}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0.00"
          />

          <Text style={[styles.label, { marginTop: 4 }]}>Kategoria wydatku</Text>
          <View style={localStyles.categoryGrid}>
            {EXPENSE_CATEGORIES.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={[
                  localStyles.chip,
                  category === item.key && localStyles.chipSelected,
                ]}
                onPress={() => setCategory(item.key)}
              >
                <Text
                  style={[
                    localStyles.chipText,
                    category === item.key && localStyles.chipTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <AppButton
            title="Dodaj wydatek"
            onPress={handleSubmit}
            style={{ backgroundColor: '#0F766E', borderColor: '#0F766E' }}
          />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const localStyles = StyleSheet.create({
  subtitle: {
    color: '#64748B',
    marginBottom: 16,
  },
  balanceBox: {
    backgroundColor: '#0F172A',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  balanceLabel: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '600',
  },
  balanceAmount: {
    fontWeight: '900',
    fontSize: 26,
    color: '#FFFFFF',
    marginTop: 4,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    marginBottom: 12,
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
    minWidth: 90,
    alignItems: 'center',
  },
  chipSelected: {
    backgroundColor: '#0F172A',
    borderColor: '#0F172A',
  },
  chipText: {
    fontWeight: '700',
    color: '#475569',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
});
