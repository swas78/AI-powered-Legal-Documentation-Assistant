import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { getTemplateById, evaluateWarnings, interpolateText } from '../templates';
import { PlainLegalToggle } from '../components/PlainLegalToggle';
import { WarningCard } from '../components/WarningCard';
import { StatusLight } from '../components/StatusLight';
import { TactileButton } from '../components/TactileButton';

export const DraftScreen = ({ route, navigation }) => {
  const { t, i18n } = useTranslation();
  const { templateId, formData = {} } = route.params;
  const template = getTemplateById(templateId);

  const [mode, setMode] = useState('plain'); // 'plain' | 'legal'
  const isHindi = i18n.language === 'hi';
  const isPlain = mode === 'plain';

  // Evaluate dynamic warning checks
  const warnings = evaluateWarnings(template, formData);
  const hasWarnings = warnings.length > 0;

  const renderClauseText = (rawText) => {
    if (!rawText) return null;
    const interpolated = interpolateText(rawText, formData);

    // Split on bracketed unfilled blanks or highlight filled values
    const parts = interpolated.split(/(\[ \w+ \])/g);

    return (
      <Text style={styles.clauseBody}>
        {parts.map((part, i) => {
          if (part.startsWith('[') && part.endsWith(']')) {
            return (
              <Text key={i} style={styles.blankHighlight}>
                {part}
              </Text>
            );
          }
          return <Text key={i}>{part}</Text>;
        })}
      </Text>
    );
  };

  const handleEdit = () => {
    navigation.navigate('Form', {
      templateId: template.id,
      initialData: formData,
    });
  };

  const handleProceed = () => {
    navigation.navigate('Share', {
      templateId: template.id,
      formData: formData,
      mode: mode,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.bg} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Top Control Bar: Mode Toggle */}
        <View style={styles.controlHeader}>
          <PlainLegalToggle
            value={mode}
            onChange={setMode}
            plainLabel={t('draft.plainTab')}
            legalLabel={t('draft.legalTab')}
          />
        </View>

        {/* Status Strip */}
        <View style={styles.statusStrip}>
          <StatusLight
            status={hasWarnings ? 'amber' : 'green'}
            label={hasWarnings ? 'Review Active Warnings' : 'Draft Ready'}
            size={12}
          />
          <Text style={styles.docTitleBadge}>{template.title}</Text>
        </View>

        {/* Active Warning Cards */}
        {warnings.map((warn) => (
          <WarningCard
            key={warn.id}
            title={isHindi && warn.title_hi ? warn.title_hi : warn.title}
            message={isHindi && warn.message_hi ? warn.message_hi : warn.message}
            action={isHindi && warn.action_hi ? warn.action_hi : warn.action}
          />
        ))}

        {/* Document Body */}
        <View style={styles.docPaper}>
          <View style={styles.docHeader}>
            <Text style={styles.docHeading}>{template.title}</Text>
            <Text style={styles.docSubheading}>
              {isPlain ? 'Simple Language Draft' : 'Formal Legal Covenant'}
            </Text>
          </View>

          {template.clauses.map((clause, idx) => {
            const clauseTitle = isHindi && clause.title_hi ? clause.title_hi : clause.title;
            const clauseRaw = isPlain
              ? isHindi && clause.plain_hi ? clause.plain_hi : clause.plain
              : isHindi && clause.legal_hi ? clause.legal_hi : clause.legal;
            const noteText = isHindi && clause.note_hi ? clause.note_hi : clause.note;

            return (
              <View key={clause.id || idx} style={styles.clauseBlock}>
                <Text style={styles.clauseTitle}>
                  {idx + 1}. {clauseTitle}
                </Text>
                {renderClauseText(clauseRaw)}
                {noteText ? (
                  <View style={styles.noteRow}>
                    <Ionicons name="information-circle" size={14} color="#8A6300" style={{ marginRight: 6 }} />
                    <Text style={styles.noteText}>{noteText}</Text>
                  </View>
                ) : null}
              </View>
            );
          })}

          {/* Legal Disclaimer */}
          <View style={styles.disclaimerBox}>
            <Text style={styles.disclaimerText}>{t('draft.disclaimer')}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.bottomBar}>
        <TactileButton
          title={t('draft.editAnswers')}
          onPress={handleEdit}
          variant="secondary"
          style={styles.editButton}
          icon="create-outline"
        />
        <TactileButton
          title={t('draft.proceedToShare')}
          onPress={handleProceed}
          variant="primary"
          style={styles.shareButton}
          icon="share-social-outline"
          iconPosition="right"
        />
      </View>
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
  controlHeader: {
    marginBottom: theme.spacing.md,
  },
  statusStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 10,
    borderRadius: theme.radius.button,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  docTitleBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  docPaper: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.ink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  docHeader: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#E2EBE7',
    paddingBottom: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
  },
  docHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  docSubheading: {
    fontSize: 12,
    color: theme.colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  clauseBlock: {
    marginBottom: theme.spacing.lg,
  },
  clauseTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.ink,
    marginBottom: 6,
  },
  clauseBody: {
    fontSize: 15,
    lineHeight: 23,
    color: '#263430',
  },
  blankHighlight: {
    backgroundColor: theme.colors.highlight,
    color: theme.colors.highlightText,
    fontWeight: '700',
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEA',
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.lightAmber,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    marginTop: 8,
  },
  noteText: {
    fontSize: 12,
    color: '#7A5B00',
    flex: 1,
    lineHeight: 16,
    fontWeight: '500',
  },
  disclaimerBox: {
    marginTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: '#EEF2F0',
    paddingTop: theme.spacing.md,
    alignItems: 'center',
  },
  disclaimerText: {
    fontSize: 11,
    color: theme.colors.muted,
    textAlign: 'center',
    lineHeight: 16,
    fontStyle: 'italic',
  },
  bottomBar: {
    flexDirection: 'row',
    padding: theme.spacing.screenPadding,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: 12,
  },
  editButton: {
    flex: 1,
  },
  shareButton: {
    flex: 2,
  },
});
