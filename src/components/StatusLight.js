import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

export const StatusLight = ({ status = 'green', label, size = 12, showLabel = true }) => {
  // status: 'green' | 'amber' | 'red' | 'off'
  let color = theme.colors.lightGreen;
  let glowColor = 'rgba(46, 158, 91, 0.25)';
  let iconName = 'checkmark-circle';
  let defaultText = 'Ready';

  if (status === 'amber') {
    color = theme.colors.lightAmber;
    glowColor = 'rgba(224, 161, 0, 0.25)';
    iconName = 'alert-circle';
    defaultText = 'Attention';
  } else if (status === 'red') {
    color = theme.colors.lightRed;
    glowColor = 'rgba(209, 67, 58, 0.25)';
    iconName = 'close-circle';
    defaultText = 'Missing';
  } else if (status === 'off') {
    color = '#C7D1CE';
    glowColor = 'transparent';
    iconName = 'radio-button-off';
    defaultText = 'Pending';
  }

  const displayText = label !== undefined ? label : defaultText;

  return (
    <View
      style={styles.container}
      accessibilityRole="text"
      accessibilityLabel={`Status: ${displayText}`}
    >
      <View
        style={[
          styles.outerRing,
          {
            width: size + 6,
            height: size + 6,
            borderRadius: (size + 6) / 2,
            backgroundColor: glowColor,
          },
        ]}
      >
        <View
          style={[
            styles.dot,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: color,
            },
          ]}
        />
      </View>
      {showLabel && displayText ? (
        <Text style={[styles.label, { color: color === '#C7D1CE' ? theme.colors.muted : color }]}>
          {displayText}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerRing: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  dot: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  label: {
    fontSize: theme.typography.helper,
    fontWeight: '600',
  },
});
