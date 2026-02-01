import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';
import AppButton from '../components/AppButton';
import RateItem from '../components/RateItem';

export default function RatesScreen() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);

  const loadRates = async () => {
    try {
      setLoading(true);
      const res = await api.get('/rates/current');
      setRates(res.data.rates || []);
      setDate(res.data.effectiveDate);
    } catch (err) {
      console.log('ERR RATES:', err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRates();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rynek i kursy</Text>

      <Text style={{ color: '#64748B', marginBottom: 12 }}>
        Monitoruj bieżące kursy, by planować wydatki i podróże.
      </Text>

      <AppButton title="Odśwież dane" onPress={loadRates} />

      {date && (
        <Text style={{ marginTop: 10, color: '#9A9AA3', fontSize: 12 }}>
          Ostatnia aktualizacja: {date}
        </Text>
      )}

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0F766E"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          style={{ marginTop: 16 }}
          data={rates}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <RateItem
              code={item.code}
              mid={item.mid}
              currencyName={item.currency}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
