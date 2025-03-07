import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
    const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSignUp = () => {
    // Implement sign up logic here
    console.log('Sign up with:', email, password);
  };

  const navigateToLogin = () => {
    // Navigate to login screen
    console.log('Navigate to login');
  };

  const handleSkip = () => {
    // Skip sign up
    console.log('Skip sign up');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
     

      {/* Star Icon */}
      <View style={styles.starContainer}>
        <MaterialCommunityIcons name="star-four-points" size={32} color="#FFD700" />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formContainer}
      >
        {/* Title */}
        <Text style={styles.title}>Join Wellness now</Text>
        <Text style={styles.subtitle}>
          Create an account so you don't lose your preferences and progress on any device.
        </Text>

        {/* Form */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
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
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              placeholderTextColor="#666"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              <Ionicons 
                name={isPasswordVisible ? "eye-off" : "eye"} 
                size={24} 
                color="#666" 
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.passwordRequirement}>Must contain at least 8 characters</Text>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity 
          style={styles.signUpButton} 
          onPress={handleSignUp}
        >
          <Text style={styles.signUpButtonText}>Sign up</Text>
        </TouchableOpacity>

        {/* Social Login */}
        <View style={styles.socialContainer}>
          <Text style={styles.orText}>or continue with</Text>
          
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" size={24} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="google" size={24} color="white" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Link */}
        <TouchableOpacity 
          style={styles.loginLink} 
          onPress={navigateToLogin}
        >
          <Text style={styles.loginText}  onPress={() => router.push('./login')}>
            I already have an account. <Text style={styles.loginHighlight} >Log in</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    justifyContent: 'flex-end',
    padding: 16,
  },
  skipButton: {
    padding: 8,
  },
  skipText: {
    color: '#8e8e93',
    fontSize: 16,
  },
  starContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign:"center",
  },
  subtitle: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 32,
    lineHeight: 20,
    textAlign:"center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#8e8e93',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    padding: 16,
    color: 'white',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    color: 'white',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  passwordRequirement: {
    fontSize: 12,
    color: '#8e8e93',
    marginTop: 8,
  },
  signUpButton: {
    backgroundColor: '#b388ff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  socialContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  orText: {
    color: '#8e8e93',
    fontSize: 14,
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginLink: {
    marginTop: 32,
    alignItems: 'center',
  },
  loginText: {
    color: '#8e8e93',
    fontSize: 14,
  },
  loginHighlight: {
    color: 'white',
    textDecorationLine: 'underline',
  },
});