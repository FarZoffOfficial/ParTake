import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, router } from 'expo-router';
import { Mail, Lock, User, ChevronLeft, MapPin } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupScreen() {
  const { signup } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [handicap, setHandicap] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const handleSignup = () => {
    if (!firstName || !lastName || !email || !password) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (!agreeTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    signup(firstName, lastName, email, password, location, handicap);
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#4A5568" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Account</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.formSubtitle}>Join the golf community</Text>
        
        <View style={styles.inputRow}>
          <View style={[styles.inputContainer, styles.halfInput]}>
            <User size={20} color="#718096" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="#A0AEC0"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          
          <View style={[styles.inputContainer, styles.halfInput]}>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor="#A0AEC0"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Mail size={20} color="#718096" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#A0AEC0"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Lock size={20} color="#718096" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#A0AEC0"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <MapPin size={20} color="#718096" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Location (City, State)"
            placeholderTextColor="#A0AEC0"
            value={location}
            onChangeText={setLocation}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Golf Handicap (optional)"
            placeholderTextColor="#A0AEC0"
            keyboardType="numeric"
            value={handicap}
            onChangeText={setHandicap}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.termsContainer}
          onPress={() => setAgreeTerms(!agreeTerms)}
        >
          <View style={[styles.checkbox, agreeTerms && styles.checkboxActive]}>
            {agreeTerms && <View style={styles.checkboxDot} />}
          </View>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.signupButton, (!firstName || !lastName || !email || !password || !agreeTerms) && styles.signupButtonDisabled]}
          onPress={handleSignup}
          disabled={!firstName || !lastName || !email || !password || !agreeTerms}
        >
          <Text style={styles.signupButtonText}>Create Account</Text>
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
        
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Link href="/auth/login" asChild>
            <TouchableOpacity>
              <Text style={styles.loginLink}>Login</Text>
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDF2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#2D3748',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  formSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#718096',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  halfInput: {
    width: '48%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F7FAFC',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#2D3748',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#CBD5E0',
    marginRight: 10,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    borderColor: '#2F855A',
    backgroundColor: '#2F855A',
  },
  checkboxDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  termsText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#4A5568',
  },
  termsLink: {
    fontFamily: 'Inter-Medium',
    color: '#2F855A',
  },
  signupButton: {
    backgroundColor: '#2F855A',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  signupButtonDisabled: {
    backgroundColor: '#CBD5E0',
  },
  signupButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#718096',
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
    borderColor: '#E2E8F0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4A5568',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#718096',
  },
  loginLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#2F855A',
  },
});