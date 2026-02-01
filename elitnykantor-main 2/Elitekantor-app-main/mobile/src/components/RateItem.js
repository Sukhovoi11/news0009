import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/globalStyles';

export default function RateItem({ code, mid, currencyName, date }) {
  return (
    <View
      style={[
        styles.cardRow,
        {
          backgroundColor: '#FFFFFF',
          borderWidth: 1,
          borderColor: '#E2E8F0',
          paddingVertical: 14,
          marginBottom: 12,
        },
      ]}
    >
      <View>
        <Text
          style={{
            fontWeight: '900',
            fontSize: 16,
            color: '#0F172A',
          }}
        >
          {code}
        </Text>

        {currencyName && (
          <Text
            style={{
              fontSize: 12,
              color: '#64748B',
              marginTop: 2,
            }}
          >
            {currencyName}
          </Text>
        )}
      </View>

      <View style={{ alignItems: 'flex-end' }}>
        <Text
          style={{
            fontWeight: '900',
            fontSize: 16,
            color: '#0F766E',
          }}
        >
          {Number(mid).toFixed(4)}
        </Text>

        {date && (
          <Text
            style={{
              fontSize: 10,
              color: '#94A3B8',
              marginTop: 2,
            }}
          >
            {date}
          </Text>
        )}
      </View>
    </View>
  );
}
