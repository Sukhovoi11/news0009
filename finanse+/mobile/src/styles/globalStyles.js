import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
    color: '#0F172A',
    letterSpacing: -0.4,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 28,
    color: '#64748B',
  },

  authCard: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
    marginTop: '5%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  input: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 20,
    backgroundColor: '#F8FAFC',
    fontSize: 16,
    color: '#0F172A',
  },

  menuButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  menuButtonText: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '800',
  },

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    marginBottom: 12,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  infoBox: {
    padding: 24,
    borderRadius: 22,
    backgroundColor: '#0F766E',
    marginBottom: 26,
    shadowColor: '#0F172A',
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 8,
  },

  infoBoxText: {
    color: '#F8FAFC',
    fontSize: 18,
    fontWeight: '900',
  },
  textPrimary: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '600',
  },

  textSecondary: {
    color: '#64748B',
    fontSize: 14,
  },

  textAccent: {
    color: '#0F766E',
    fontWeight: '800',
  },

});
