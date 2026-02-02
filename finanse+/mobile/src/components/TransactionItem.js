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
  const typeLabels = {
    BUY: 'Wymiana',
    SELL: 'Wymiana',
    INCOME: 'Przychód',
    EXPENSE: 'Wydatek',
    SAVING: 'Oszczędności',
  };

  const title =
    type === 'EXPENSE' || type === 'SAVING'
      ? `${typeLabels[type] || type} • ${currency_from}`
      : `${typeLabels[type] || type} • ${currency_from} → ${currency_to}`;

  return (
    <View
      style={[
        styles.cardRow,
        { backgroundColor: '#F8FAFC', borderRadius: 12, padding: 12, marginBottom: 8 },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '700', color: '#374151', marginBottom: 4, fontSize: 13 }}>
          {title}
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 8 }}>
          <Text style={{ color: '#4B5563', fontSize: 11 }}>
            Kwota: <Text style={{ fontWeight: '700' }}>{amount} {currency_to || ''}</Text>
          </Text>
          <Text style={{ color: '#4B5563', fontSize: 11 }}>
            Kurs: {rate ?? (type === 'EXPENSE' || type === 'INCOME' || type === 'SAVING' ? '1' : '-')}
          </Text>
        </View>
        <Text style={{ fontSize: 10, color: '#94A3B8', marginTop: 6 }}>{created_at}</Text>
      </View>
    </View>
  );
}
