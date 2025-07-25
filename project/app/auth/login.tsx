import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';
import { Mail, Lock, ArrowRight } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleLogin = () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    
    login(email, password);
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.logoContainer}>
        <Image source={{ uri: 'https://images.pexels.com/photos/6974/golf-club-la-quinta-california-desert.jpg' }} style={styles.logoBackground} />
        <View style={styles.logoOverlay} />
        <Text style={styles.logoText}>ParTake</Text>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Welcome Back</Text>
        <Text style={styles.formSubtitle}>Log in to continue your golf journey</Text>
        
        <View style={styles.inputContainer}>
          <Mail size={20} color="#A0AEC0" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#718096"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Lock size={20} color="#A0AEC0" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#718096"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        
        <View style={styles.optionsRow}>
          <TouchableOpacity 
            style={styles.rememberContainer}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
              {rememberMe && <View style={styles.checkboxDot} />}
            </View>
            <Text style={styles.rememberText}>Remember me</Text>
          </TouchableOpacity>
          
          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
          <ArrowRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>
        
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Apple</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Link href="/auth/signup" asChild>
            <TouchableOpacity>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1A1E23',
  },
  logoContainer: {
    height: 200,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logoOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  logoText: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#E2FF3D',
    zIndex: 1,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#1A1E23',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 40,
  },
  formTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  formSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#A0AEC0',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D3748',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#252A34',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#2D3748',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    borderColor: '#E2FF3D',
    backgroundColor: '#E2FF3D',
  },
  checkboxDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: '#1A1E23',
  },
  rememberText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#A0AEC0',
  },
  forgotText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#E2FF3D',
  },
  loginButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E2FF3D',
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 24,
  },
  loginButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#1A1E23',
    marginRight: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#2D3748',
  },
  dividerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#A0AEC0',
    marginHorizontal: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  socialButton: {
    flex: 0.48,
    height: 46,
    borderWidth: 1,
    borderColor: '#2D3748',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#252A34',
  },
  socialButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#A0AEC0',
  },
  signupLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#E2FF3D',
  },
});