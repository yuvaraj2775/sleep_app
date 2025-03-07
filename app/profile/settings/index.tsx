"use client"

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const [toggleStates, setToggleStates] = useState({
    recordSleep: true,
    checkBeforeSleep: true,
    wakeUpMood: false,
    chargingReminder: true,
  });

  const handleBack = () => {
    router.back();
  };

  const generalPreferences = [
    {
      title: "Language",
      value: "English",
      hasChevron: true,
    },
    {
      title: "Time zone",
      value: "System default",
      hasChevron: true,
    },
    {
      title: "Time format",
      value: "12 hour",
      hasChevron: true,
    },
  ];

  const sleepTracking = [
    {
      title: "Record sleep & snore",
      description: "Capture sleep sounds and ambient noise to analyze and improve your sleep quality",
      toggleKey: "recordSleep",
    },
    {
      title: "Check before sleep",
      description: "Monitor your sleep environment to ensure good sleep quality",
      toggleKey: "checkBeforeSleep",
    },
    {
      title: "Wake up mood",
      description: "Track your wake-up moods to help you find ways to wake up feeling refreshed",
      toggleKey: "wakeUpMood",
    },
    {
      title: "Charging & placing reminder",
      description: "A smart reminder at your bed time to place your phone on charge",
      toggleKey: "chargingReminder",
    },
  ];

  const handleToggle = (key: keyof typeof toggleStates) => {
    setToggleStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.content}>
        {/* General Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>GENERAL PREFERENCES</Text>
          <View style={styles.sectionContent}>
            {generalPreferences.map((item, index) => (
              <TouchableOpacity 
                key={index}
                style={[
                  styles.menuItem,
                  index === generalPreferences.length - 1 && styles.lastMenuItem
                ]}
              >
                <Text style={styles.menuItemText}>{item.title}</Text>
                <View style={styles.menuItemRight}>
                  <Text style={styles.menuItemValue}>{item.value}</Text>
                  {item.hasChevron && (
                    <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Sleep Tracking Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>SLEEP TRACKING</Text>
          <View style={styles.sectionContent}>
            {sleepTracking.map((item, index) => (
              <View 
                key={index}
                style={[
                  styles.toggleItem,
                  index === sleepTracking.length - 1 && styles.lastMenuItem
                ]}
              >
                <View style={styles.toggleItemContent}>
                  <Text style={styles.toggleItemTitle}>{item.title}</Text>
                  <Text style={styles.toggleItemDescription}>{item.description}</Text>
                </View>
                <Switch
                  value={toggleStates[item.toggleKey as keyof typeof toggleStates]}
                  onValueChange={() => handleToggle(item.toggleKey as keyof typeof toggleStates)}
                  trackColor={{ false: '#3a3a3c', true: '#b388ff50' }}
                  thumbColor={toggleStates[item.toggleKey as keyof typeof toggleStates] ? '#b388ff' : '#ffffff'}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121121',
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
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '500',
    color: '#8E8E93',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  sectionContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(142, 142, 147, 0.1)',
  },
  menuItemText: {
    fontSize: 16,
    color: 'white',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  menuItemValue: {
    fontSize: 16,
    color: '#8E8E93',
  },
  toggleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(142, 142, 147, 0.1)',
    minHeight: 76,
  },
  toggleItemContent: {
    flex: 1,
    marginRight: 12,
  },
  toggleItemTitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 4,
  },
  toggleItemDescription: {
    fontSize: 13,
    color: '#8E8E93',
    lineHeight: 18,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
});