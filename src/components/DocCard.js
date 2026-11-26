import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusLight } from './StatusLight';
import { theme } from '../theme';

export const DocCard = ({ template, isSavedDraft = false, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={template.title}
    >
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          <Ionicons name={template.icon || 'document-text-outline'} size={26} color={theme.colors.primary} />
        </View>
        <StatusLight
          status={isSavedDraft ? 'green' : 'off'}
          label={isSavedDraft ? 'Draft Saved' : 'Ready'}
          size={10}
        />
      </View>
      <Text style={styles.title}>{template.title}</Text>
      <Text style={styles.desc} numberOfLines={2}>
        {template.shortDesc}
      </Text>
      <View style={styles.footerRow}>
        <Text style={styles.actionPrompt}>Tap to create or view</Text>
        <Ionicons name="arrow-forward" size={16} color={theme.colors.primary} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
    shadowRadius: 8,
    elevation: 2,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    backgroundColor: '#F9FBFA',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EBF4F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    color: theme.colors.ink,
    marginBottom: 6,
  },
  desc: {
    fontSize: theme.typography.helper + 1,
    color: theme.colors.muted,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F0F4F2',
    paddingTop: theme.spacing.sm,
  },
  actionPrompt: {
    fontSize: theme.typography.helper,
    fontWeight: '600',
    color: theme.colors.primary,
  },
});
