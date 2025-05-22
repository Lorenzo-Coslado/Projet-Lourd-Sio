import { Card } from "@/components/Card";
import PokemonSpec from "@/components/pokemon/PokemonSpec";
import { PokemonStat } from "@/components/pokemon/PokemonStat";
import PokemonType from "@/components/pokemon/PokemonType";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { Desc } from "@/constants/Desc";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PokemonDetails() {
  const { id } = useLocalSearchParams(); // Récupère l'ID depuis l'URL
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { user, isAuth } = useAuth();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const handleLike = () => {
    if (isFavorite(Number(id)) && user?.id) {
      removeFavorite(Number(id));
    }
    if (!isFavorite(Number(id)) && user?.id) {
      addFavorite(Number(id));
    }
  };

  const colors = useThemeColor();
  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(`https://tyradex.vercel.app/api/v1/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchPokemon();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!pokemon) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Pokémon not found.</Text>
      </View>
    );
  }
  const mainType = pokemon.types[0].name as keyof typeof Colors.type;
  const colorType = mainType ? Colors.type[mainType] : colors.tint;
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colorType }]} >
      <View style={{ flex: 1 }}>
        <Image source={require('@/assets/images/PokeballBG.png')} style={styles.pokeballBG} />
        <View style={styles.header}>
          <View style={[styles.header, { gap: 16 }]}>
            <Pressable onPress={router.back}>
              <Image source={require('@/assets/images/Back.png')} style={{ width: 32, height: 32 }} />
            </Pressable>
            <ThemedText variant="headline" color="grayWhite" >{pokemon.name.fr}</ThemedText>
          </View>
          <View style={{ flexDirection: 'row', gap: 24, alignContent: 'center', alignItems: 'center' }}>
            {isAuth &&
              <Pressable onPress={handleLike}>
                <Image source={isFavorite(Number(id)) ? require('@/assets/images/likeActive.png') : require('@/assets/images/like.png')} style={{ width: 32, height: 32 }} />
              </Pressable>
            }
            <ThemedText variant="subTitle2" color="grayWhite" >#{pokemon.pokedex_id.toString().padStart(3, '0')}</ThemedText>
          </View>
        </View>

        <Card style={styles.body}>
          <Image
            source={{ uri: `https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${id}/regular.png` }}
            style={styles.image}
          />
          <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', }}>
            {pokemon.types.map((type: any) => (
              <PokemonType name={type.name} key={type.name} />
            ))}
          </View>
          <ThemedText variant="subTitle1" style={{ color: colorType, alignSelf: "center" }} >Caractéristiques</ThemedText>
          <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
            <PokemonSpec
              style={{ borderStyle: "solid", borderRightWidth: 1, borderColor: colors.grayLight }}
              title={pokemon.weight}
              description="Poids"
              image={require('@/assets/images/poids.png')}
            />
            <PokemonSpec
              style={{ borderStyle: "solid", borderRightWidth: 1, borderColor: colors.grayLight }}
              title={pokemon.height}
              description="Taille"
              image={require('@/assets/images/regle.png')}
            />
            <PokemonSpec
              title={pokemon.talents.slice(0, 2).map((talent: any) => talent.name).join("\n")}
              description="Capacité"
            />
          </View>
          <ThemedText variant="body3">{Desc[mainType].flavor_text}</ThemedText>
          <ThemedText variant="subTitle1" style={{ color: colorType, alignSelf: "center" }} >Stats</ThemedText>
          <View style={{ flex: 0 }}>
            <PokemonStat name="HP" value={pokemon.stats.hp} color={Colors.type[mainType]} />
            <PokemonStat name="ATK" value={pokemon.stats.atk} color={Colors.type[mainType]} />
            <PokemonStat name="DEF" value={pokemon.stats.def} color={Colors.type[mainType]} />
            <PokemonStat name="SATK" value={pokemon.stats.spe_atk} color={Colors.type[mainType]} />
            <PokemonStat name="SDEF" value={pokemon.stats.spe_def} color={Colors.type[mainType]} />
            <PokemonStat name="SPD" value={pokemon.stats.vit} color={Colors.type[mainType]} />
          </View>
        </Card>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  pokeballBG: {
    position: 'absolute',
    opacity: 0.1,
    right: 8,
    top: 8,
    width: 208,
    height: 208,
  },
  body: {
    marginTop: 144,
    paddingHorizontal: 20,
    paddingTop: 60,
    gap: 16,
    paddingBottom: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    margin: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: -150,
    alignSelf: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});