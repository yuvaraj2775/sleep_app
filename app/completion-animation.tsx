"use client"

import { useEffect } from "react"
import { View, Text, StyleSheet, Animated } from "react-native"
import { Star } from "lucide-react-native"
import AntDesign from '@expo/vector-icons/AntDesign';

export default function CompletionAnimation({ onComplete }: { onComplete: () => void }) {
  const scaleAnim = new Animated.Value(0)
  const opacityAnim = new Animated.Value(0)

  useEffect(() => {
    // Scale up animation
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 50,
          friction: 3,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // Wait for 2 seconds
      Animated.delay(2000),
      // Fade out
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onComplete()
    })
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <AntDesign size={48} color="#b388ff" />
        <Text style={styles.title}>Setup Complete!</Text>
        <Text style={styles.subtitle}>Your journey to better sleep begins now</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121121",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: "#aaa",
  },
})

