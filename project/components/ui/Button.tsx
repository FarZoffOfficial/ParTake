import { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  children,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) {
  
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle[] = [styles.button];
    
    // Add variant styles
    switch (variant) {
      case 'primary':
        buttonStyle.push(styles.primaryButton);
        break;
      case 'secondary':
        buttonStyle.push(styles.secondaryButton);
        break;
      case 'outline':
        buttonStyle.push(styles.outlineButton);
        break;
      case 'ghost':
        buttonStyle.push(styles.ghostButton);
        break;
    }
    
    // Add size styles
    switch (size) {
      case 'sm':
        buttonStyle.push(styles.smallButton);
        break;
      case 'md':
        buttonStyle.push(styles.mediumButton);
        break;
      case 'lg':
        buttonStyle.push(styles.largeButton);
        break;
    }
    
    // Add full width style
    if (fullWidth) {
      buttonStyle.push(styles.fullWidthButton);
    }
    
    // Add disabled style
    if (disabled || loading) {
      buttonStyle.push(styles.disabledButton);
    }
    
    // Add custom style
    if (style) {
      buttonStyle.push(style);
    }
    
    return buttonStyle;
  };
  
  const getTextStyle = () => {
    let buttonTextStyle: TextStyle[] = [styles.buttonText];
    
    // Add variant text styles
    switch (variant) {
      case 'primary':
        buttonTextStyle.push(styles.primaryButtonText);
        break;
      case 'secondary':
        buttonTextStyle.push(styles.secondaryButtonText);
        break;
      case 'outline':
        buttonTextStyle.push(styles.outlineButtonText);
        break;
      case 'ghost':
        buttonTextStyle.push(styles.ghostButtonText);
        break;
    }
    
    // Add size text styles
    switch (size) {
      case 'sm':
        buttonTextStyle.push(styles.smallButtonText);
        break;
      case 'md':
        buttonTextStyle.push(styles.mediumButtonText);
        break;
      case 'lg':
        buttonTextStyle.push(styles.largeButtonText);
        break;
    }
    
    // Add disabled text style
    if (disabled) {
      buttonTextStyle.push(styles.disabledButtonText);
    }
    
    // Add custom text style
    if (textStyle) {
      buttonTextStyle.push(textStyle);
    }
    
    return buttonTextStyle;
  };
  
  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'primary' ? '#FFFFFF' : '#2F855A'} />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text style={getTextStyle()}>{children}</Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#2F855A',
  },
  secondaryButton: {
    backgroundColor: '#E6FFFA',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2F855A',
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mediumButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  largeButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  fullWidthButton: {
    width: '100%',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#2F855A',
  },
  outlineButtonText: {
    color: '#2F855A',
  },
  ghostButtonText: {
    color: '#2F855A',
  },
  smallButtonText: {
    fontSize: 14,
  },
  mediumButtonText: {
    fontSize: 16,
  },
  largeButtonText: {
    fontSize: 18,
  },
  disabledButtonText: {
    opacity: 0.8,
  },
});