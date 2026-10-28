import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { colors, radius, spacing, typography } from '../theme';

interface FormFieldProps extends TextInputProps {
  label: string;
  error?: string;
}

export default function FormField({
  label,
  error,
  ...inputProps
}: FormFieldProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, error ? styles.errorText : null]}>
        {label}
      </Text>
      <TextInput
        placeholderTextColor={colors.outline}
        style={[styles.input, error ? styles.inputError : null]}
        {...inputProps}
      />
      {error ? (
        <Text style={[styles.helper, styles.errorText]}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  label: {
    ...typography.labelLarge,
    color: colors.onSurfaceVariant,
  },
  input: {
    ...typography.bodyLarge,
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    borderWidth: 1,
    borderColor: colors.outline,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    color: colors.onSurface,
  },
  inputError: {
    borderWidth: 2,
    borderColor: colors.error,
  },
  helper: {
    ...typography.labelMedium,
  },
  errorText: {
    color: colors.error,
  },
});
