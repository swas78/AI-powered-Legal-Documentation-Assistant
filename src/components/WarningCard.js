import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

export const WarningCard = ({ title, message, action, style }) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.headerRow}>
        <View style={styles.iconBadge}>
          <Ionicons name="warning" size={18} color={theme.colors.lightAmber} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
      {action ? (
        <View style={styles.actionRow}>
          <Ionicons name="bulb-outline" size={15} color="#8A6300" style={styles.actionIcon} />
          <Text style={styles.actionText}>Recommended fix: {action}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFDF5',
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.lightAmber,
    borderRadius: theme.radius.card,
    padding: theme.spacing.md,
    marginVertical: theme.spacing.sm,
    borderColor: '#F3E8C4',
    borderWidth: 1,
    borderLeftWidth: 4,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  iconBadge: {
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#6B4E00',
  },
  message: {
    fontSize: theme.typography.helper + 1,
    lineHeight: 20,
    color: '#4F3F13',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#FFF8E1',
    padding: 8,
    borderRadius: 8,
  },
  actionIcon: {
    marginRight: 6,
  },
  actionText: {
    fontSize: theme.typography.helper,
    color: '#6B4E00',
    fontWeight: '600',
    flex: 1,
  },
});
