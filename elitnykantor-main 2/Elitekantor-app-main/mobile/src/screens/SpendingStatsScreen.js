import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import Svg, { G, Path, Circle } from 'react-native-svg';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';

const CATEGORY_LABELS = {
  TRANSPORT: 'Transport',
  JEDZENIE: 'Jedzenie',
  MIESZKANIE: 'Mieszkanie',
  ZDROWIE: 'Zdrowie',
  ROZRYWKA: 'Rozrywka',
  INNE: 'Inne',
};

const CATEGORY_COLORS = ['#0F766E', '#1D4ED8', '#F97316', '#7C3AED', '#16A34A', '#0F172A'];

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return `M ${x} ${y} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
};

export default function SpendingStatsScreen() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get('/transactions/history');
      setHistory(res.data || []);
    } catch (err) {
      console.log('ERR HISTORY (stats):', err?.response?.data || err.message);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const stats = useMemo(() => {
    const expenses = history.filter((item) => item.type === 'EXPENSE');
    const byCategory = expenses.reduce((acc, item) => {
      const key = (item.currency_from || 'INNE').toUpperCase();
      acc[key] = (acc[key] || 0) + Number(item.amount || 0);
      return acc;
    }, {});
    const total = Object.values(byCategory).reduce((sum, val) => sum + val, 0);
    const rows = Object.entries(byCategory)
      .map(([key, value], index) => ({
        key,
        label: CATEGORY_LABELS[key] || key,
        value,
        color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
      }))
      .sort((a, b) => b.value - a.value);
    return { total, rows };
  }, [history]);

  const chartSize = 220;
  const radius = 90;
  const center = chartSize / 2;

  let startAngle = 0;
  const slices = stats.rows.map((row) => {
    const percent = stats.total ? (row.value / stats.total) * 100 : 0;
    const endAngle = startAngle + (percent / 100) * 360;
    const path = describeArc(center, center, radius, startAngle, endAngle);
    const slice = { ...row, percent, path };
    startAngle = endAngle;
    return slice;
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Statystyki wydatków</Text>
      <Text style={localStyles.subtitle}>
        Podgląd, gdzie najczęściej uciekają Twoje środki w bieżącym budżecie.
      </Text>

      {loading ? (
        <ActivityIndicator color="#0F766E" size="large" style={{ marginTop: 20 }} />
      ) : stats.total ? (
        <View style={localStyles.card}>
          <Svg width={chartSize} height={chartSize}>
            <G>
              {slices.map((slice) => (
                <Path key={slice.key} d={slice.path} fill={slice.color} />
              ))}
              <Circle cx={center} cy={center} r={52} fill="#F8FAFC" />
            </G>
          </Svg>
          <View style={localStyles.centerLabel}>
            <Text style={localStyles.centerLabelTitle}>Razem</Text>
            <Text style={localStyles.centerLabelValue}>{stats.total.toFixed(2)} PLN</Text>
          </View>

          <View style={localStyles.legend}>
            {slices.map((slice) => (
              <View key={slice.key} style={localStyles.legendRow}>
                <View style={[localStyles.colorDot, { backgroundColor: slice.color }]} />
                <Text style={localStyles.legendLabel}>{slice.label}</Text>
                <Text style={localStyles.legendValue}>{slice.percent.toFixed(0)}%</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={localStyles.emptyState}>
          <Text style={localStyles.emptyTitle}>Brak danych do wykresu</Text>
          <Text style={localStyles.emptyText}>
            Dodaj kilka wydatków, aby zobaczyć statystyki kategorii.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  subtitle: {
    color: '#64748B',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  centerLabel: {
    position: 'absolute',
    top: 110,
    alignItems: 'center',
  },
  centerLabelTitle: {
    color: '#94A3B8',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  centerLabelValue: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
  },
  legend: {
    marginTop: 20,
    width: '100%',
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  legendLabel: {
    flex: 1,
    color: '#0F172A',
    fontWeight: '600',
  },
  legendValue: {
    color: '#64748B',
    fontWeight: '700',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 24,
    marginTop: 10,
  },
  emptyTitle: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  emptyText: {
    color: '#64748B',
    fontSize: 14,
  },
});
