import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { styles } from '../styles/globalStyles';

export default function DashboardScreen({ navigation, onLogout }) {
    // Вспомогательная функция для отрисовки плитки
    const MenuCard = ({ title, icon, screen, color = '#004D40' }) => (
        <TouchableOpacity
            style={localStyles.gridCard}
            onPress={() => navigation.navigate(screen)}
        >
            <View style={[localStyles.iconCircle, { backgroundColor: color + '15' }]}>
                <Text style={{ fontSize: 24 }}>{icon}</Text>
            </View>
            <Text style={localStyles.cardTitle}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={[styles.container, { backgroundColor: '#F8FAFC' }]}>
            {/* Приветствие для приложения управления личными финансами */}
            <View style={localStyles.headerSection}>
                <Text style={styles.title}>Witaj!</Text>
                <Text style={localStyles.welcomeText}>
                    Sprawdź budżet, wydatki i cele oszczędnościowe w jednym miejscu.
                </Text>
            </View>

            {/* Сетка функций */}
            <View style={localStyles.gridContainer}>
                <MenuCard title="Dodaj przychód" icon="💸" screen="WalletTopUp" color="#0F766E" />
                <MenuCard title="Wydatki" icon="🧾" screen="Trade" color="#0F766E" />
                <MenuCard title="Portfele" icon="💼" screen="Portfolio" color="#2563EB" />
                <MenuCard title="Historia" icon="📒" screen="History" color="#475569" />
                <MenuCard title="Statystyki" icon="🧩" screen="StatsTab" color="#0F766E" />
                <MenuCard title="Plan i cele" icon="🎯" screen="PlanTab" color="#1D4ED8" />
                <MenuCard title="Przypomnienia" icon="⏰" screen="RemindersTab" color="#F97316" />
            </View>

            {/* Кнопка выхода */}
            <TouchableOpacity
                style={localStyles.logoutButton}
                onPress={onLogout}
            >
                <Text style={localStyles.logoutText}>Wyloguj się</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const localStyles = StyleSheet.create({
    headerSection: {
        marginBottom: 30,
        paddingTop: 10,
    },
    welcomeText: {
        fontSize: 16,
        color: '#64748B',
        marginTop: 4,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridCard: {
        backgroundColor: '#FFFFFF',
        width: '48%', // Две карточки в ряд с небольшим зазором
        aspectRatio: 1, // Квадратная форма
        borderRadius: 24,
        padding: 20,
        marginBottom: 16,
        justifyContent: 'center',
        alignItems: 'center',
        // Мягкая тень
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F1F5F9',
    },
    iconCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1E293B',
        textAlign: 'center',
    },
    logoutButton: {
        marginTop: 20,
        marginBottom: 40,
        padding: 18,
        borderRadius: 16,
        backgroundColor: '#E2E8F0',
        alignItems: 'center',
    },
    logoutText: {
        color: '#0F172A',
        fontWeight: '700',
        fontSize: 15,
    }
});
