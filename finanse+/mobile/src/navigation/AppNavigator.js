import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import WalletTopUpScreen from '../screens/WalletTopUpScreen';
import HistoryScreen from '../screens/HistoryScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import TradeScreen from '../screens/TradeScreen';
import SpendingStatsScreen from '../screens/SpendingStatsScreen';
import BudgetInsightsScreen from '../screens/BudgetInsightsScreen';
import PaymentRemindersScreen from '../screens/PaymentRemindersScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator({ isLoggedIn, onLogin, onLogout }) {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                  headerStyle: {
                    backgroundColor: '#0F172A',
                  },
                  headerTintColor: '#F8FAFC',
                  headerTitleStyle: {
                    fontWeight: '900',
                    fontSize: 18,
                    letterSpacing: 1,
                  },
                  headerTitleAlign: 'center',
                  headerShadowVisible: false,
                }}

            >
                {!isLoggedIn ? (
                    <>
                        <Stack.Screen name="Login" options={{ title: 'Finanse+ – Zaloguj się' }}>
                            {(props) => <LoginScreen {...props} onLogin={onLogin} />}
                        </Stack.Screen>
                        <Stack.Screen name="Register" options={{ title: 'Utwórz konto Finanse+' }}>
                            {(props) => <RegisterScreen {...props} />}
                        </Stack.Screen>
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Dashboard" options={{ title: 'Finanse osobiste' }}>
                            {(props) => <DashboardScreen {...props} />}
                        </Stack.Screen>

                        <Stack.Screen
                            name="WalletTopUp"
                            component={WalletTopUpScreen}
                            options={{ title: 'Dodaj przychód' }}
                        />
                        <Stack.Screen
                            name="Trade"
                            component={TradeScreen}
                            options={{ title: 'Wydatki i kategorie' }}
                        />
                        <Stack.Screen
                            name="History"
                            component={HistoryScreen}
                            options={{ title: 'Historia operacji' }}
                        />
                        <Stack.Screen
                            name="Portfolio"
                            component={PortfolioScreen}
                            options={{ title: 'Portfele i konta' }}
                        />
                        <Stack.Screen
                            name="Stats"
                            component={SpendingStatsScreen}
                            options={{ title: 'Statystyki wydatków' }}
                        />
                        <Stack.Screen
                            name="Insights"
                            component={BudgetInsightsScreen}
                            options={{ title: 'Plan i cele' }}
                        />
                        <Stack.Screen
                            name="Reminders"
                            component={PaymentRemindersScreen}
                            options={{ title: 'Przypomnienia o płatnościach' }}
                        />
                        <Stack.Screen name="Profile" options={{ title: 'Profil użytkownika' }}>
                            {(props) => <ProfileScreen {...props} onLogout={onLogout} />}
                        </Stack.Screen>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
