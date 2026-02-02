import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../api/apiClient';
import { styles } from '../styles/globalStyles';
import BottomNav from '../components/BottomNav';

export default function DashboardScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [plnBalance, setPlnBalance] = useState(0);
    const [expenseTotal, setExpenseTotal] = useState(0);
    const [transactionsCount, setTransactionsCount] = useState(0);
    const [recentTransactions, setRecentTransactions] = useState([]);

    const loadSummary = useCallback(async () => {
        try {
            setLoading(true);
            const [portfolioRes, historyRes] = await Promise.all([
                api.get('/wallet/portfolio'),
                api.get('/transactions/history'),
            ]);

            const portfolio = portfolioRes.data || [];
            const history = historyRes.data || [];
            const pln = portfolio.find((item) => item.currency_code === 'PLN')?.amount ?? 0;
            const expenseSum = history
                .filter((item) => item.type === 'EXPENSE')
                .reduce((sum, item) => sum + Number(item.amount || 0), 0);

            setPlnBalance(pln);
            setExpenseTotal(expenseSum);
            setTransactionsCount(history.length);
            setRecentTransactions(history.slice(0, 3));
        } catch (err) {
            console.log('ERR DASHBOARD SUMMARY:', err?.response?.data || err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', loadSummary);
        loadSummary();

        return unsubscribe;
    }, [navigation, loadSummary]);

    return (
        <View style={localStyles.screen}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={localStyles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={localStyles.headerSection}>
                    <Text style={styles.title}>Finanse+</Text>
                    <Text style={localStyles.welcomeText}>
                        Najważniejsze dane o budżecie w jednym miejscu.
                    </Text>
                </View>

                <View style={localStyles.summaryGrid}>
                    <TouchableOpacity
                        style={localStyles.summaryCard}
                        onPress={() => navigation.navigate('Portfolio')}
                    >
                        <Text style={localStyles.summaryLabel}>Saldo</Text>
                        {loading ? (
                            <ActivityIndicator size="small" color="#0F766E" />
                        ) : (
                            <Text style={localStyles.summaryValue}>{plnBalance.toFixed(2)} PLN</Text>
                        )}
                        <Text style={localStyles.summaryHint}>Portfele i konta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={localStyles.summaryCard}
                        onPress={() => navigation.navigate('Stats')}
                    >
                        <Text style={localStyles.summaryLabel}>Statystyki</Text>
                        {loading ? (
                            <ActivityIndicator size="small" color="#0F766E" />
                        ) : (
                            <Text style={localStyles.summaryValue}>{transactionsCount}</Text>
                        )}
                        <Text style={localStyles.summaryHint}>Liczba operacji</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={localStyles.summaryCard}
                        onPress={() => navigation.navigate('Trade')}
                    >
                        <Text style={localStyles.summaryLabel}>Wydatki</Text>
                        {loading ? (
                            <ActivityIndicator size="small" color="#0F766E" />
                        ) : (
                            <Text style={localStyles.summaryValue}>{expenseTotal.toFixed(2)} PLN</Text>
                        )}
                        <Text style={localStyles.summaryHint}>Dodaj nowy wpis</Text>
                    </TouchableOpacity>
                </View>

                <View style={localStyles.sectionHeader}>
                    <Text style={localStyles.sectionTitle}>Ostatnie operacje</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('History')}>
                        <Text style={localStyles.sectionLink}>Zobacz wszystko</Text>
                    </TouchableOpacity>
                </View>

                {recentTransactions.length === 0 ? (
                    <View style={localStyles.emptyState}>
                        <Text style={localStyles.emptyTitle}>Brak operacji</Text>
                        <Text style={localStyles.emptyText}>Dodaj wydatek lub przychód, aby zobaczyć podsumowanie.</Text>
                    </View>
                ) : (
                    recentTransactions.map((item) => (
                        <View key={item.transaction_id} style={localStyles.transactionRow}>
                            <View>
                                <Text style={localStyles.transactionTitle}>{item.type}</Text>
                                <Text style={localStyles.transactionMeta}>{item.currency_from} → {item.currency_to}</Text>
                            </View>
                            <Text style={localStyles.transactionAmount}>{Number(item.amount || 0).toFixed(2)} PLN</Text>
                        </View>
                    ))
                )}

                <View style={localStyles.quickActions}>
                    <TouchableOpacity
                        style={[localStyles.actionButton, localStyles.primaryAction]}
                        onPress={() => navigation.navigate('WalletTopUp')}
                    >
                        <Text style={localStyles.actionTextPrimary}>Dodaj przychód</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={localStyles.actionButton}
                        onPress={() => navigation.navigate('Insights')}
                    >
                        <Text style={localStyles.actionText}>Plan i cele</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={localStyles.actionButton}
                        onPress={() => navigation.navigate('Reminders')}
                    >
                        <Text style={localStyles.actionText}>Przypomnienia</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <BottomNav navigation={navigation} activeRoute="Dashboard" />
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
    headerSection: {
        marginBottom: 16,
        paddingTop: 6,
    },
    welcomeText: {
        fontSize: 13,
        color: '#64748B',
        marginTop: 4,
    },
    summaryGrid: {
        gap: 12,
        marginBottom: 16,
    },
    summaryCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    summaryLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#94A3B8',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    summaryValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#0F172A',
        marginTop: 6,
    },
    summaryHint: {
        fontSize: 12,
        color: '#64748B',
        marginTop: 4,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 6,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#0F172A',
    },
    sectionLink: {
        fontSize: 12,
        fontWeight: '700',
        color: '#0F766E',
    },
    transactionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
        marginBottom: 10,
    },
    transactionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0F172A',
    },
    transactionMeta: {
        fontSize: 11,
        color: '#94A3B8',
        marginTop: 4,
    },
    transactionAmount: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0F766E',
    },
    emptyState: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        padding: 16,
        marginBottom: 12,
    },
    emptyTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0F172A',
    },
    emptyText: {
        fontSize: 12,
        color: '#94A3B8',
        marginTop: 6,
    },
    quickActions: {
        marginTop: 10,
        gap: 10,
    },
    actionButton: {
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 14,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    primaryAction: {
        backgroundColor: '#0F766E',
        borderColor: '#0F766E',
    },
    actionText: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0F172A',
    },
    actionTextPrimary: {
        fontSize: 13,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});
