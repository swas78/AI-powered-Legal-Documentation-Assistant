import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { theme } from '../theme';

export const ProgressStrip = ({ total = 5, current = 0, answeredMap = {} }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dotsRow}>
        {Array.from({ length: total }).map((_, index) => {
          const isCurrent = index === current;
          const isAnswered = answeredMap[index];
          let dotColor = '#D2DBD8';
          let glow = false;

          if (isCurrent) {
            dotColor = theme.colors.primary;
            glow = true;
          } else if (isAnswered) {
            dotColor = theme.colors.lightGreen;
          }

          return (
            <View key={index} style={styles.stepItem}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor: dotColor,
                    width: isCurrent ? 24 : 10,
                    borderRadius: 6,
                  },
                  glow && styles.currentGlow,
                ]}
              />
            </View>
          );
        })}
      </View>
      <Text style={styles.counterText}>
        Step {current + 1} of {total}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  stepItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 10,
    backgroundColor: '#D2DBD8',
  },
  currentGlow: {
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  counterText: {
    textAlign: 'center',
    fontSize: theme.typography.helper,
    color: theme.colors.muted,
    fontWeight: '600',
    marginTop: 8,
  },
});
