import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HelpSupportScreen() {
  const router = useRouter();

  const supportOptions = [
    {
      icon: <Ionicons name="document-text-outline" size={22} color="#8E8E93" />,
      title: "FAQs",
      description: "Find answers to common questions",
    },
    {
      icon: <MaterialIcons name="contact-support" size={22} color="#8E8E93" />,
      title: "Contact Support",
      description: "Get help from our support team",
    },
    {
      icon: <Ionicons name="chatbubble-ellipses-outline" size={22} color="#8E8E93" />,
      title: "Live Chat",
      description: "Chat with our support agents",
    },
    {
      icon: <MaterialCommunityIcons name="video-outline" size={22} color="#8E8E93" />,
      title: "Video Tutorials",
      description: "Learn how to use the app",
    },
    {
      icon: <MaterialIcons name="feedback" size={22} color="#8E8E93" />,
      title: "Send Feedback",
      description: "Help us improve the app",
    },
    {
      icon: <Ionicons name="bug-outline" size={22} color="#8E8E93" />,
      title: "Report a Bug",
      description: "Let us know if something isn't working",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>How can we help you?</Text>
        
        <View style={styles.optionsContainer}>
          {supportOptions.map((option, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.optionItem}
            >
              <View style={styles.optionIconContainer}>
                {option.icon}
              </View>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Direct Contact</Text>
          <View style={styles.contactItem}>
            <Ionicons name="mail-outline" size={18} color="#8E8E93" />
            <Text style={styles.contactText}>support@sleepapp.com</Text>
          </View>
          <View style={styles.contactItem}>
            <Ionicons name="call-outline" size={18} color="#8E8E93" />
            <Text style={styles.contactText}>+1 (800) 123-4567</Text>
          </View>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(142, 142, 147, 0.1)',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: 'white',
    marginBottom: 24,
  },
  optionsContainer: {
    marginBottom: 32,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
  contactSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginBottom: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 8,
  },
});