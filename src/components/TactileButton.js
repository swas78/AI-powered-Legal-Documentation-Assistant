import React, { useRef } from 'react';
import { StyleSheet, Text, Pressable, Animated, ActivityIndicator, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

export const TactileButton = ({
  title,
  onPress,
  variant = 'primary', // 'primary' | 'secondary' | 'danger' | 'ghost'
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (disabled || loading) return;
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  const handlePress = async () => {
    if (disabled || loading) return;
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // Haptics fallback on web/unsupported devices
    }
    onPress && onPress();
  };

  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isDanger = variant === 'danger';

  let containerBg = theme.colors.primary;
  let textColor = theme.colors.onPrimary;
  let borderColor = 'transparent';

  if (isSecondary) {
    containerBg = theme.colors.surface;
    textColor = theme.colors.primary;
    borderColor = theme.colors.primary;
  } else if (isDanger) {
    containerBg = theme.colors.lightRed;
    textColor = theme.colors.onPrimary;
  } else if (variant === 'ghost') {
    containerBg = 'transparent';
    textColor = theme.colors.muted;
  }

  if (disabled) {
    containerBg = '#D2DBD8';
    textColor = '#7E8F89';
    borderColor = 'transparent';
  }

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        accessibilityRole="button"
        accessibilityLabel={title}
        style={[
          styles.button,
          {
            backgroundColor: containerBg,
            borderColor: borderColor,
            borderWidth: isSecondary ? 1.5 : 0,
          },
          !disabled && isPrimary && styles.primaryShadow,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={textColor} size="small" />
        ) : (
          <View style={styles.contentRow}>
            {icon && iconPosition === 'left' && (
              <Ionicons name={icon} size={20} color={textColor} style={styles.iconLeft} />
            )}
            <Text style={[styles.text, { color: textColor }, textStyle]}>{title}</Text>
            {icon && iconPosition === 'right' && (
              <Ionicons name={icon} size={20} color={textColor} style={styles.iconRight} />
            )}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: theme.radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
  },
  primaryShadow: {
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: theme.typography.body,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  iconLeft: {
    marginRight: theme.spacing.sm,
  },
  iconRight: {
    marginLeft: theme.spacing.sm,
  },
});
