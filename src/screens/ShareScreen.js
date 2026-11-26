import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  Linking,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { getTemplateById } from '../templates';
import { TactileButton } from '../components/TactileButton';
import { StatusLight } from '../components/StatusLight';
import { createAndSharePdf, printDocument } from '../services/pdfGenerator';

export const ShareScreen = ({ route, navigation }) => {
  const { t } = useTranslation();
  const { templateId, formData = {}, mode = 'legal' } = route.params;
  const template = getTemplateById(templateId);

  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingPrint, setLoadingPrint] = useState(false);

  const handleSavePdf = async () => {
    setLoadingPdf(true);
    const result = await createAndSharePdf(template, formData, mode);
    setLoadingPdf(false);

    if (result.success) {
      // Shared or generated successfully
    } else {
      Alert.alert('Error', result.error || 'Could not generate PDF');
    }
  };

  const handleShareWhatsApp = async () => {
    const summaryText = `*${template.title}*\nDrafted via Nyay Saathi\n\nParties:\n${
      formData.landlordName || formData.disclosingParty || formData.clientName || 'Party 1'
    } and ${
      formData.tenantName || formData.receivingParty || formData.freelancerName || 'Party 2'
    }\n\nPlease review the attached agreement draft.`;

    const encoded = encodeURIComponent(summaryText);
    const whatsappUrl = `whatsapp://send?text=${encoded}`;

    try {
      const supported = await Linking.canOpenURL(whatsappUrl);
      if (supported) {
        await Linking.openURL(whatsappUrl);
      } else {
        // Fallback to sharing PDF via general share sheet
        await handleSavePdf();
      }
    } catch {
      await handleSavePdf();
    }
  };

  const handlePrint = async () => {
    setLoadingPrint(true);
    const result = await printDocument(template, formData, mode);
    setLoadingPrint(false);

    if (!result.success) {
      Alert.alert('Error', result.error || 'Printing failed');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Success Header */}
        <View style={styles.successCard}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark-done" size={32} color={theme.colors.lightGreen} />
          </View>
          <Text style={styles.title}>{t('share.title')}</Text>
          <Text style={styles.subtitle}>{t('share.subtitle')}</Text>
          <StatusLight status="green" label="100% Complete & Verified" size={10} />
        </View>

        {/* Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Document Summary</Text>
          <View style={styles.metaRow}>
            <Text style={styles.metaKey}>Agreement Type</Text>
            <Text style={styles.metaValue}>{template.title}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaKey}>Primary Language Mode</Text>
            <Text style={styles.metaValue}>{mode === 'plain' ? 'Plain Language' : 'Formal Legal'}</Text>
          </View>
          <View style={styles.metaRow}>
            <Text style={styles.metaKey}>Draft Status</Text>
            <Text style={[styles.metaValue, { color: theme.colors.lightGreen, fontWeight: '700' }]}>
              Ready for Export
            </Text>
          </View>
        </View>

        {/* 3 Prominent Tactile Action Buttons */}
        <View style={styles.actionButtons}>
          <TactileButton
            title={t('share.savePdf')}
            onPress={handleSavePdf}
            variant="primary"
            icon="document-attach-outline"
            loading={loadingPdf}
            style={styles.actionBtn}
          />

          <TactileButton
            title={t('share.shareWhatsapp')}
            onPress={handleShareWhatsApp}
            variant="secondary"
            icon="logo-whatsapp"
            style={styles.actionBtn}
          />

          <TactileButton
            title={t('share.print')}
            onPress={handlePrint}
            variant="secondary"
            icon="print-outline"
            loading={loadingPrint}
            style={styles.actionBtn}
          />
        </View>

        <TactileButton
          title={t('share.done')}
          onPress={() => navigation.navigate('Home')}
          variant="ghost"
          style={styles.homeBtn}
          icon="home-outline"
        />
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
  successCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E7F7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.section + 2,
    fontWeight: '800',
    color: theme.colors.ink,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: theme.typography.helper + 1,
    color: theme.colors.muted,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: theme.spacing.md,
  },
  summaryCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F6F5',
  },
  metaKey: {
    fontSize: 13,
    color: theme.colors.muted,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.ink,
  },
  actionButtons: {
    gap: 12,
    marginBottom: theme.spacing.lg,
  },
  actionBtn: {
    width: '100%',
  },
  homeBtn: {
    marginTop: 8,
  },
});
