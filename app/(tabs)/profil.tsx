import { Card } from "@/components/Card";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/AuthContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from "react-native";

export default function ProfilScreen() {
  const colors = useThemeColor();
  const [notifPokedex, setNotifPokedex] = useState(true);
  const [notifMonde, setNotifMonde] = useState(true);
  const { user, isAuth, logout } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F6FAFF" }}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {!isAuth ? (
          <Card style={styles.card}>
            <View style={{ flex: 1 }}>
              <View style={styles.cardRow}>
                <View style={{ flex: 1 }}>
                  <ThemedText variant="body1" style={{ marginBottom: 8 }}>
                    Maintiens ton Pokédex à jour et participe à ce monde.
                  </ThemedText>
                </View>
                <Image
                  source={require('@/assets/images/profil/notLogin.png')}
                  style={{ width: 120, height: 80, marginLeft: 8 }}
                  resizeMode="contain"
                />
              </View>
              <View style={{ flexDirection: "row", marginTop: 8, gap: 8, justifyContent: "center" }}>
                <Link href={{ pathname: `/login` }} asChild >
                  <TouchableOpacity style={styles.button}>
                    <ThemedText style={styles.buttonText}>Connexion</ThemedText>
                  </TouchableOpacity>
                </Link>
                <Link href={{ pathname: `/register` }} asChild >
                  <TouchableOpacity style={styles.button}>
                    <ThemedText style={styles.buttonText}>Créer un Compte</ThemedText>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </Card>)
          :
          (
            <>
              <Card style={[styles.card]}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Image source={require('@/assets/images/profil/avatar.png')} style={{ width: 48, height: 48, marginRight: 12 }} />
                  <ThemedText variant="subTitle1" style={{ fontWeight: 'bold', fontSize: 18, padding: 5}}>{user?.name}</ThemedText>
                </View>
                <Pressable style={{ alignItems: 'center', backgroundColor: "#173EA5", padding: 6, borderRadius: 5 }} onPress={logout}>
                  <ThemedText variant="subTitle2" style={{ color: "white" }}>Déconnexion</ThemedText>
                </Pressable>
              </Card>

              {/* Section Informations */}
              <View style={styles.section}>
                <ThemedText variant="subTitle1" style={styles.sectionTitle}>Informations du compte</ThemedText>
                <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E0', marginBottom: 12 }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                  <View style={{ flex: 1 }}>
                    <ThemedText variant="body1" style={styles.label}>Nom</ThemedText>
                    <ThemedText variant="body2" style={styles.desc}>{user?.name}</ThemedText>
                  </View>
                  <Image source={require('@/assets/images/profil/ChevronRight.png')} style={{ width: 24, height: 24, tintColor: '#B0B0B0' }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                  <View style={{ flex: 1 }}>
                    <ThemedText variant="body1" style={styles.label}>Email</ThemedText>
                    <ThemedText variant="body2" style={styles.desc}>{user?.email}</ThemedText>
                  </View>
                  <Image source={require('@/assets/images/profil/ChevronRight.png')} style={{ width: 24, height: 24, tintColor: '#B0B0B0' }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <ThemedText variant="body1" style={styles.label}>Mot de passe</ThemedText>
                    <ThemedText variant="body2" style={styles.desc}>••••••••••</ThemedText>
                  </View>
                  <Image source={require('@/assets/images/profil/ChevronRight.png')} style={{ width: 24, height: 24, tintColor: '#B0B0B0' }} />
                </View>
              </View>
            </>
          )}

        {/* Section Notifications */}
        <View style={styles.section}>
          <ThemedText variant="subTitle1" style={styles.sectionTitle}>Notifications</ThemedText>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E0', marginBottom: 12 }} />
          <View style={styles.row}>
            <View>
              <ThemedText variant="body1" style={styles.label}>Mises à jour du Pokédex</ThemedText>
              <ThemedText variant="body2" style={styles.desc}>Nouveaux Pokémon, capacités, infos, etc.</ThemedText>
            </View>
            <Switch value={notifPokedex} onValueChange={setNotifPokedex} />
          </View>
          <View style={styles.row}>
            <View>
              <ThemedText variant="body1" style={styles.label}>Monde Pokémon</ThemedText>
              <ThemedText variant="body2" style={styles.desc}>Événements et infos du monde Pokémon.</ThemedText>
            </View>
            <Switch value={notifMonde} onValueChange={setNotifMonde} />
          </View>
        </View>

        {/* Section Langue */}
        <View style={styles.section}>
          <ThemedText variant="subTitle1" style={styles.sectionTitle}>Langue</ThemedText>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E0', marginBottom: 12 }} />
          <ThemedText variant="body1" style={styles.label}>Langue de l'interface</ThemedText>
          <ThemedText variant="body2" style={styles.desc}>Français (FR)</ThemedText>
          <ThemedText variant="body1" style={styles.label}>Langue des infos en jeu</ThemedText>
          <ThemedText variant="body2" style={styles.desc}>Français (FR)</ThemedText>
        </View>

        {/* Section Général */}
        <View style={styles.section}>
          <ThemedText variant="subTitle1" style={styles.sectionTitle}>Général</ThemedText>
          <View style={{ borderBottomWidth: 1, borderBottomColor: '#E0E0E0', marginBottom: 12 }} />
          <ThemedText variant="body1" style={styles.label}>Version</ThemedText>
          <ThemedText variant="body2" style={styles.desc}>0.0.1</ThemedText>
          <ThemedText variant="body1" style={styles.label}>Termes et conditions</ThemedText>
          <ThemedText variant="body2" style={styles.desc}>Tout ce que vous devez savoir.</ThemedText>
          <ThemedText variant="body1" style={styles.label}>Support</ThemedText>
          <ThemedText variant="body2" style={styles.desc}>https://coslado.tech</ThemedText>
          <ThemedText variant="body1" style={styles.label}>À propos</ThemedText>
          <ThemedText variant="body2" style={styles.desc}>En savoir plus sur l'app.</ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    marginBottom: 16,
    alignSelf: "flex-start",
  },
  card: {
    marginBottom: 24,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#173EA5",
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 24,
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#173EA5",
    fontWeight: "bold",
    fontSize: 16,
  },
  section: {
    backgroundColor: "#F6FAFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  label: {
    fontWeight: "bold",
  },
  desc: {
    marginBottom: 8,
    color: "#666",
  },
});