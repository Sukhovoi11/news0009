import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';
import TransactionItem from '../components/TransactionItem';
import BottomNav from '../components/BottomNav';

export default function HistoryScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get('/transactions/history');
      setItems(res.data || []);
    } catch (err) {
      console.log('ERR HISTORY:', err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const renderItem = ({ item }) => (
    <TransactionItem
      type={item.type}
      currency_from={item.currency_from}
      currency_to={item.currency_to}
      amount={item.amount}
      rate={item.rate}
      created_at={item.created_at}
    />
  );


  return (
    <View style={localStyles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Historia operacji</Text>

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 16 }} />
        ) : (
          <FlatList
            style={{ marginTop: 10 }}
            contentContainerStyle={localStyles.listContent}
            data={items}
            keyExtractor={(item) => item.transaction_id.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
      <BottomNav navigation={navigation} activeRoute="History" />
    </View>
  );
}

const localStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  listContent: {
    paddingBottom: 120,
  },
});
