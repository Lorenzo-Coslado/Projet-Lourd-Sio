import { useThemeColor } from "@/hooks/useThemeColor";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

export type SearchBarProps = {
  value: string;
  onChange: (text: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const colors = useThemeColor();
  return (
    <View style={[styles.searchBar, { backgroundColor: colors.grayWhite }]}>
      <TouchableOpacity>
        <Image
          source={require('@/assets/images/search.png')}
          style={styles.icon}
        />
      </TouchableOpacity>

      <TextInput
        placeholder="Rechercher un Pokémon"
        onChangeText={onChange} 
        value={value}
        placeholderTextColor="#888"
        style={styles.input}
      />
      
    </View>
  );
}

const styles = {
  searchBar: {
    flexDirection: "row",
    flex: 1,
    gap : 5,
    alignItems: "center" ,
    borderRadius: 16,
    height : 32,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 16,
    paddingHorizontal: 8,
    fontSize: 10,
    color: "#000",
  },
  icon: {
    width: 16,
    height: 16,
    marginLeft: 8,
    alignSelf: "center",
  },
};