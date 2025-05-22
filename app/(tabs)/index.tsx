import { Card } from "@/components/Card";
import OrderButton from "@/components/OrderButton";
import PokemonCard from "@/components/pokemon/PokemonCard";
import SearchBar from "@/components/SearchBar";
import SortButton from "@/components/SortButton";
import { ThemedText } from "@/components/ThemedText";
import useFetchAPI from "@/hooks/useFetchAPI";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Pokemon } from "@/types/pokemon";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Home() {
  const colors = useThemeColor();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"pokedex_id" | "name">("pokedex_id");
  const [order, setOrder] = useState<"up" | "down">("up");
  
  const filteredPokemons = [...(search 
    ? pokemons.filter(pokemon => 
        pokemon.name.fr.toLowerCase().includes(search.toLowerCase()) || 
        pokemon.pokedex_id.toString() === search
      ) 
    : pokemons)].sort((a, b) => {
      if (sortBy === "name") {
        return order === "up"
          ? a.name.fr.localeCompare(b.name.fr) // Croissant
          : b.name.fr.localeCompare(a.name.fr); // Décroissant
      }
      return order === "up"
        ? a.pokedex_id - b.pokedex_id // Croissant
        : b.pokedex_id - a.pokedex_id; // Décroissant
    });
    
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await useFetchAPI('/pokemon');
        setPokemons(data ?? []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.tint }]}>
      <View style={styles.header}>
        <Image source={require('@/assets/images/Pokeball.png')} />
        <ThemedText variant="headline" color="grayWhite">Pokedex</ThemedText>
      </View>
      <View style={[{ flexDirection: "row", gap: 16, marginVertical: 8 }]}>
        <SearchBar value={search} onChange={setSearch} />
        <SortButton value={sortBy} onChange={setSortBy} />
        <OrderButton value={order} onChange={setOrder} />
      </View>
      <Card style={styles.cardBody}>
        <FlatList
          data={filteredPokemons?.filter((item) => item.pokedex_id !== 0)}
          numColumns={3}
          contentContainerStyle={{ gap: 8, padding: 12 }}
          columnWrapperStyle={{ gap: 8 }}
          keyExtractor={(item) => item.pokedex_id.toString()}
          renderItem={({ item }) =>
            <PokemonCard id={item.pokedex_id} name={item.name.fr} style={{ flex: 1 / 3 }} />
          }
        />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FF0000',
    flex: 1,
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    padding: 12,
  },
  cardBody: {
    flex: 1,
  },
})


