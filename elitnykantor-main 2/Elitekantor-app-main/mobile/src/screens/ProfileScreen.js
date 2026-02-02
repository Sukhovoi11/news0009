import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../styles/globalStyles';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={localStyles.header}>
        <View style={localStyles.avatar}>
          <Text style={localStyles.avatarText}>👤</Text>
        </View>
        <View style={localStyles.headerText}>
          <Text style={localStyles.name}>Użytkownik Finanse+</Text>
          <Text style={localStyles.email}>user@finanse.pl</Text>
        </View>
      </View>

      <View style={localStyles.card}>
        <Text style={localStyles.sectionTitle}>Moje ustawienia</Text>
        {['Preferencje budżetu', 'Powiadomienia', 'Bezpieczeństwo', 'Pomoc'].map((item) => (
          <TouchableOpacity key={item} style={localStyles.row}>
            <Text style={localStyles.rowText}>{item}</Text>
            <Text style={localStyles.rowArrow}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={localStyles.card}>
        <Text style={localStyles.sectionTitle}>Podsumowanie</Text>
        <View style={localStyles.summaryRow}>
          <Text style={localStyles.summaryLabel}>Status konta</Text>
          <Text style={localStyles.summaryValue}>Aktywne</Text>
        </View>
        <View style={localStyles.summaryRow}>
          <Text style={localStyles.summaryLabel}>Plan</Text>
          <Text style={localStyles.summaryValue}>Finanse+</Text>
        </View>
      </View>

      <TouchableOpacity style={localStyles.logoutButton}>
        <Text style={localStyles.logoutText}>Wyloguj się</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 28,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  email: {
    color: '#64748B',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  rowText: {
    color: '#0F172A',
    fontWeight: '600',
  },
  rowArrow: {
    color: '#94A3B8',
    fontSize: 18,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryLabel: {
    color: '#64748B',
    fontWeight: '600',
  },
  summaryValue: {
    color: '#0F172A',
    fontWeight: '700',
  },
  logoutButton: {
    backgroundColor: '#FEE2E2',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutText: {
    color: '#B91C1C',
    fontWeight: '700',
  },
});
