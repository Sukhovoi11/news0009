import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/globalStyles';

export default function RateItem({ code, mid, currencyName, date }) {
  return (
    <View
      style={[
        styles.cardRow,
        {
          backgroundColor: '#16161D',
          borderWidth: 1,
          borderColor: '#2A2A35',
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
            color: '#FF2E93', // 🔥 КОД ВАЛЮТЫ — РОЗОВЫЙ
          }}
        >
          {code}
        </Text>

        {currencyName && (
          <Text
            style={{
              fontSize: 12,
              color: '#9A9AA3', // читаемый серый
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
            color: '#34D399', // 💹 неоново-зелёный курс
          }}
        >
          {Number(mid).toFixed(4)}
        </Text>

        {date && (
          <Text
            style={{
              fontSize: 10,
              color: '#9A9AA3',
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
