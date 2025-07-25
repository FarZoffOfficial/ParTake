import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Settings, CreditCard as Edit2, LogOut, MapPin, Award, Calendar, Club as GolfClub, UserPlus } from 'lucide-react-native';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#718096" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg' }} 
            style={styles.profileImage} 
          />
          <TouchableOpacity style={styles.editProfileButton}>
            <Edit2 size={16} color="#FFFFFF" />
          </TouchableOpacity>
          
          <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#718096" />
            <Text style={styles.location}>San Francisco, CA</Text>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12.4</Text>
              <Text style={styles.statLabel}>Handicap</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>28</Text>
              <Text style={styles.statLabel}>Games</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>19</Text>
              <Text style={styles.statLabel}>Friends</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.badgesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.badgesContainer}
          >
            <View style={styles.badge}>
              <View style={styles.badgeIcon}>
                <Award size={24} color="#2F855A" />
              </View>
              <Text style={styles.badgeName}>Birdie Master</Text>
            </View>
            <View style={styles.badge}>
              <View style={[styles.badgeIcon, { backgroundColor: '#FEEBCB' }]}>
                <Calendar size={24} color="#DD6B20" />
              </View>
              <Text style={styles.badgeName}>5 Games</Text>
            </View>
            <View style={styles.badge}>
              <View style={[styles.badgeIcon, { backgroundColor: '#E9D8FD' }]}>
                <GolfClub size={24} color="#805AD5" />
              </View>
              <Text style={styles.badgeName}>Consistent</Text>
            </View>
            <View style={styles.badge}>
              <View style={[styles.badgeIcon, { backgroundColor: '#BEE3F8' }]}>
                <UserPlus size={24} color="#3182CE" />
              </View>
              <Text style={styles.badgeName}>Networker</Text>
            </View>
          </ScrollView>
        </View>
        
        <Card style={styles.activityCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>
                You played a round at <Text style={styles.highlightText}>Pebble Beach</Text>
              </Text>
              <Text style={styles.activityTime}>2 days ago</Text>
            </View>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>
                You connected with <Text style={styles.highlightText}>Sarah Johnson</Text>
              </Text>
              <Text style={styles.activityTime}>4 days ago</Text>
            </View>
          </View>
          
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>
                You listed <Text style={styles.highlightText}>Titleist Pro V1</Text> on the marketplace
              </Text>
              <Text style={styles.activityTime}>1 week ago</Text>
            </View>
          </View>
        </Card>
        
        <Card style={styles.friendsCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Golf Friends</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.friendsGrid}>
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <View key={index} style={styles.friendItem}>
                <Image 
                  source={{ uri: `https://images.pexels.com/photos/${3014850 + index}/pexels-photo-${3014850 + index}.jpeg` }} 
                  style={styles.friendImage} 
                />
                <Text style={styles.friendName}>
                  {['Mike', 'Sarah', 'John', 'Emily', 'David', 'Lisa'][index]}
                </Text>
              </View>
            ))}
          </View>
        </Card>
        
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <LogOut size={20} color="#E53E3E" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EDF2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  editProfileButton: {
    position: 'absolute',
    top: 84,
    right: '37%',
    backgroundColor: '#2F855A',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  name: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#2D3748',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  location: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#718096',
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#2F855A',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#718096',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
  },
  badgesSection: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#2D3748',
  },
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#2F855A',
  },
  badgesContainer: {
    paddingVertical: 8,
  },
  badge: {
    alignItems: 'center',
    marginRight: 24,
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#C6F6D5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4A5568',
  },
  activityCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  activityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2F855A',
    marginTop: 6,
    marginRight: 8,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
  highlightText: {
    fontFamily: 'Inter-Medium',
    color: '#2D3748',
  },
  activityTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#A0AEC0',
    marginTop: 2,
  },
  friendsCard: {
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
  },
  friendsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  friendItem: {
    width: '33%',
    alignItems: 'center',
    marginBottom: 16,
  },
  friendImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 6,
  },
  friendName: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4A5568',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FED7D7',
  },
  logoutText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#E53E3E',
    marginLeft: 8,
  },
  bottomSpacer: {
    height: 80,
  },
});