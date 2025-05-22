import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterScreen() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleNext = () => setStep((s) => (s < 4 ? (s + 1) as any : s));
  const handlePrev = () => {
    if (step === 1) {
      router.back();
      return;
    }
    setStep((s) => (s > 1 ? (s - 1) as any : s))
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      await register(name, email, password);
      setLoading(false);
      setSuccess(true);
    } catch (err: any) {
      setLoading(false);
      alert(err.message || "Erreur lors de la création du compte");
    }
  };

  if (success) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center" }]}>
        <Image source={require('@/assets/images/register/succesRegisterPersonna.png')} style={styles.successImg} resizeMode="contain" />
        <Text style={styles.successTitle}>Votre compte a été créé avec succès !</Text>
        <Text style={styles.successDesc}>Bienvenue, {name || "dresseur"} ! Vous pouvez maintenant explorer le monde Pokémon.</Text>
        <TouchableOpacity
          style={[styles.loginBtn, { opacity: 1 }]} // bouton toujours visible
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.successBtnText}>Continuer</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#F6FAFF" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={handlePrev}>
            <Image source={require('@/assets/images/Back.png')} style={{ width: 34, height: 34, tintColor: "#B0B0B0" }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Créer compte</Text>
          <View style={{ width: 34 }} />
        </View>
        <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}>
          {step === 1 && (
            <>
              <Image source={require('@/assets/images/register/registerPersonna.png')} style={styles.illustration} resizeMode="contain" />
              <Text style={styles.title}>Félicitations, vous êtes sur le point d'explorer ce monde !</Text>
              {/* Pas de boutons Apple/Google */}
              <TouchableOpacity style={styles.emailBtn} onPress={handleNext}>
                <Text style={styles.emailBtnText}>Continuer avec un e-mail</Text>
              </TouchableOpacity>
            </>
          )}
          {step === 2 && (
            <View style={styles.form}>
              <Text style={styles.formTitleBold}>Quel est votre e-mail ?</Text>
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={email}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholderTextColor="#B0B0B0"
              />
              <TouchableOpacity
                style={[styles.loginBtn, { backgroundColor: email ? "#173EA5" : "#B0B0B0" }]}
                onPress={handleNext}
                disabled={!email}
              >
                <Text style={styles.loginBtnText}>Continuer</Text>
              </TouchableOpacity>
            </View>
          )}
          {step === 3 && (
            <View style={styles.form}>
              <Text style={styles.formTitleBold}>Créez un mot de passe</Text>
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
              <TouchableOpacity
                style={[styles.loginBtn, { backgroundColor: password ? "#173EA5" : "#B0B0B0" }]}
                onPress={handleNext}
                disabled={!password}
              >
                <Text style={styles.loginBtnText}>Continuer</Text>
              </TouchableOpacity>
            </View>
          )}
          {step === 4 && (
            <View style={styles.form}>
              <Text style={styles.formTitleBold}>Quel est votre nom ?</Text>
              <TextInput
                style={styles.input}
                placeholder="Nom"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#B0B0B0"
              />
              <TouchableOpacity
                style={[styles.loginBtn, { backgroundColor: name ? "#173EA5" : "#B0B0B0" }]}
                onPress={handleRegister}
                disabled={!name || loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginBtnText}>Créer compte</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    backgroundColor: "#F6FAFF",
    justifyContent: "center",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 8,
    marginTop: 8,
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
    width: 266,
    height: 282,
    marginBottom: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#222",
    alignSelf: "center",
  },
  emailBtn: {
    width: "100%",
    backgroundColor: "#173EA5",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 24,
  },
  emailBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  form: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  formTitleBold: {
    fontWeight: "bold",
    color: "#222",
    fontSize: 16,
    marginBottom: 16
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
});
