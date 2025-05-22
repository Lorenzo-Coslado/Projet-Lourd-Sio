import { useThemeColor } from "@/hooks/useThemeColor";
import { Image, Pressable, View } from "react-native";

export type SortButtonProps = {
  value: "pokedex_id" | "name";
  onChange: (value: "pokedex_id" | "name") => void;
};

export default function SortButton({ value, onChange }: SortButtonProps) {
  const colors = useThemeColor();
  const onButtonPress = () => {
    onChange(value === "pokedex_id" ? "name" : "pokedex_id");
  };
  return (
    <Pressable onPress={onButtonPress}>
      <View style={[styles.button, { backgroundColor: colors.grayWhite }]}>
        <Image
          source={
            value === "pokedex_id"
              ? require('@/assets/images/filtreId.png')
              : require('@/assets/images/filtreLettre.png')
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