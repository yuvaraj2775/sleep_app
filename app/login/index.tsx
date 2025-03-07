"use client";
import { useState } from "react";
import { useRouter } from 'expo-router';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function LoginPage() {
      const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <FontAwesome name="star" size={24} color="#b388ff" />
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.subtitle}>Please log in to continue your journey to better sleep.</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <Feather name="eye-off" size={20} color="#666" />
              ) : (
                <Feather name="eye" size={20} color="#666" />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity  onPress={() => router.push('./forgotpass')}>
            <Text style={styles.forgotPassword}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signInButton}>
          <Text style={styles.signInButtonText}>Sign in</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or continue with</Text>

        <View style={styles.socialButtons}>
          <TouchableOpacity style={styles.socialButton}>
            <AntDesign name="apple1" size={20} color="white" />
            <Text style={styles.socialButtonText}>Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <AntDesign name="google" size={20} color="white" />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <AntDesign name="facebook-square" size={20} color="white" />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        {/* Sign Up Section - Now Clearly Visible */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText} >Don't have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.signUpLink}  onPress={() => router.push('./signup')}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#121121", 
    padding: 20 
  },
  header: { 
    alignItems: "center", 
    marginTop: 10, 
    marginBottom: 40 
  },
  welcomeText: { 
    fontSize: 24, 
    fontWeight: "bold", 
    color: "white", 
    marginTop: 16, 
    marginBottom: 8 
    
  },
  subtitle: { 
    fontSize: 16, 
    color: "#666", 
    textAlign: "center" 
  },
  form: { 
    flex: 1,  
    justifyContent: "center",  
    gap: 24 
  },
  inputContainer: { 
    gap: 8 
  },
  label: { 
    color: "white", 
    fontSize: 16, 
    fontWeight: "500" 
  },
  input: { 
    backgroundColor: "rgba(255, 255, 255, 0.1)", 
    borderRadius: 8, 
    padding: 16, 
    color: "white", 
    fontSize: 16 
  },
  passwordContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "rgba(255, 255, 255, 0.1)", 
    borderRadius: 8 
  },
  passwordInput: { 
    flex: 1, 
    padding: 16, 
    color: "white", 
    fontSize: 16 
  },
  eyeIcon: { 
    padding: 16 
  },
  forgotPassword: { 
    color: "#b388ff", 
    fontSize: 14, 
    textAlign: "right", 
    marginTop: 8 
  },
  signInButton: { 
    backgroundColor: "#b388ff", 
    borderRadius: 8, 
    padding: 16, 
    alignItems: "center", 
    marginTop: 8 
  },
  signInButtonText: { 
    color: "white", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  orText: { 
    color: "#666", 
    fontSize: 14, 
    textAlign: "center", 
    marginVertical: 16 
  },
  socialButtons: { 
    flexDirection: "row", 
    justifyContent: "center", 
    gap: 16 
  },
  socialButton: { 
    backgroundColor: "rgba(255, 255, 255, 0.1)", 
    borderRadius: 8, 
    padding: 16, 
    flex: 1, 
    alignItems: "center" 
  },
  socialButtonText: { 
    color: "white", 
    fontSize: 14, 
    marginTop: 4 
  },
  signUpContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 40, // Keeps it visible
    marginBottom: 40 // Prevents cut-off on some screens
  },
  signUpText: { 
    color: "white",  
    fontSize: 14 
  },
  signUpLink: { 
    color: "#b388ff", 
    fontSize: 14, 
    paddingHorizontal: 5 
  },
});

