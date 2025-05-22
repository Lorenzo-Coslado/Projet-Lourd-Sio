// Nouveau fichier: /app/(tabs)/amis.tsx
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/AuthContext";
import friendService from "@/services/friendService";
import userService from "@/services/userService";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AmisScreen() {
  const { user, isAuth } = useAuth();
  const [friends, setFriends] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    friendService.getFriends(user.id)
      .then(data => {
        // Mapping des statuts pour le front
        const mapped = data.map((f: any) => {
          let status = f.status;
          if (status === "pending") {
            status = f.requested_by === user.id ? "pending_sent" : "pending_received";
          }
          return {
            id: f.id,
            name: f.name,
            email: f.email,
            status,
            requested_by: f.requested_by,
            requester_name: f.requester_name,
            requester_email: f.requester_email,
          };
        });
        setFriends(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.id]);

  useEffect(() => {
    if (showAdd && user?.id) {
      userService.getUsers(user.id)
        .then(users => setAllUsers(users))
        .catch(() => setAllUsers([]));
    }
  }, [showAdd, user?.id]);

  useEffect(() => {
    if (!search) {
      setSuggestions([]);
      return;
    }
    const filtered = allUsers.filter(u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    );
    setSuggestions(filtered);
  }, [search, allUsers]);

  const acceptedFriends = friends.filter(f => f.status === "accepted");
  const pendingReceived = friends.filter(f => f.status === "pending_received");
  const pendingSent = friends.filter(f => f.status === "pending_sent");

  const sections = [
    { title: "Amis", data: acceptedFriends },
    { title: "Demandes reçues", data: pendingReceived },
    { title: "Demandes envoyées", data: pendingSent },
  ];

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

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText variant="headline" style={styles.title}>Mes amis</ThemedText>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText variant="headline" style={styles.title}>Mes amis</ThemedText>
      <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)}>
        <Text style={styles.addBtnText}>Ajouter un ami</Text>
      </TouchableOpacity>
      {showAdd && (
        <View style={styles.addContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email ou pseudo"
            value={search}
            onChangeText={setSearch}
          />
          {/* Suggestions dynamiques */}
          {suggestions.length > 0 && (
            <View style={{ backgroundColor: '#F0F4FA', borderRadius: 8, marginBottom: 8 }}>
              {suggestions.map(s => (
                <TouchableOpacity
                  key={s.id}
                  style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' }}
                  onPress={async () => {
                    if (!user?.id) return;
                    try {
                      await friendService.addFriendRequest(user.id, s.id);
                      setShowAdd(false);
                      setSearch("");
                      // Rafraîchir la liste des amis
                      const data = await friendService.getFriends(user.id);
                      const mapped = data.map((f: any) => {
                        let status = f.status;
                        if (status === "pending") {
                          status = f.requested_by === user.id ? "pending_sent" : "pending_received";
                        }
                        return {
                          id: f.id,
                          name: f.name,
                          email: f.email,
                          status,
                          requested_by: f.requested_by,
                          requester_name: f.requester_name,
                          requester_email: f.requester_email,
                        };
                      });
                      setFriends(mapped);
                    } catch (e) {
                      // Gérer l'erreur si besoin
                    }
                  }}
                >
                  <Text>{s.name} <Text style={{ color: '#888' }}>({s.email})</Text></Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={async () => {
              if (!user?.id) return;
              // Trouver l'utilisateur correspondant à la recherche
              const found = allUsers.find(u =>
                u.name.toLowerCase() === search.toLowerCase() ||
                u.email.toLowerCase() === search.toLowerCase()
              );
              if (!found) return;
              try {
                await friendService.addFriendRequest(user.id, found.id);
                setShowAdd(false);
                setSearch("");
                // Rafraîchir la liste des amis
                const data = await friendService.getFriends(user.id);
                const mapped = data.map((f: any) => {
                  let status = f.status;
                  if (status === "pending") {
                    status = f.requested_by === user.id ? "pending_sent" : "pending_received";
                  }
                  return {
                    id: f.id,
                    name: f.name,
                    email: f.email,
                    status,
                    requested_by: f.requested_by,
                    requester_name: f.requester_name,
                    requester_email: f.requester_email,
                  };
                });
                setFriends(mapped);
              } catch (e) {
                // Gérer l'erreur si besoin
              }
            }}
          >
            <Text style={styles.confirmBtnText}>Envoyer la demande</Text>
          </TouchableOpacity>
        </View>
      )}
      <SectionList
        sections={sections}
        keyExtractor={item => item.id.toString()}
        renderSectionHeader={({ section: { title, data } }) => (
          <View>
            <Text style={styles.sectionTitle}>{title}</Text>
            {data.length === 0 && (
              <Text style={{ color: '#888', fontStyle: 'italic', marginBottom: 8 }}>
                {title === 'Amis' && 'Aucun ami pour l’instant. Ajoutez votre premier ami !'}
                {title === 'Demandes reçues' && 'Aucune demande reçue.'}
                {title === 'Demandes envoyées' && 'Aucune demande envoyée.'}
              </Text>
            )}
          </View>
        )}
        renderItem={({ item, section }) => {
          if (item.status === "accepted") {
            return (
              <View style={styles.friendRow}>
                <Image source={require('@/assets/images/profil/avatar.png')} style={styles.avatar} />
                <Text style={styles.friendName}>{item.name}</Text>
                <TouchableOpacity style={styles.removeBtn} onPress={async () => {
                  if (!user?.id) return;
                  try {
                    await friendService.deleteFriend(user.id, item.id);
                    // Rafraîchir la liste des amis
                    const data = await friendService.getFriends(user.id);
                    const mapped = data.map((f: any) => {
                      let status = f.status;
                      if (status === "pending") {
                        status = f.requested_by === user.id ? "pending_sent" : "pending_received";
                      }
                      return {
                        id: f.id,
                        name: f.name,
                        email: f.email,
                        status,
                        requested_by: f.requested_by,
                        requester_name: f.requester_name,
                        requester_email: f.requester_email,
                      };
                    });
                    setFriends(mapped);
                  } catch (e) { }
                }}>
                  <Text style={{ color: "red" }}>Retirer</Text>
                </TouchableOpacity>
              </View>
            );
          }
          if (item.status === "pending_received") {
            return (
              <View style={styles.friendRow}>
                <Image source={require('@/assets/images/profil/avatar.png')} style={styles.avatar} />
                <Text style={styles.friendName}>{item.name}</Text>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity style={[styles.confirmBtn, { marginRight: 8, paddingHorizontal: 12, paddingVertical: 6 }]} onPress={async () => {
                    if (!user?.id) return;
                    try {
                      await friendService.acceptFriendRequest(user.id, item.id);
                      // Rafraîchir la liste des amis
                      const data = await friendService.getFriends(user.id);
                      const mapped = data.map((f: any) => {
                        let status = f.status;
                        if (status === "pending") {
                          status = f.requested_by === user.id ? "pending_sent" : "pending_received";
                        }
                        return {
                          id: f.id,
                          name: f.name,
                          email: f.email,
                          status,
                          requested_by: f.requested_by,
                          requester_name: f.requester_name,
                          requester_email: f.requester_email,
                        };
                      });
                      setFriends(mapped);
                    } catch (e) { }
                  }}>
                    <Text style={styles.confirmBtnText}>Accepter</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.removeBtn, { paddingHorizontal: 12, paddingVertical: 6 }]} onPress={async () => {
                    if (!user?.id) return;
                    try {
                      await friendService.rejectFriendRequest(user.id, item.id);
                      // Rafraîchir la liste des amis
                      const data = await friendService.getFriends(user.id);
                      const mapped = data.map((f: any) => {
                        let status = f.status;
                        if (status === "pending") {
                          status = f.requested_by === user.id ? "pending_sent" : "pending_received";
                        }
                        return {
                          id: f.id,
                          name: f.name,
                          email: f.email,
                          status,
                          requested_by: f.requested_by,
                          requester_name: f.requester_name,
                          requester_email: f.requester_email,
                        };
                      });
                      setFriends(mapped);
                    } catch (e) { }
                  }}>
                    <Text style={{ color: "red" }}>Refuser</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
          if (item.status === "pending_sent") {
            return (
              <View style={styles.friendRow}>
                <Image source={require('@/assets/images/profil/avatar.png')} style={styles.avatar} />
                <Text style={styles.friendName}>{item.name}</Text>
                <Text style={{ color: "#888", fontStyle: "italic" }}>En attente...</Text>
              </View>
            );
          }
          return null;
        }}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 32 }}>Aucun ami pour l’instant.</Text>}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6FAFF", padding: 16 },
  title: { marginBottom: 16 },
  addBtn: { backgroundColor: "#173EA5", borderRadius: 12, padding: 12, alignItems: "center", marginBottom: 16 },
  addBtnText: { color: "#fff", fontWeight: "bold" },
  addContainer: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 8, padding: 8, marginBottom: 8 },
  confirmBtn: { backgroundColor: "#173EA5", borderRadius: 8, padding: 10, alignItems: "center" },
  confirmBtnText: { color: "#fff", fontWeight: "bold" },
  friendRow: { flexDirection: "row", alignItems: "center", marginBottom: 12, backgroundColor: "#fff", borderRadius: 8, padding: 8 },
  avatar: { width: 32, height: 32, borderRadius: 16, marginRight: 12 },
  friendName: { flex: 1, fontWeight: "bold" },
  removeBtn: { padding: 8 },
  sectionTitle: { fontWeight: "bold", fontSize: 16, marginVertical: 8 },
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
});