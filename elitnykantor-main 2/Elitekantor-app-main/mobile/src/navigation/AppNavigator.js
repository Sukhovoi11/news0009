import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import WalletTopUpScreen from '../screens/WalletTopUpScreen';
import RatesScreen from '../screens/RatesScreen';
import HistoryScreen from '../screens/HistoryScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import TradeScreen from '../screens/TradeScreen';
import RatesHistoryScreen from '../screens/RatesHistoryScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator({ isLoggedIn, onLogin, onLogout }) {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                  headerStyle: {
                    backgroundColor: '#0B0B0F', // ЧЕРНЫЙ
                  },
                  headerTintColor: '#FF2E93', // РОЗОВЫЙ ТЕКСТ
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
                        <Stack.Screen name="Login" options={{ title: 'EliteKantor – Zaloguj się' }}>
                            {(props) => <LoginScreen {...props} onLogin={onLogin} />}
                        </Stack.Screen>
                        <Stack.Screen name="Register" options={{ title: 'Nowe Konto Premium' }}>
                            {(props) => <RegisterScreen {...props} />}
                        </Stack.Screen>
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Dashboard" options={{ title: 'ELITEKANTOR' }}>
                            {(props) => <DashboardScreen {...props} onLogout={onLogout} />}
                        </Stack.Screen>

                        <Stack.Screen
                            name="WalletTopUp"
                            component={WalletTopUpScreen}
                            options={{ title: 'Zasilenie Konta' }}
                        />
                        <Stack.Screen
                            name="Trade"
                            component={TradeScreen}
                            options={{ title: 'Giełda Walut' }}
                        />
                        <Stack.Screen
                            name="Rates"
                            component={RatesScreen}
                            options={{ title: 'Kursy na Żywo' }}
                        />
                        <Stack.Screen
                            name="History"
                            component={HistoryScreen}
                            options={{ title: 'Historia Transakcji' }}
                        />
                        <Stack.Screen
                            name="Portfolio"
                            component={PortfolioScreen}
                            options={{ title: 'Twój Portfel' }}
                        />
                        <Stack.Screen
                            name="RatesHistory"
                            component={RatesHistoryScreen}
                            options={{ title: 'Statystyki NBP' }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}