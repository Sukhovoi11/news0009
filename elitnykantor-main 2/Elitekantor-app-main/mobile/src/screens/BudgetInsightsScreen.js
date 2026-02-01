import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';

const TARGET_BUDGET = 2500;

export default function BudgetInsightsScreen() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const res = await api.get('/transactions/history');
      setHistory(res.data || []);
    } catch (err) {
      console.log('ERR HISTORY (insights):', err?.response?.data || err.message);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const summary = useMemo(() => {
    const expenses = history.filter((item) => item.type === 'EXPENSE');
    const income = history.filter((item) => item.type === 'INCOME');
    const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const totalIncome = income.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const budgetProgress = Math.min(totalExpenses / TARGET_BUDGET, 1);
    return {
      totalExpenses,
      totalIncome,
      remaining: Math.max(TARGET_BUDGET - totalExpenses, 0),
      budgetProgress,
    };
  }, [history]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Plan i cele</Text>
      <Text style={localStyles.subtitle}>
        Podsumowanie budżetu miesięcznego i szybkie wskazówki dla Twoich finansów.
      </Text>

      {loading ? (
        <ActivityIndicator color="#0F766E" size="large" style={{ marginTop: 20 }} />
      ) : (
        <>
          <View style={localStyles.card}>
            <Text style={localStyles.cardTitle}>Budżet miesięczny</Text>
            <View style={localStyles.progressTrack}>
              <View style={[localStyles.progressFill, { width: `${summary.budgetProgress * 100}%` }]} />
            </View>
            <View style={localStyles.row}>
              <Text style={localStyles.label}>Wydatki</Text>
              <Text style={localStyles.value}>{summary.totalExpenses.toFixed(2)} PLN</Text>
            </View>
            <View style={localStyles.row}>
              <Text style={localStyles.label}>Pozostało</Text>
              <Text style={localStyles.value}>{summary.remaining.toFixed(2)} PLN</Text>
            </View>
          </View>

          <View style={localStyles.card}>
            <Text style={localStyles.cardTitle}>Przychody vs wydatki</Text>
            <View style={localStyles.row}>
              <Text style={localStyles.label}>Przychody</Text>
              <Text style={localStyles.value}>{summary.totalIncome.toFixed(2)} PLN</Text>
            </View>
            <View style={localStyles.row}>
              <Text style={localStyles.label}>Wydatki</Text>
              <Text style={localStyles.value}>{summary.totalExpenses.toFixed(2)} PLN</Text>
            </View>
            <Text style={localStyles.helperText}>
              Utrzymuj wydatki poniżej przychodów, aby budować poduszkę finansową.
            </Text>
          </View>

          <View style={localStyles.card}>
            <Text style={localStyles.cardTitle}>Szybkie wskazówki</Text>
            <View style={localStyles.tip}>
              <Text style={localStyles.tipTitle}>Automatyczna rezerwa</Text>
              <Text style={localStyles.tipText}>
                Odłóż minimum 10% przychodów na fundusz awaryjny.
              </Text>
            </View>
            <View style={localStyles.tip}>
              <Text style={localStyles.tipTitle}>Limit rozrywki</Text>
              <Text style={localStyles.tipText}>
                Ustal limit na rozrywkę, aby zachować kontrolę nad budżetem.
              </Text>
            </View>
            <View style={localStyles.tip}>
              <Text style={localStyles.tipTitle}>Stałe rachunki</Text>
              <Text style={localStyles.tipText}>
                Przeglądaj abonamenty raz w miesiącu i rezygnuj z nieużywanych.
              </Text>
            </View>
          </View>
        </>
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
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 12,
  },
  progressTrack: {
    height: 10,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0F766E',
    borderRadius: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    color: '#64748B',
    fontWeight: '600',
  },
  value: {
    color: '#0F172A',
    fontWeight: '700',
  },
  helperText: {
    color: '#94A3B8',
    marginTop: 8,
    fontSize: 13,
  },
  tip: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },
  tipTitle: {
    color: '#0F172A',
    fontWeight: '700',
    marginBottom: 4,
  },
  tipText: {
    color: '#64748B',
    fontSize: 13,
  },
});
