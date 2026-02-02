import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';

const TARGET_BUDGET = 2500;

export default function BudgetInsightsScreen() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [goals, setGoals] = useState([]);
  const [goalTitle, setGoalTitle] = useState('');
  const [goalTarget, setGoalTarget] = useState('');
  const [goalDueDate, setGoalDueDate] = useState('');
  const [contributionInputs, setContributionInputs] = useState({});

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

  const loadGoals = async () => {
    try {
      const res = await api.get('/goals');
      setGoals(res.data || []);
    } catch (err) {
      console.log('ERR GOALS:', err?.response?.data || err.message);
      setGoals([]);
    }
  };

  useEffect(() => {
    loadHistory();
    loadGoals();
  }, []);

  const handleCreateGoal = async () => {
    const targetValue = parseFloat(goalTarget);
    if (!goalTitle || !targetValue || targetValue <= 0) {
      return Alert.alert('Błąd', 'Podaj nazwę celu i poprawną kwotę.');
    }

    try {
      await api.post('/goals', {
        title: goalTitle,
        targetAmount: targetValue,
        dueDate: goalDueDate || null,
      });
      setGoalTitle('');
      setGoalTarget('');
      setGoalDueDate('');
      loadGoals();
    } catch (err) {
      Alert.alert('Błąd', 'Nie udało się zapisać celu.');
    }
  };

  const handleContribution = async (goalId) => {
    const value = parseFloat(contributionInputs[goalId]);
    if (!value || value <= 0) {
      return Alert.alert('Błąd', 'Podaj poprawną kwotę.');
    }
    try {
      await api.post(`/goals/${goalId}/contribute`, { amount: value });
      setContributionInputs((prev) => ({ ...prev, [goalId]: '' }));
      loadGoals();
      loadHistory();
    } catch (err) {
      Alert.alert('Błąd', err?.response?.data?.message || 'Nie udało się odłożyć środków.');
    }
  };

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

          <View style={localStyles.card}>
            <Text style={localStyles.cardTitle}>Cele oszczędnościowe</Text>
            <Text style={localStyles.sectionHint}>
              Zdefiniuj cel i odkładaj środki bezpośrednio z portfela.
            </Text>

            <View style={localStyles.formRow}>
              <TextInput
                style={[styles.input, localStyles.inlineInput]}
                placeholder="Np. Wakacje w Hiszpanii"
                placeholderTextColor="#94A3B8"
                value={goalTitle}
                onChangeText={setGoalTitle}
              />
              <TextInput
                style={[styles.input, localStyles.inlineInput]}
                placeholder="Kwota PLN"
                placeholderTextColor="#94A3B8"
                keyboardType="numeric"
                value={goalTarget}
                onChangeText={setGoalTarget}
              />
              <TextInput
                style={[styles.input, localStyles.inlineInput]}
                placeholder="Termin (YYYY-MM-DD)"
                placeholderTextColor="#94A3B8"
                value={goalDueDate}
                onChangeText={setGoalDueDate}
              />
              <TouchableOpacity style={localStyles.primaryButton} onPress={handleCreateGoal}>
                <Text style={localStyles.primaryButtonText}>Dodaj cel</Text>
              </TouchableOpacity>
            </View>

            {goals.length === 0 ? (
              <Text style={localStyles.emptyText}>Brak celów. Dodaj pierwszy cel oszczędnościowy.</Text>
            ) : (
              goals.map((goal) => {
                const progress = goal.target_amount
                  ? Math.min(goal.saved_amount / goal.target_amount, 1)
                  : 0;
                return (
                  <View key={goal.goal_id} style={localStyles.goalCard}>
                    <View style={localStyles.goalHeader}>
                      <Text style={localStyles.goalTitle}>{goal.title}</Text>
                      {goal.due_date ? (
                        <Text style={localStyles.goalDue}>Termin: {goal.due_date}</Text>
                      ) : null}
                    </View>
                    <View style={localStyles.progressTrack}>
                      <View style={[localStyles.progressFill, { width: `${progress * 100}%` }]} />
                    </View>
                    <View style={localStyles.row}>
                      <Text style={localStyles.label}>Zebrano</Text>
                      <Text style={localStyles.value}>
                        {Number(goal.saved_amount).toFixed(2)} / {Number(goal.target_amount).toFixed(2)} PLN
                      </Text>
                    </View>
                    <View style={localStyles.contributionRow}>
                      <TextInput
                        style={[styles.input, localStyles.contributionInput]}
                        placeholder="Odłóż kwotę"
                        placeholderTextColor="#94A3B8"
                        keyboardType="numeric"
                        value={contributionInputs[goal.goal_id] || ''}
                        onChangeText={(text) =>
                          setContributionInputs((prev) => ({ ...prev, [goal.goal_id]: text }))
                        }
                      />
                      <TouchableOpacity
                        style={localStyles.secondaryButton}
                        onPress={() => handleContribution(goal.goal_id)}
                      >
                        <Text style={localStyles.secondaryButtonText}>Odłóż</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            )}
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
  sectionHint: {
    color: '#64748B',
    marginBottom: 12,
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
  formRow: {
    marginBottom: 12,
  },
  inlineInput: {
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#0F766E',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  goalCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  goalHeader: {
    marginBottom: 8,
  },
  goalTitle: {
    color: '#0F172A',
    fontWeight: '700',
    fontSize: 15,
  },
  goalDue: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
  contributionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  contributionInput: {
    flex: 1,
    marginRight: 10,
  },
  secondaryButton: {
    backgroundColor: '#E2E8F0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  secondaryButtonText: {
    color: '#0F172A',
    fontWeight: '700',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 13,
  },
});
