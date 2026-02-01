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
            {/* Приветствие в стиле современных финтех-приложений */}
            <View style={localStyles.headerSection}>
                <Text style={styles.title}>Witaj, Klient!</Text>
                <Text style={localStyles.welcomeText}>Twój Elitekantor jest gotowy.</Text>
            </View>

            {/* Сетка функций */}
            <View style={localStyles.gridContainer}>
                <MenuCard title="Doładuj" icon="💳" screen="WalletTopUp" color="#2E7D32" />
                <MenuCard title="Kantor" icon="🔄" screen="Trade" color="#00C853" />
                <MenuCard title="Kursy" icon="📈" screen="Rates" color="#004D40" />
                <MenuCard title="Portfel" icon="💼" screen="Portfolio" color="#1B5E20" />
                <MenuCard title="Historia" icon="📑" screen="History" color="#455A64" />
                <MenuCard title="Analiza" icon="📊" screen="RatesHistory" color="#004D40" />
            </View>

            {/* Кнопка выхода */}
            <TouchableOpacity
                style={localStyles.logoutButton}
                onPress={onLogout}
            >
                <Text style={localStyles.logoutText}>Wyloguj z systemu</Text>
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
        backgroundColor: '#FFF1F2',
        alignItems: 'center',
    },
    logoutText: {
        color: '#E11D48',
        fontWeight: '700',
        fontSize: 15,
    }
});