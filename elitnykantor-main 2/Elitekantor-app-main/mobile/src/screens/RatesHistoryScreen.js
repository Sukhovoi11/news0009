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
      <Text style={styles.title}>Archiwum NBP</Text>

      <View style={localStyles.card}>
        <Text style={styles.label}>Symbol waluty</Text>
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
              <Text style={localStyles.chipText}>{cur}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={localStyles.resultArea}>
        <Text style={localStyles.sectionTitle}>
          Ostatnie 15 notowań {symbol}
        </Text>

        {loading ? (
          <ActivityIndicator color="#FF2E93" size="large" />
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
    backgroundColor: '#16161D',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A35',
    marginBottom: 20,
  },
  chipContainer: { flexDirection: 'row', marginTop: 15 },
  chip: {
    backgroundColor: '#0F0F15',
    padding: 12,
    borderRadius: 14,
    marginRight: 10,
    minWidth: 60,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A35',
  },
  chipSelected: { backgroundColor: '#FF2E93' },
  chipText: { fontWeight: '800', color: '#F5F5F7' },
  resultArea: {
    backgroundColor: '#16161D',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2A2A35',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FF2E93',
    marginBottom: 15,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A35',
  },
  dateText: { color: '#9A9AA3', fontWeight: '700' },
  rateText: { color: '#34D399', fontWeight: '900' },
  emptyText: { textAlign: 'center', color: '#9A9AA3' },
});
