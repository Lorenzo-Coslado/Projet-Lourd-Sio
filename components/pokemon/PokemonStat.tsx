import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";

type Props = ViewProps & {
  name: string;
  value: number;
  color: string;
};

export function PokemonStat({ style, color, name, value, ...rest }: Props) {
  const colors = useThemeColor();
  

  return (
    <View style={[styles.root, style]} {...rest}>
      <View style={[styles.name, { borderColor: colors.grayLight }]}>
        <ThemedText variant="subTitle3" style={{ color }}>{name}</ThemedText>
      </View>
      <View>
        <ThemedText style={styles.value}>{value.toString().padStart(3, '0')}</ThemedText>
      </View>
      <View style={styles.bar}>
        <View style={[styles.barInner, { flex: value, backgroundColor: color }]} />
        <View style={[styles.barBackground, { flex: 255 - value, backgroundColor: color }]} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    width: 40,
    paddingRight: 8,
    borderRightWidth: 1,
    borderStyle: "solid",
  },
  value: {
    width: 23,
    borderStyle: "solid",
  },
  bar: {
    height: 4,
    borderRadius: 20,
    overflow: "hidden",
    flex: 1,
    flexDirection: "row",
  },
  barInner: {
    height: 4,
  },
  barBackground: {
    height: 4,
    opacity: 0.24,
  }
});
