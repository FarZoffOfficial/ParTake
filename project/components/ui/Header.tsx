import { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { router } from 'expo-router';

interface HeaderProps {
  title: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  showBack?: boolean;
}

export function Header({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  showBack = false,
}: HeaderProps) {
  
  const handleBackPress = () => {
    router.back();
  };
  
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={onLeftPress || handleBackPress}
          >
            <ChevronLeft size={24} color="#4A5568" />
          </TouchableOpacity>
        ) : leftIcon ? (
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={onLeftPress}
            disabled={!onLeftPress}
          >
            {leftIcon}
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.rightContainer}>
        {rightIcon ? (
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={onRightPress}
            disabled={!onRightPress}
          >
            {rightIcon}
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  leftContainer: {
    width: 40,
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#2D3748',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 40,
  },
});