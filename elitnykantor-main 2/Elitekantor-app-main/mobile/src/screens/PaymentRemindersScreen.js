import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';

export default function PaymentRemindersScreen() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState('');

  const loadReminders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/reminders');
      setReminders(res.data || []);
    } catch (err) {
      console.log('ERR REMINDERS:', err?.response?.data || err.message);
      setReminders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReminders();
  }, []);

  const handleCreate = async () => {
    if (!title || !dueDate) {
      return Alert.alert('Błąd', 'Podaj tytuł i termin płatności.');
    }

    try {
      await api.post('/reminders', {
        title,
        amount: amount ? parseFloat(amount) : null,
        dueDate,
      });
      setTitle('');
      setAmount('');
      setDueDate('');
      loadReminders();
    } catch (err) {
      Alert.alert('Błąd', 'Nie udało się dodać przypomnienia.');
    }
  };

  const togglePaid = async (reminder) => {
    try {
      await api.patch(`/reminders/${reminder.reminder_id}`, { isPaid: !reminder.is_paid });
      loadReminders();
    } catch (err) {
      Alert.alert('Błąd', 'Nie udało się zaktualizować statusu.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Przypomnienia o płatnościach</Text>
      <Text style={localStyles.subtitle}>
        Dodaj rachunki i kontroluj terminy, aby niczego nie przegapić.
      </Text>

      <View style={localStyles.card}>
        <Text style={localStyles.cardTitle}>Nowe przypomnienie</Text>
        <TextInput
          style={styles.input}
          placeholder="Np. Czynsz, Netflix"
          placeholderTextColor="#94A3B8"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Kwota (opcjonalnie)"
          placeholderTextColor="#94A3B8"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TextInput
          style={styles.input}
          placeholder="Termin (YYYY-MM-DD)"
          placeholderTextColor="#94A3B8"
          value={dueDate}
          onChangeText={setDueDate}
        />
        <TouchableOpacity style={localStyles.primaryButton} onPress={handleCreate}>
          <Text style={localStyles.primaryButtonText}>Dodaj przypomnienie</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator color="#0F766E" size="large" style={{ marginTop: 20 }} />
      ) : reminders.length ? (
        reminders.map((reminder) => (
          <TouchableOpacity
            key={reminder.reminder_id}
            style={[localStyles.reminderCard, reminder.is_paid ? localStyles.reminderDone : null]}
            onPress={() => togglePaid(reminder)}
          >
            <View style={localStyles.reminderHeader}>
              <Text style={localStyles.reminderTitle}>{reminder.title}</Text>
              <Text style={localStyles.reminderDate}>{reminder.due_date}</Text>
            </View>
            <View style={localStyles.reminderFooter}>
              <Text style={localStyles.reminderAmount}>
                {reminder.amount ? `${Number(reminder.amount).toFixed(2)} PLN` : 'Kwota: -'}
              </Text>
              <Text style={localStyles.reminderStatus}>
                {reminder.is_paid ? 'Opłacone' : 'Do opłacenia'}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={localStyles.emptyText}>Brak przypomnień. Dodaj pierwsze powiadomienie.</Text>
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
  reminderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  reminderDone: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reminderTitle: {
    fontWeight: '700',
    color: '#0F172A',
  },
  reminderDate: {
    color: '#64748B',
    fontSize: 12,
  },
  reminderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reminderAmount: {
    color: '#0F172A',
    fontWeight: '600',
  },
  reminderStatus: {
    color: '#64748B',
    fontWeight: '600',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 13,
  },
});
