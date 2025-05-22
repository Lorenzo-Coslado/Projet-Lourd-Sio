import { Colors } from "@/constants/Colors";
import { View, ViewStyle } from "react-native";
import { ThemedText } from "../ThemedText";

type PokemonTypeProps = {
  name: keyof (typeof Colors)["type"];
}

export default function PokemonType({ name }: PokemonTypeProps) {
  return (
    <View style={[styles, { backgroundColor: Colors.type[name] }]}>
      <ThemedText variant="subTitle3" color="grayWhite" style={{ textTransform: "capitalize" }} >{name}</ThemedText>
    </View>
  );
}

const styles = {
  flex: 0,
  height: 20,
  paddingHorizontal: 8,
  borderRadius: 8,
  justifyContent: "center",
  
} satisfies ViewStyle;