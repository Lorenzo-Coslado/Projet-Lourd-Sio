import { Shadows } from '@/constants/Shadows';
import { useThemeColor } from '@/hooks/useThemeColor';
import type { ViewProps, ViewStyle } from 'react-native';
import { View } from 'react-native';

export type CardProps = ViewProps & {
};

export function Card({ style, ...props }: CardProps) {
  const colors = useThemeColor();
  return <View {...props} style={[style, styles, { backgroundColor: colors.grayWhite }]} />;
}

const styles = {
  borderRadius: 8,
  ...Shadows.dp2,
} satisfies ViewStyle;