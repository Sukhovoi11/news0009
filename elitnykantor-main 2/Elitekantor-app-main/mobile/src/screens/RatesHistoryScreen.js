import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import { styles } from '../styles/globalStyles';

const QUICK_CURRENCIES = ['USD', 'EUR', 'GBP', 'CHF'];

export default function RatesHistoryScreen() {
  const [symbol, setSymbol] = useState('USD');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNBPData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://api.nbp.pl/api/exchangerates/rates/a/${symbol}/last/15/?format=json`,
        {
          headers: {
            Accept: 'application/json',
            'User-Agent': 'EliteKantorApp',
          },
          timeout: 10000,
        }
      );

      setHistory(response.data.rates.reverse());
    } catch (err) {
      console.log('NBP API Error:', err.message);
      Alert.alert('Błąd', 'Nie udało się pobrać danych z NBP.');
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNBPData();
  }, [symbol]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Trendy rynku</Text>

      <View style={localStyles.card}>
        <Text style={styles.label}>Symbol waluty / indeksu</Text>
        <TextInput
          style={styles.input}
          value={symbol}
          onChangeText={(val) => setSymbol(val.toUpperCase())}
          maxLength={3}
        />

        <View style={localStyles.chipContainer}>
          {QUICK_CURRENCIES.map((cur) => (
            <TouchableOpacity
              key={cur}
              style={[
                localStyles.chip,
                symbol === cur && localStyles.chipSelected,
              ]}
              onPress={() => setSymbol(cur)}
            >
              <Text
                style={[
                  localStyles.chipText,
                  symbol === cur && localStyles.chipTextSelected,
                ]}
              >
                {cur}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={localStyles.resultArea}>
        <Text style={localStyles.sectionTitle}>
          Ostatnie 15 odczytów {symbol}
        </Text>

        {loading ? (
          <ActivityIndicator color="#0F766E" size="large" />
        ) : history.length ? (
          history.map((item, index) => (
            <View key={index} style={localStyles.historyItem}>
              <Text style={localStyles.dateText}>{item.effectiveDate}</Text>
              <Text style={localStyles.rateText}>
                {item.mid.toFixed(4)} PLN
              </Text>
            </View>
          ))
        ) : (
          <Text style={localStyles.emptyText}>Brak danych</Text>
        )}
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  chipContainer: { flexDirection: 'row', marginTop: 15 },
  chip: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 14,
    marginRight: 10,
    minWidth: 60,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipSelected: { backgroundColor: '#0F766E', borderColor: '#0F766E' },
  chipText: { fontWeight: '800', color: '#0F172A' },
  chipTextSelected: { color: '#FFFFFF' },
  resultArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F766E',
    marginBottom: 15,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  dateText: { color: '#64748B', fontWeight: '700' },
  rateText: { color: '#0F766E', fontWeight: '900' },
  emptyText: { textAlign: 'center', color: '#94A3B8' },
});
