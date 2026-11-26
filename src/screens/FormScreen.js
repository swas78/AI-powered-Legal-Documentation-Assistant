import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { getTemplateById } from '../templates';
import { ProgressStrip } from '../components/ProgressStrip';
import { TactileButton } from '../components/TactileButton';
import { StatusLight } from '../components/StatusLight';
import { saveDraft } from '../services/storage';

export const FormScreen = ({ route, navigation }) => {
  const { t, i18n } = useTranslation();
  const { templateId, initialData = {} } = route.params;
  const template = getTemplateById(templateId);
  const questions = template.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState(initialData);

  const isHindi = i18n.language === 'hi';
  const currentQ = questions[currentIndex] || {};
  const currentValue = formData[currentQ.key] || '';
  const isAnswered = String(currentValue).trim().length > 0;
  const isLastQuestion = currentIndex === questions.length - 1;

  // Build answered map for ProgressStrip
  const answeredMap = {};
  questions.forEach((q, idx) => {
    if (formData[q.key] && String(formData[q.key]).trim().length > 0) {
      answeredMap[idx] = true;
    }
  });

  const handleChangeText = (text) => {
    setFormData((prev) => ({
      ...prev,
      [currentQ.key]: text,
    }));
  };

  const handleNext = async () => {
    // If required and empty, don't advance
    if (currentQ.required && !isAnswered) {
      return;
    }

    // Auto save draft locally on each step
    await saveDraft(template.id, formData);

    if (isLastQuestion) {
      navigation.navigate('Draft', {
        templateId: template.id,
        formData: formData,
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  const label = isHindi && currentQ.label_hi ? currentQ.label_hi : currentQ.label;
  const placeholder = isHindi && currentQ.placeholder_hi ? currentQ.placeholder_hi : currentQ.placeholder;
  const hint = isHindi && currentQ.hint_hi ? currentQ.hint_hi : currentQ.hint;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Progress Indicator */}
          <ProgressStrip
            total={questions.length}
            current={currentIndex}
            answeredMap={answeredMap}
          />

          {/* Question Card */}
          <View style={styles.card}>
            <View style={styles.cardTopRow}>
              <Text style={styles.docBadge}>{template.title}</Text>
              <StatusLight
                status={isAnswered ? 'green' : currentQ.required ? 'red' : 'amber'}
                label={isAnswered ? 'Completed' : currentQ.required ? 'Required' : 'Optional'}
                size={10}
              />
            </View>

            <Text style={styles.questionLabel}>{label}</Text>

            {hint ? (
              <View style={styles.hintRow}>
                <Ionicons name="information-circle-outline" size={16} color={theme.colors.muted} />
                <Text style={styles.hintText}>{hint}</Text>
              </View>
            ) : null}

            <TextInput
              style={[
                styles.input,
                currentQ.type === 'number' && styles.numberInput,
              ]}
              value={currentValue}
              onChangeText={handleChangeText}
              placeholder={placeholder}
              placeholderTextColor="#98A7A2"
              keyboardType={currentQ.type === 'number' ? 'numeric' : 'default'}
              autoCapitalize={currentQ.type === 'number' ? 'none' : 'words'}
              autoFocus={true}
              multiline={currentQ.key === 'propertyAddress' || currentQ.key === 'serviceScope'}
              numberOfLines={currentQ.key === 'propertyAddress' || currentQ.key === 'serviceScope' ? 3 : 1}
            />
          </View>
        </ScrollView>

        {/* Pinned Bottom Navigation Buttons */}
        <View style={styles.bottomBar}>
          {currentIndex > 0 ? (
            <TactileButton
              title={t('form.back')}
              onPress={handleBack}
              variant="secondary"
              style={styles.backButton}
              icon="arrow-back"
            />
          ) : null}
          <TactileButton
            title={isLastQuestion ? t('form.finish') : t('form.next')}
            onPress={handleNext}
            variant="primary"
            style={styles.nextButton}
            disabled={currentQ.required && !isAnswered}
            icon={isLastQuestion ? 'checkmark-done' : 'arrow-forward'}
            iconPosition="right"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.screenPadding,
    flexGrow: 1,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.card,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginTop: theme.spacing.sm,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  docBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.primary,
    backgroundColor: '#E7F2EE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  questionLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.ink,
    lineHeight: 28,
    marginBottom: theme.spacing.sm,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: 6,
  },
  hintText: {
    fontSize: 13,
    color: theme.colors.muted,
    flex: 1,
    lineHeight: 18,
  },
  input: {
    minHeight: 56,
    backgroundColor: '#F8FAF9',
    borderRadius: theme.radius.button,
    borderWidth: 1.5,
    borderColor: '#D8E2DF',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 14,
    fontSize: 17,
    color: theme.colors.ink,
    fontWeight: '500',
  },
  numberInput: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  bottomBar: {
    flexDirection: 'row',
    padding: theme.spacing.screenPadding,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    gap: 12,
  },
  backButton: {
    flex: 1,
  },
  nextButton: {
    flex: 2,
  },
});
