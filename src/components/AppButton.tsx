import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

type ButtonVariant = 'filled' | 'outlined';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function AppButton({
  title,
  onPress,
  variant = 'filled',
  disabled = false,
  style,
}: AppButtonProps) {
  const isFilled = variant === 'filled';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        isFilled ? styles.filled : styles.outlined,
        pressed && (isFilled ? styles.filledPressed : styles.outlinedPressed),
        disabled &&
          (isFilled ? styles.filledDisabled : styles.outlinedDisabled),
        style,
      ]}
    >
      <Text
        style={[
          styles.label,
          isFilled ? styles.filledLabel : styles.outlinedLabel,
          disabled && styles.disabledLabel,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filled: {
    backgroundColor: colors.primary,
  },
  filledPressed: {
    backgroundColor: colors.primaryPressed,
  },
  filledDisabled: {
    backgroundColor: colors.disabledContainer,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.outline,
    backgroundColor: colors.surface,
  },
  outlinedPressed: {
    backgroundColor: colors.surfacePressed,
  },
  outlinedDisabled: {
    borderColor: colors.disabledContainer,
  },
  label: {
    ...typography.labelLarge,
  },
  filledLabel: {
    color: colors.onPrimary,
  },
  outlinedLabel: {
    color: colors.primary,
  },
  disabledLabel: {
    color: colors.onDisabled,
  },
});
