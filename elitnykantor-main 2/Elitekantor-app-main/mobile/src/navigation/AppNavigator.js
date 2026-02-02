import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

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
const Tab = createBottomTabNavigator();

const buildTabIcon = (icon) => ({ color }) => (
  <Text style={{ color, fontSize: 18 }}>{icon}</Text>
);

function HomeStack({ onLogout }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0F172A' },
        headerTintColor: '#F8FAFC',
        headerTitleStyle: { fontWeight: '900', fontSize: 18, letterSpacing: 1 },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Dashboard" options={{ title: 'Finanse osobiste' }}>
        {(props) => <DashboardScreen {...props} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen name="WalletTopUp" component={WalletTopUpScreen} options={{ title: 'Dodaj przychód' }} />
      <Stack.Screen name="Trade" component={TradeScreen} options={{ title: 'Wydatki i kategorie' }} />
      <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Historia operacji' }} />
      <Stack.Screen name="Portfolio" component={PortfolioScreen} options={{ title: 'Portfele i konta' }} />
    </Stack.Navigator>
  );
}

function StatsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0F172A' },
        headerTintColor: '#F8FAFC',
        headerTitleStyle: { fontWeight: '900', fontSize: 18, letterSpacing: 1 },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Stats" component={SpendingStatsScreen} options={{ title: 'Statystyki wydatków' }} />
    </Stack.Navigator>
  );
}

function PlanStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0F172A' },
        headerTintColor: '#F8FAFC',
        headerTitleStyle: { fontWeight: '900', fontSize: 18, letterSpacing: 1 },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Insights" component={BudgetInsightsScreen} options={{ title: 'Plan i cele' }} />
    </Stack.Navigator>
  );
}

function RemindersStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0F172A' },
        headerTintColor: '#F8FAFC',
        headerTitleStyle: { fontWeight: '900', fontSize: 18, letterSpacing: 1 },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="Reminders"
        component={PaymentRemindersScreen}
        options={{ title: 'Przypomnienia o płatnościach' }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#0F172A' },
        headerTintColor: '#F8FAFC',
        headerTitleStyle: { fontWeight: '900', fontSize: 18, letterSpacing: 1 },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
    </Stack.Navigator>
  );
}

function AppTabs({ onLogout }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0F172A', borderTopColor: '#0F172A' },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#94A3B8',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        options={{ title: 'Home', tabBarIcon: buildTabIcon('🏠') }}
      >
        {(props) => <HomeStack {...props} onLogout={onLogout} />}
      </Tab.Screen>
      <Tab.Screen
        name="StatsTab"
        component={StatsStack}
        options={{ title: 'Staty', tabBarIcon: buildTabIcon('📊') }}
      />
      <Tab.Screen
        name="PlanTab"
        component={PlanStack}
        options={{ title: 'Plan', tabBarIcon: buildTabIcon('🎯') }}
      />
      <Tab.Screen
        name="RemindersTab"
        component={RemindersStack}
        options={{ title: 'Terminy', tabBarIcon: buildTabIcon('⏰') }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{ title: 'Profil', tabBarIcon: buildTabIcon('👤') }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator({ isLoggedIn, onLogin, onLogout }) {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}

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
                        <Stack.Screen name="MainTabs">
                          {(props) => <AppTabs {...props} onLogout={onLogout} />}
                        </Stack.Screen>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
