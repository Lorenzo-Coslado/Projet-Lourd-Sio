import { ThemedText } from "@/components/ThemedText";
import PokemonType from "@/components/pokemon/PokemonType";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Pokemon } from "@/types/pokemon";
import { Link } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  pokemon: Pokemon;
  onPress?: () => void;
  onRemove?: () => void;
  isFavorite?: boolean;
};

export default function PokemonCardFav({ pokemon, onPress, onRemove, isFavorite }: Props) {
  const types = Array.isArray(pokemon.types) ? pokemon.types : [];
  const colors = useThemeColor();

  const mainType = types[0]?.name as keyof typeof Colors.type || "Plante";
  const colorType = mainType ? Colors.type[mainType] : colors.tint;

  const id = pokemon.pokedex_id;
  const { user } = useAuth();
  const { removeFavorite } = useFavorites();

  const handleRemove = () => {
    if (user?.id) {
      removeFavorite(id)
      onRemove?.();

    }
  };

  return (
    <Link href={{ pathname: `/pokemon/[id]`, params: { id } }} asChild >
      <Pressable >
        <View style={styles.card}>
          <View style={styles.left}>
            <ThemedText style={styles.id} variant="caption" color="grayMedium">
              #{pokemon.pokedex_id.toString().padStart(3, '0')}
            </ThemedText>
            <ThemedText style={styles.name} variant="subTitle1">
              {pokemon.name.fr}
            </ThemedText>
            <View style={styles.types}>
              {types.map((type) => (
                <PokemonType key={type.name} name={type.name} />
              ))}
            </View>
          </View>
          <View style={[styles.imageContainer, { backgroundColor: colorType }]}>
            <Image
              source={require('@/assets/images/PokeballBG.png')}
              style={{ position: "absolute", width: 70, height: 70, top: 10, left: 24, opacity: 0.34 }}
              resizeMode="contain"
            />
            <Image
              source={{ uri: pokemon.sprites.regular }}
              style={styles.image}
              resizeMode="contain"
            />
            <TouchableOpacity style={styles.heart} onPress={handleRemove}>
              <Image
                source={
                  isFavorite
                    ? require('@/assets/images/menu/likeActive.png')
                    : require('@/assets/images/menu/likeActive.png')
                }
                style={{ width: 13, height: 13, tintColor: "red" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    padding: 0,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    position: "relative",
  },
  left: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 16,
  },
  id: {
    marginBottom: 2,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 6,
    paddingVertical: 2
  },
  types: {
    flexDirection: "row",
    gap: 8,
    marginTop: 2,
  },
  imageContainer: {
    width: 116,
    height: 88,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    position: "relative",
  },
  image: {
    width: 74,
    height: 74,
  },
  heart: {
    position: "absolute",
    top: 7,
    right: 7,
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 1.5,
    padding: 4
  },
  delete: {
    backgroundColor: "#F44336",
    borderRadius: 16,
    padding: 4,
    marginLeft: 8,
  },
});
