import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/globalStyles';

export default function TransactionItem({
                                          type,
                                          currency_from,
                                          currency_to,
                                          amount,
                                          rate,
                                          created_at,
                                        }) {
  return (
      <View style={[styles.cardRow, { backgroundColor: '#F8FAFC', borderRadius: 10, padding: 15, marginBottom: 10 }]}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: '700', color: '#374151', marginBottom: 4 }}>
            {type} • {currency_from} → {currency_to}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: '#4B5563' }}>
              Kwota: <Text style={{ fontWeight: 'bold' }}>{amount} {currency_to || ''}</Text>
            </Text>
            <Text style={{ color: '#4B5563' }}>Kurs/Przelicznik: {rate ?? '-'}</Text>
          </View>
          <Text style={{ fontSize: 11, color: '#94A3B8', marginTop: 8, fontStyle: 'italic' }}>{created_at}</Text>
        </View>
      </View>
  );
}
