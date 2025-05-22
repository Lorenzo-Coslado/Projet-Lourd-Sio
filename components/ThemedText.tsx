import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { StyleSheet, Text, type TextProps } from 'react-native';

const styles = StyleSheet.create({
  body3: {
    fontSize: 10,
    lineHeight: 16,
  },
  body2: {
    fontSize: 12,
    lineHeight: 16,
  },
  body1: {
    fontSize: 14,
    lineHeight: 16,
  },
  caption: {
    fontSize: 8,
    lineHeight: 12,
  },
  headline: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  subTitle3: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: 'bold',
  },
  subTitle2: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 'bold',
  },
  subTitle1: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'bold',
  },
});

export type ThemedTextProps = TextProps & {
  variant?: keyof typeof styles;
  color?: keyof typeof Colors['light'] | keyof typeof Colors['dark'];
};

export function ThemedText({ variant, color, style, ...props }: ThemedTextProps) {
  const colors = useThemeColor();
  return <Text style={[styles[variant ?? 'body3'], { color: colors[color ?? "grayDark"] }, style]} {...props} />;
}

