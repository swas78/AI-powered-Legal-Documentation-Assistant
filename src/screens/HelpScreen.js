import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Linking,
  Pressable,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { TactileButton } from '../components/TactileButton';

export const HelpScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const handleCallNalsa = () => {
    Linking.openURL('tel:15100');
  };

  const handleOpenDlsa = () => {
    Linking.openURL('https://nalsa.gov.in');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('help.title')}</Text>
          <Text style={styles.subtitle}>{t('help.subtitle')}</Text>
        </View>

        {/* NALSA Helpline Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={[styles.iconBox, { backgroundColor: '#E7F4EE' }]}>
              <Ionicons name="call" size={22} color={theme.colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{t('help.nalasHelpline')}</Text>
              <Text style={styles.cardSubtitle}>Toll-free national legal assistance across India</Text>
            </View>
          </View>
          <TactileButton
            title={t('help.callNalsa')}
            onPress={handleCallNalsa}
            variant="primary"
            icon="call-outline"
            style={{ marginTop: 12 }}
          />
        </View>

        {/* DLSA Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={[styles.iconBox, { backgroundColor: '#EAF0F6' }]}>
              <Ionicons name="business" size={22} color="#1E5E9E" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{t('help.dlsaInfo')}</Text>
              <Text style={styles.cardSubtitle}>Front office at every district court</Text>
            </View>
          </View>
          <Text style={styles.bodyText}>{t('help.dlsaDesc')}</Text>
          <TactileButton
            title="Visit NALSA / DLSA Official Portal"
            onPress={handleOpenDlsa}
            variant="secondary"
            icon="open-outline"
            style={{ marginTop: 12 }}
          />
        </View>

        {/* Legal Aid Eligibility List */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Who qualifies for Free Legal Services in India?</Text>
          <Text style={styles.infoItem}>• Women and children</Text>
          <Text style={styles.infoItem}>• Members of Scheduled Castes (SC) or Scheduled Tribes (ST)</Text>
          <Text style={styles.infoItem}>• Industrial workers and laborers</Text>
          <Text style={styles.infoItem}>• Victims of human trafficking or disaster</Text>
          <Text style={styles.infoItem}>• Persons with annual income under ₹3,00,000 (varies by state)</Text>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerBox}>
          <Ionicons name="shield-checkmark" size={18} color={theme.colors.muted} style={{ marginBottom: 6 }} />
          <Text style={styles.disclaimerText}>{t('help.disclaimerBox')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  scrollContent: {
    padding: theme.spacing.screenPadding,
    paddingBottom: 40,
  },
  header: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: theme.typography.title - 2,
    fontWeight: '800',
    color: theme.colors.ink,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: theme.typography.helper + 1,
    color: theme.colors.muted,
    lineHeight: 18,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.ink,
  },
  cardSubtitle: {
    fontSize: 12,
    color: theme.colors.muted,
    marginTop: 2,
  },
  bodyText: {
    fontSize: 13,
    color: '#3A4B46',
    lineHeight: 19,
    marginTop: 10,
  },
  infoBox: {
    backgroundColor: '#F5F8F7',
    borderRadius: theme.radius.card,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: '#E2EAE7',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.ink,
    marginBottom: 8,
  },
  infoItem: {
    fontSize: 13,
    color: '#425550',
    lineHeight: 20,
    marginBottom: 2,
  },
  disclaimerBox: {
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  disclaimerText: {
    fontSize: 11,
    color: theme.colors.muted,
    textAlign: 'center',
    lineHeight: 16,
    fontStyle: 'italic',
  },
});
