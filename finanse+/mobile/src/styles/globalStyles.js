import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F8FAFC',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
    color: '#0F172A',
    letterSpacing: -0.4,
  },

  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 18,
    color: '#64748B',
  },

  authCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 16,
    marginTop: '4%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 8,
  },

  label: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  input: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    backgroundColor: '#F8FAFC',
    fontSize: 15,
    color: '#0F172A',
  },

  menuButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  menuButtonText: {
    fontSize: 14,
    color: '#0F172A',
    fontWeight: '700',
  },

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    marginBottom: 10,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  infoBox: {
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#0F766E',
    marginBottom: 18,
    shadowColor: '#0F172A',
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 8,
  },

  infoBoxText: {
    color: '#F8FAFC',
    fontSize: 16,
    fontWeight: '800',
  },
  textPrimary: {
    color: '#0F172A',
    fontSize: 14,
    fontWeight: '600',
  },

  textSecondary: {
    color: '#64748B',
    fontSize: 12,
  },

  textAccent: {
    color: '#0F766E',
    fontWeight: '800',
  },

});
