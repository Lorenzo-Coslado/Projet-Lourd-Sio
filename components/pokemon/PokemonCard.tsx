import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";
import React from "react";
import type { ViewStyle } from "react-native";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Card } from "../Card";
import { ThemedText } from "../ThemedText";

export type PokemonCardProps = {
  style?: ViewStyle;
  id: number;
  name: string;
};

export default function PokemonCard({ style, id, name }: PokemonCardProps) {
  const colors = useThemeColor();

  const { user, isAuth } = useAuth();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();



  const handleFavorite = () => {
    if (isFavorite(id) && user?.id) {
      removeFavorite(id);
    }
    if (!isFavorite(id) && user?.id) {
      addFavorite(id);
    }
  };

  return <Link href={{ pathname: `/pokemon/[id]`, params: { id } }} asChild >
    <Pressable style={style}>
      <Card style={[styles.card]}>
        <Pressable
          style={{ alignSelf: 'flex-start' }}
          onPress={handleFavorite}
          hitSlop={10}
        >
          {isAuth &&
            <Image
              source={isFavorite(id) ? require('@/assets/images/likeActive.png') : require('@/assets/images/menu/like.png')}
              style={{ position: 'absolute', top: 0, left: 2, width: 15, height: 15 }}
            />
          }
        </Pressable>
        <ThemedText style={styles.id} variant="caption" color="grayMedium">#{id.toString().padStart(3, '0')}</ThemedText>
        <Image
          source={{ uri: `https://raw.githubusercontent.com/Yarkis01/TyraDex/images/sprites/${id}/regular.png` }}
          style={{ width: 72, height: 72, alignSelf: 'center' }}
        />
        <ThemedText variant="body3" color="grayDark">{name}</ThemedText>
        <View style={[styles.shadow, { backgroundColor: colors.grayBackground }]} />
      </Card>
    </Pressable>
  </Link>
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 6,
    position: 'relative',
  },
  id: {
    alignSelf: 'flex-end'
  },
  shadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    borderRadius: 7,
    zIndex: -1,
  },
})