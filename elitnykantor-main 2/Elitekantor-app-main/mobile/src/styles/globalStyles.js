import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0B0B0F', // ЧЕРНЫЙ ФОН
  },

  title: {
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 6,
    color: '#FF2E93', // ЯРКИЙ РОЗОВЫЙ
    letterSpacing: -0.8,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 28,
    color: '#FF7AB6', // МЯГКИЙ РОЗОВЫЙ
  },

  authCard: {
    backgroundColor: '#16161D',
    padding: 24,
    borderRadius: 22,
    marginTop: '5%',
    borderWidth: 1,
    borderColor: '#2A2A35',
    shadowColor: '#FF2E93',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    color: '#9A9AA3',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  input: {
    borderWidth: 1.5,
    borderColor: '#2A2A35',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 20,
    backgroundColor: '#0F0F15',
    fontSize: 16,
    color: '#F5F5F7',
  },

  menuButton: {
    backgroundColor: '#16161D',
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#2A2A35',
    shadowColor: '#FF2E93',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },

  menuButtonText: {
    fontSize: 16,
    color: '#FF2E93',
    fontWeight: '800',
  },

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    marginBottom: 12,
    borderRadius: 18,
    backgroundColor: '#16161D',
    borderWidth: 1,
    borderColor: '#2A2A35',
  },

  infoBox: {
    padding: 24,
    borderRadius: 22,
    backgroundColor: '#FF2E93',
    marginBottom: 26,
    shadowColor: '#FF2E93',
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 8,
  },

  infoBoxText: {
    color: '#0B0B0F',
    fontSize: 18,
    fontWeight: '900',
  },
  textPrimary: {
    color: '#F5F5F7',
    fontSize: 16,
    fontWeight: '600',
  },

  textSecondary: {
    color: '#9A9AA3',
    fontSize: 14,
  },

  textAccent: {
    color: '#FF2E93',
    fontWeight: '800',
  },

});
