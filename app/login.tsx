import { ThemedText } from "@/components/ThemedText";
import { useAuth } from "@/context/AuthContext";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 3 = succès
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const colors = useThemeColor();
  const { login, user } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      setStep(3);
    } catch (err: any) {
      alert(err.message || "Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center" }]}>
        <Image source={require('@/assets/images/login/sucessLoginPersonna.png')} style={styles.successImg} resizeMode="contain" />
        <Text style={styles.successTitle}>Connexion réussie !</Text>
        <Text style={styles.successDesc}>
          Bienvenue{user?.name ? ` ${user.name}` : ""}, vous êtes maintenant connecté.
        </Text>
        <TouchableOpacity
          style={[styles.loginBtn, { opacity: 1 }]}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.successBtnText}>Continuer</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => step === 1 ? router.back() : setStep(1)}>
            <Image source={require('@/assets/images/Back.png')} style={{ width: 34, height: 34, tintColor: colors.grayMedium }} />
          </TouchableOpacity>
          <ThemedText variant="headline" style={styles.headerTitle}>Connexion</ThemedText>
          <View style={{ width: 34 }} />
        </View>
        {step === 1 && (
          <View style={styles.classicStep}>
            <Image source={require('@/assets/images/login/loginPersonna.png')} style={styles.illustration} resizeMode="contain" />
            <Text style={styles.welcome}>Heureux de vous revoir ici !</Text>
            <Text style={styles.subtitle}>Choisissez une méthode de connexion :</Text>
            <TouchableOpacity style={styles.emailBtn} onPress={() => setStep(2)}>
              <Text style={styles.emailBtnText}>Continuer avec un e-mail</Text>
            </TouchableOpacity>
          </View>
        )}
        {step === 2 && (
          <View style={styles.centerStep}>
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>Bienvenue de retour !{"\n"}<Text style={styles.formTitleBold}>Veuillez remplir les champs</Text></Text>
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholderTextColor="#B0B0B0"
              />
              <View style={styles.passwordRow}>
                <TextInput
                  style={[styles.input, { flex: 1, marginBottom: 0 }]}
                  placeholder="Mot de passe"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#B0B0B0"
                />
                <TouchableOpacity onPress={() => setShowPassword((v) => !v)} style={styles.eyeBtn}>
                  <Image
                    source={showPassword
                      ? require('@/assets/images/eyeClosed.png')
                      : require('@/assets/images/eye.png')}
                    style={{ width: 22, height: 22, tintColor: "#B0B0B0" }}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.forgotBtn} >
                <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.loginBtn, { backgroundColor: email && password ? "#173EA5" : "#B0B0B0" }]}
                onPress={handleLogin}
                disabled={!email || !password || loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginBtnText}>Se connecter</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  backBtn: {
    alignSelf: "flex-start",
  },
  illustration: {
    width: 284,
    height: 284,
    marginBottom: 16,
    marginTop: 8,
  },
  welcome: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
    color: "#222",
    alignSelf: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  emailBtn: {
    width: "100%",
    backgroundColor: "#173EA5",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 24,
  },
  emailBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#F6FAFF",
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  formTitle: {
    fontSize: 16,
    color: "#222",
    marginBottom: 8,
    textAlign: "left",
  },
  formTitleBold: {
    fontWeight: "bold",
    color: "#222",
  },
  input: {
    width: "100%",
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    fontSize: 15,
    marginBottom: 14,
    color: "#222",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  eyeBtn: {
    marginLeft: 8,
    padding: 4,
  },
  forgotBtn: {
    alignSelf: "flex-end",
    marginBottom: 18,
  },
  forgotText: {
    color: "#173EA5",
    fontSize: 13,
    fontWeight: "500",
  },
  loginBtn: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  loginBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  successImg: {
    width: 410,
    height: 325,
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 8,
  },
  successDesc: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  successBtnText: {
    color: "#fff",
    backgroundColor: "#173EA5",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignItems: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  centerStep: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  classicStep: {
    flex: 1,
    marginTop: 34,
    width: "100%",
    alignItems: "center",
  }
});
