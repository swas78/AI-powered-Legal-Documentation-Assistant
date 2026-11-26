import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { templates } from '../templates';
import { DocCard } from '../components/DocCard';
import { StatusLight } from '../components/StatusLight';
import { getDrafts } from '../services/storage';

export const HomeScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [drafts, setDrafts] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const loadSavedDrafts = useCallback(async () => {
    const saved = await getDrafts();
    setDrafts(saved || {});
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadSavedDrafts();
    });
    loadSavedDrafts();
    return unsubscribe;
  }, [navigation, loadSavedDrafts]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSavedDrafts();
    setRefreshing(false);
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(nextLang);
  };

  const handleSelectDoc = (template) => {
    const existingDraft = drafts[template.id];
    if (existingDraft && Object.keys(existingDraft.formData || {}).length > 0) {
      // If draft exists, navigate straight to Draft screen, where they can edit if needed
      navigation.navigate('Draft', {
        templateId: template.id,
        formData: existingDraft.formData,
      });
    } else {
      // Start form
      navigation.navigate('Form', {
        templateId: template.id,
        initialData: {},
      });
    }
  };

  const isHindi = i18n.language === 'hi';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.bg} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.appName}>{t('appName')}</Text>
            <Text style={styles.appTagline}>{t('appTagline')}</Text>
          </View>
          <Pressable
            onPress={toggleLanguage}
            style={styles.langButton}
            accessibilityRole="button"
            accessibilityLabel="Switch language"
          >
            <Ionicons name="language" size={16} color={theme.colors.primary} style={{ marginRight: 4 }} />
            <Text style={styles.langButtonText}>{isHindi ? 'English' : 'हिंदी'}</Text>
          </Pressable>
        </View>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('home.title')}</Text>
          <Text style={styles.sectionSubtitle}>{t('home.subtitle')}</Text>
        </View>

        {/* Document Cards */}
        <View style={styles.cardsContainer}>
          {templates.map((tmpl) => {
            const hasDraft = !!drafts[tmpl.id];
            const localizedTemplate = {
              ...tmpl,
              title: isHindi && tmpl.title_hi ? tmpl.title_hi : tmpl.title,
              shortDesc: isHindi && tmpl.shortDesc_hi ? tmpl.shortDesc_hi : tmpl.shortDesc,
            };
            return (
              <DocCard
                key={tmpl.id}
                template={localizedTemplate}
                isSavedDraft={hasDraft}
                onPress={() => handleSelectDoc(tmpl)}
              />
            );
          })}
        </View>

        {/* Free Legal Aid Card */}
        <Pressable
          style={styles.helpBanner}
          onPress={() => navigation.navigate('Help')}
          accessibilityRole="button"
          accessibilityLabel="Open Legal Aid and Help"
        >
          <View style={styles.helpIconBox}>
            <Ionicons name="shield" size={24} color="#0E5A4F" />
          </View>
          <View style={styles.helpTextBox}>
            <Text style={styles.helpTitle}>{t('home.freeLegalHelp')}</Text>
            <Text style={styles.helpSub}>{t('home.freeLegalHelpSub')}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={theme.colors.muted} />
        </Pressable>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
  },
  appName: {
    fontSize: theme.typography.title,
    fontWeight: '800',
    color: theme.colors.primary,
    letterSpacing: -0.5,
  },
  appTagline: {
    fontSize: theme.typography.helper + 1,
    color: theme.colors.muted,
    marginTop: 2,
    fontWeight: '500',
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  langButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  sectionHeader: {
    marginBottom: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.section,
    fontWeight: '700',
    color: theme.colors.ink,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: theme.typography.helper + 1,
    color: theme.colors.muted,
    lineHeight: 18,
  },
  cardsContainer: {
    marginBottom: theme.spacing.md,
  },
  helpBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E7F2EE',
    borderRadius: theme.radius.card,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: '#CDE4DC',
  },
  helpIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#D7ECE4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  helpTextBox: {
    flex: 1,
  },
  helpTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 2,
  },
  helpSub: {
    fontSize: 12,
    color: theme.colors.muted,
    lineHeight: 16,
  },
});
