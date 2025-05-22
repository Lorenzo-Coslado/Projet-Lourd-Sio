import PokemonCardFav from "@/components/pokemon/PokemonCardFav";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import useFetchAPI from "@/hooks/useFetchAPI";
import apiService from "@/services/authService";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function FavorisScreen() {
  const { isAuth, user } = useAuth();
  const { favorites } = useFavorites();
  const [pokemons, setPokemons] = useState<any[]>([]); // Remplacez par le type approprié
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          setPokemons([]);
          if (user?.id) {
            const arrayFavPokemons = []
            for (const fav of favorites) {
              const pokemon = await useFetchAPI('/pokemon/' + fav);
              arrayFavPokemons.push(pokemon);
            }
            setPokemons(arrayFavPokemons);
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      }
      if (isAuth) fetchData();
    }, [user?.id, favorites, isAuth])
  );

  console.log("Pokemons favoris:", favorites);
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText variant="headline" style={styles.title}>Favoris</ThemedText>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require('@/assets/images/favoris/nothing.png')}
            style={styles.bigImage}
            resizeMode="contain"
          />
          <ThemedText variant="headline" style={styles.centerText}>Chargement...</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  if (!isAuth) {
    // Écran déconnecté
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText variant="headline" style={styles.title}>Favoris</ThemedText>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
          <Image
            source={require('@/assets/images/favoris/logout.png')}
            style={styles.bigImage}
            resizeMode="contain"
          />
          <ThemedText variant="subTitle1" style={styles.centerText}>
            Vous devez être connecté pour faire cela.
          </ThemedText>
          <ThemedText variant="body3" style={styles.centerText}>
            Pour accéder à cette fonctionnalité, connectez-vous ou créez un compte.
          </ThemedText>
          <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
            <Text style={styles.buttonText}>Se Connecter</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (pokemons.length === 0) {
    // Écran favoris vide
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText variant="headline" style={styles.title}>Favoris</ThemedText>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }} >
          <Image
            source={require('@/assets/images/favoris/nothing.png')}
            style={styles.bigImage}
            resizeMode="contain"
          />
          <ThemedText variant="subTitle1" style={styles.centerText}>
            Vous n'avez encore aucun Pokémon favori :(
          </ThemedText>
          <ThemedText variant="body3" style={styles.centerText}>
            Cliquez sur l'icône cœur de vos Pokémon préférés pour les retrouver ici.
          </ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  // Écran favoris avec pokémons
  return (
    <SafeAreaView style={styles.container}>
      <ThemedText variant="headline" style={styles.title}>Favoris</ThemedText>
      <ScrollView style={{ flex: 1, width: "100%", padding: 16 }}>

        {pokemons.map((pokemon) => (
          <PokemonCardFav pokemon={pokemon} onRemove={() => setPokemons((prev) => prev.filter(p => p.pokedex_id !== pokemon.pokedex_id))} key={pokemon.name.fr} />
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FAFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  title: {
    alignSelf: "flex-start",
    padding: 16,

  },
  bigImage: {
    width: 250,
    height: 250,
    marginBottom: 24,
  },
  centerText: {
    textAlign: "center",
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#173EA5",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignSelf: "center",
  },
  buttonText: {
    color: "#173EA5",
    fontWeight: "bold",
    fontSize: 16,
  },
  favCard: {
    width: "100%",
    padding: 16,
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    // Ajoutez ici le style de vos cartes favoris
  },
});

