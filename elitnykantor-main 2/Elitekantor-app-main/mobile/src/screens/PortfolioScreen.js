import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';

export default function PortfolioScreen() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPortfolio = async () => {
    try {
      setLoading(true);
      const res = await api.get('/wallet/portfolio');
      setItems(res.data || []);
    } catch (err) {
      console.log('ERR PORTFOLIO:', err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mój Portfel</Text>
      <Text style={{ color: '#9A9AA3', marginBottom: 14, fontSize: 14 }}>
        Stan Twoich aktywów w Elitekantor
      </Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#FF2E93"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item, index) =>
            item.currency_code + '_' + index.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.cardRow}>
              <Text
                style={{
                  fontWeight: '800',
                  fontSize: 16,
                  color: '#F5F5F7',
                }}
              >
                {item.currency_code}
              </Text>

              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 16,
                  color: '#FF2E93',
                }}
              >
                {item.amount.toFixed(2)}
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
