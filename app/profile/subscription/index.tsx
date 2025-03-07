"use client"

import { useState } from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, Switch, TouchableOpacity } from "react-native"
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons"
import { useRouter } from 'expo-router';

export default function App() {
  const [onlineBackup, setOnlineBackup] = useState(false)
  const [sleepNotes, setSleepNotes] = useState(false)
  const [wakeUpMood, setWakeUpMood] = useState(false)
  const [weather, setWeather] = useState(false)
  const [whosSnoring, setWhosSnoring] = useState(false)
  const router = useRouter();

  const handleBack = () => {
      
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
       <View style={styles.header}>
              <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Ionicons name="chevron-back" size={24} color="white" />
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Settings</Text>
            </View>

      <View style={styles.content}>
        {/* Online backup */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.leftContent}>
            <Ionicons name="cloud-outline" size={22} color="#3498db" />
            <Text style={styles.menuItemText}>Online backup</Text>
          </View>
          <Switch
            value={onlineBackup}
            onValueChange={setOnlineBackup}
            trackColor={{ false: "#1a1a1a", true: "#3498db" }}
            thumbColor={"#ffffff"}
          />
        </TouchableOpacity>

        {/* Sleep aid */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.leftContent}>
            <Ionicons name="moon-outline" size={22} color="#3498db" />
            <Text style={styles.menuItemText}>Sleep aid</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>

        {/* Sleep notes */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.leftContent}>
            <Feather name="edit-2" size={22} color="#3498db" />
            <Text style={styles.menuItemText}>Sleep notes</Text>
          </View>
          <Switch
            value={sleepNotes}
            onValueChange={setSleepNotes}
            trackColor={{ false: "#1a1a1a", true: "#3498db" }}
            thumbColor={"#ffffff"}
          />
        </TouchableOpacity>

        {/* Wake up mood */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.leftContent}>
            <Ionicons name="happy-outline" size={22} color="#3498db" />
            <Text style={styles.menuItemText}>Wake up mood</Text>
          </View>
          <Switch
            value={wakeUpMood}
            onValueChange={setWakeUpMood}
            trackColor={{ false: "#1a1a1a", true: "#3498db" }}
            thumbColor={"#ffffff"}
          />
        </TouchableOpacity>

        {/* Weather */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.leftContent}>
            <Ionicons name="partly-sunny-outline" size={22} color="#3498db" />
            <Text style={styles.menuItemText}>Weather</Text>
          </View>
          <Switch
            value={weather}
            onValueChange={setWeather}
            trackColor={{ false: "#1a1a1a", true: "#3498db" }}
            thumbColor={"#ffffff"}
          />
        </TouchableOpacity>

        {/* Who's snoring */}
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.leftContent}>
            <MaterialCommunityIcons name="sleep" size={22} color="#3498db" />
            <Text style={styles.menuItemText}>Who's snoring</Text>
          </View>
          <Switch
            value={whosSnoring}
            onValueChange={setWhosSnoring}
            trackColor={{ false: "#3a3a3c", true: "#b388ff50" }}
            thumbColor={whosSnoring ? '#b388ff' : '#ffffff'}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a1622",
    paddingTop: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(142, 142, 147, 0.1)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },
  backText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.05)",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    color: "white",
    fontSize: 16,
    marginLeft: 12,
  },
})

