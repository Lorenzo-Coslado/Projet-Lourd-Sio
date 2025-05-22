import { useThemeColor } from "@/hooks/useThemeColor";
import { Image, Pressable, View } from "react-native";

export type OrderButtonProps = {
  value: "down" | "up";
  onChange: (value: "down" | "up") => void;
};

export default function OrderButton({ value, onChange }: OrderButtonProps) {
  const colors = useThemeColor();
  const onButtonPress = () => {
    onChange(value === "down" ? "up" : "down");
  };
  return (
    <Pressable onPress={onButtonPress}>
      <View style={[styles.button, { backgroundColor: colors.grayWhite }]}>
        <Image
          source={
            value === "down"
              ? require('@/assets/images/ArrowDown.png')
              : require('@/assets/images/ArrowUp.png')
          }
          style={[styles.icon, { tintColor: colors.tint }]} />
      </View>
    </Pressable>
  );
}

const styles = {
  button: {
    width: 32,
    height: 32,
    borderRadius: 32,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 11,
    height: 11,
  }
}