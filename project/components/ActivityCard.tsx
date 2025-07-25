import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MessageSquare, Calendar, Tag, Check, X } from 'lucide-react-native';

interface ActivityCardProps {
  type: 'message' | 'game_invite' | 'friend_request' | 'marketplace';
  name: string;
  time: string;
  message: string;
  actionable?: boolean;
}

export function ActivityCard({ type, name, time, message, actionable = false }: ActivityCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'message':
        return <MessageSquare size={20} color="#3182CE" />;
      case 'game_invite':
        return <Calendar size={20} color="#805AD5" />;
      case 'friend_request':
        return <MessageSquare size={20} color="#2F855A" />;
      case 'marketplace':
        return <Tag size={20} color="#DD6B20" />;
      default:
        return null;
    }
  };
  
  const getIconBackgroundColor = () => {
    switch (type) {
      case 'message':
        return '#EBF8FF';
      case 'game_invite':
        return '#E9D8FD';
      case 'friend_request':
        return '#E6FFFA';
      case 'marketplace':
        return '#FEEBC8';
      default:
        return '#EDF2F7';
    }
  };
  
  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.iconContainer, 
          { backgroundColor: getIconBackgroundColor() }
        ]}
      >
        {getIcon()}
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        
        <Text style={styles.message}>{message}</Text>
        
        {actionable && (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.acceptButton}>
              <Check size={16} color="#FFFFFF" />
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.declineButton}>
              <X size={16} color="#718096" />
              <Text style={styles.declineButtonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#2D3748',
  },
  time: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#A0AEC0',
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2F855A',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  acceptButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  declineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  declineButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#718096',
    marginLeft: 4,
  },
});