import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { styles } from '../styles/globalStyles';
import BottomNav from '../components/BottomNav';

export default function ProfileScreen({ navigation, onLogout }) {
  return (
    <View style={localStyles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={localStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Profil</Text>
        <Text style={styles.subtitle}>Zarządzaj kontem i ustawieniami aplikacji.</Text>

        <View style={localStyles.profileCard}>
          <View>
            <Text style={localStyles.profileName}>Użytkownik Finanse+</Text>
            <Text style={localStyles.profileMeta}>konto@finanseplus.app</Text>
          </View>
          <View style={localStyles.statusBadge}>
            <Text style={localStyles.statusText}>Aktywne</Text>
          </View>
        </View>

        <View style={localStyles.section}>
          <Text style={localStyles.sectionTitle}>Twoje konto</Text>
          <TouchableOpacity style={localStyles.row} onPress={() => navigation.navigate('Portfolio')}>
            <Text style={localStyles.rowTitle}>Portfele i konta</Text>
            <Text style={localStyles.rowMeta}>Zobacz saldo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={localStyles.row} onPress={() => navigation.navigate('History')}>
            <Text style={localStyles.rowTitle}>Historia operacji</Text>
            <Text style={localStyles.rowMeta}>Wszystkie transakcje</Text>
          </TouchableOpacity>
          <TouchableOpacity style={localStyles.row} onPress={() => navigation.navigate('Insights')}>
            <Text style={localStyles.rowTitle}>Cele i budżet</Text>
            <Text style={localStyles.rowMeta}>Kontroluj plan</Text>
          </TouchableOpacity>
        </View>

        <View style={localStyles.section}>
          <Text style={localStyles.sectionTitle}>Ustawienia</Text>
          <View style={localStyles.row}>
            <Text style={localStyles.rowTitle}>Powiadomienia</Text>
            <Text style={localStyles.rowMeta}>Włączone</Text>
          </View>
          <View style={localStyles.row}>
            <Text style={localStyles.rowTitle}>Waluta bazowa</Text>
            <Text style={localStyles.rowMeta}>PLN</Text>
          </View>
        </View>

        <TouchableOpacity style={localStyles.logoutButton} onPress={onLogout}>
          <Text style={localStyles.logoutText}>Wyloguj się</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNav navigation={navigation} activeRoute="Profile" />
    </View>
  );
}

const localStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  profileMeta: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 4,
  },
  statusBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  row: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  rowTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  rowMeta: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
});
