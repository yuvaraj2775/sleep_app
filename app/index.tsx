"use client"

import { useRouter } from "expo-router"
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from "react-native"

const App = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
       
      </View>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1534685785745-60a2cea0ec34?q=80&w=1000", // Night sky with moon image
        }}
        style={styles.background}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
      <Image
          source={{
            uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-avOnzLPVIUsQLdERvoXNospV3X0pHu.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>Wellness</Text>
        <Text style={styles.subtitle}>Healthy sleep is the basis for a healthy life</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push("./general")}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSecondary} onPress={() => router.push("./profile")}>
          <Text style={styles.buttonTextSecondary}>Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay to darken background for text readability
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#A97BFF", // Purple color for "Get Started" button
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonTextSecondary: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  logoContainer: {
    position: "absolute",
    top: 40,
    alignSelf: "center",
    zIndex: 10,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
})

export default App

