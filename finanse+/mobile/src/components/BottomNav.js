import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';

const HomeIcon = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 11.5L12 4l9 7.5" />
    <Path d="M5 10.5V20h14v-9.5" />
  </Svg>
);

const WalletIcon = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 7h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
    <Path d="M16 12h4" />
  </Svg>
);

const HistoryIcon = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="8" />
    <Path d="M12 8v4l3 2" />
  </Svg>
);

const ProfileIcon = ({ color }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="8" r="3.5" />
    <Path d="M5 19.5c1.8-3.2 5.1-4.5 7-4.5s5.2 1.3 7 4.5" />
  </Svg>
);

const tabs = [
  { route: 'Dashboard', icon: HomeIcon, label: 'Start' },
  { route: 'Trade', icon: WalletIcon, label: 'Wydatki' },
  { route: 'History', icon: HistoryIcon, label: 'Historia' },
  { route: 'Profile', icon: ProfileIcon, label: 'Profil' },
];

export default function BottomNav({ navigation, activeRoute }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.nav, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {tabs.map((tab) => {
        const isActive = tab.route === activeRoute;
        const color = isActive ? '#0F172A' : '#94A3B8';
        const Icon = tab.icon;

        return (
          <TouchableOpacity
            key={tab.route}
            style={styles.tabButton}
            onPress={() => navigation.navigate(tab.route)}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
          >
            <Icon color={color} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
});
