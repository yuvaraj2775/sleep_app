"use client"

import React from "react"
import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, ScrollView, Switch, TouchableOpacity } from "react-native"
import { Ionicons, MaterialIcons } from "@expo/vector-icons"
import { useRouter } from 'expo-router';

export default function App() {
    const router =useRouter();
  const [chargingReminder, setChargingReminder] = React.useState(true)
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}  onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sleep settings</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Alarm Section */}
        <Text style={styles.sectionTitle}>Alarm</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Alarm settings</Text>
          <MaterialIcons name="chevron-right" size={24} color="#8c8c8c" />
        </TouchableOpacity>

        {/* Bedtime Section */}
        <Text style={styles.sectionTitle}>Bedtime</Text>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Bedtime settings</Text>
          <MaterialIcons name="chevron-right" size={24} color="#8c8c8c" />
        </TouchableOpacity>

        {/* Screen Mode Section */}
        <Text style={styles.sectionDescription}>During tracking, your screen will...</Text>
        <TouchableOpacity style={styles.menuItem}>
          <View>
            <Text style={styles.menuItemText}>Screen mode</Text>
            <Text style={styles.menuItemSubtext}>Darken only</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#8c8c8c" />
        </TouchableOpacity>

        {/* Tips Section */}
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Tips before sleep</Text>
        </TouchableOpacity>

        {/* Charging Reminder */}
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuItemText}>Charging reminder</Text>
          <Switch
            value={chargingReminder}
            onValueChange={setChargingReminder}
            trackColor={{ false: "#3a3a3c", true: "#b388ff" }}
            thumbColor={chargingReminder ? "#ffffff" : "#ffffff"}
          />
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121121",
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
  sectionTitle: {
    color: "white",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionDescription: {
    color: "white",
    fontSize: 14,
    marginTop: 20,
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  menuItemText: {
    color: "white",
    fontSize: 16,
  },
  menuItemSubtext: {
    color: "#8c8c8c",
    fontSize: 14,
    marginTop: 4,
  },
})

