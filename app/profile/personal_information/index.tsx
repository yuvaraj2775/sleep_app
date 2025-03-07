import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PersonalInformationScreen({ navigation }) {
    const router =useRouter();
  const handleBack = () => {
    router.back();
  };

  const fields = [
    {
      label: 'Name',
      value: 'Maria',
      editable: true,
    },
    {
      label: 'Email',
      value: 'maria.shevchenko@gmail.com',
      editable: true,
    },
    {
      label: 'Gender',
      value: 'Female',
      hasChevron: true,
    },
    {
      label: 'Height',
      value: '161 cm',
      hasChevron: true,
    },
    {
      label: 'Weight',
      value: '72 kg',
      hasChevron: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Information</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cOShI9eSbfwv2pdWeUyp7f1vKcvzBA.png" }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraButton}>
            <Ionicons name="camera" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          {fields.map((field, index) => (
            <View key={index} style={styles.fieldContainer}>
              <Text style={styles.label}>{field.label}</Text>
              <TouchableOpacity 
                style={[
                  styles.inputContainer,
                  !field.editable && styles.selectContainer
                ]}
              >
                {field.editable ? (
                  <TextInput
                    style={styles.input}
                    value={field.value}
                    placeholderTextColor="#666"
                    editable={field.editable}
                  />
                ) : (
                  <View style={styles.selectContent}>
                    <Text style={styles.selectText}>{field.value}</Text>
                    {field.hasChevron && (
                      <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
                    )}
                  </View>
                )}
              </TouchableOpacity>
            </View>
          ))}
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
    paddingHorizontal: 16,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  cameraButton: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    backgroundColor: '#b388ff',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    gap: 20,
  },
  fieldContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    height: 48,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingHorizontal: 16,
  },
  selectContainer: {
    justifyContent: 'center',
  },
  selectContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  selectText: {
    color: 'white',
    fontSize: 16,
  },
});