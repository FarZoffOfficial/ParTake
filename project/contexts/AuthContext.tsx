import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the user type
type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  location?: string;
  handicap?: string;
};

// Define the context type
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  signup: (firstName: string, lastName: string, email: string, password: string, location?: string, handicap?: string) => void;
  logout: () => void;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
type AuthProviderProps = {
  children: ReactNode;
};

// Create the provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      // In a real app, this would be an actual API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll accept any email/password and create a mock user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        firstName: 'John',
        lastName: 'Doe',
        email: email,
      };
      
      // Save user data to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      
      // Update state
      setUser(newUser);
      
      // Navigate to the main app
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (
    firstName: string, 
    lastName: string, 
    email: string, 
    password: string, 
    location?: string, 
    handicap?: string
  ) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new user object
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        firstName,
        lastName,
        email,
        location,
        handicap,
      };
      
      // Save user data to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      
      // Update state
      setUser(newUser);
      
      // Navigate to the main app
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Remove user data from AsyncStorage
      await AsyncStorage.removeItem('user');
      
      // Clear user state
      setUser(null);
      
      // Navigate to the login screen
      router.replace('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}