import { Image, ImageSourcePropType, View, ViewProps } from "react-native";
import { ThemedText } from "../ThemedText";

export type PokemonSpecProps = ViewProps & {
  title: string;
  description: string;
  image?: ImageSourcePropType;
}

export default function PokemonSpec({ style, title, description, image, ...props }: PokemonSpecProps) {
  return (
    <View style={[style, styles.root]} {...props}>
      <View style={styles.row}>
        {image && <Image source={image} style={{ width: 16, height: 16, objectFit: "contain"}} />}
        <ThemedText variant="body2" color="grayMedium">{title}</ThemedText>
      </View>
      <ThemedText variant="caption" color="grayMedium">
        {description}
      </ThemedText>
    </View>
  );
}

const styles = {
  root: {
    flex: 1,
    gap: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    gap : 8,
    flexDirection: "row",
    height : 32,
    alignitems: "center",
  }
}