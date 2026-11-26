import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { theme } from '../theme';

export const PlainLegalToggle = ({ value = 'plain', onChange, plainLabel = 'Plain Words', legalLabel = 'Legal Language' }) => {
  const isPlain = value === 'plain';

  const handleSelect = (mode) => {
    if (mode === value) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // fallback
    }
    onChange(mode);
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => handleSelect('plain')}
        style={[styles.segment, isPlain && styles.segmentActive]}
        accessibilityRole="button"
        accessibilityState={{ selected: isPlain }}
      >
        <Text style={[styles.segmentText, isPlain && styles.segmentTextActive]}>
          {plainLabel}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => handleSelect('legal')}
        style={[styles.segment, !isPlain && styles.segmentActive]}
        accessibilityRole="button"
        accessibilityState={{ selected: !isPlain }}
      >
        <Text style={[styles.segmentText, !isPlain && styles.segmentTextActive]}>
          {legalLabel}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#E5EDE9',
    borderRadius: theme.radius.pill,
    padding: 4,
    borderWidth: 1,
    borderColor: '#D4E2DC',
  },
  segment: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.radius.pill,
  },
  segmentActive: {
    backgroundColor: theme.colors.primary,
    shadowColor: theme.colors.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.muted,
  },
  segmentTextActive: {
    color: theme.colors.onPrimary,
    fontWeight: '700',
  },
});
