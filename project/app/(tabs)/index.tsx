import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/contexts/AuthContext';
import { UserStatsCard } from '@/components/UserStatsCard';
import { ActivityCard } from '@/components/ActivityCard';
import { Card } from '@/components/ui/Card';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back, {user?.firstName || 'Golfer'}</Text>
        <Text style={styles.subtitle}>Ready for your next round?</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <UserStatsCard />

        <Text style={styles.sectionTitle}>Upcoming Games</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <Card style={styles.upcomingGame}>
            <Text style={styles.courseText}>Pine Valley Golf Club</Text>
            <Text style={styles.dateText}>Tomorrow, 8:30 AM</Text>
            <Text style={styles.playersText}>With: John D. and 2 others</Text>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
          </Card>
          <Card style={styles.upcomingGame}>
            <Text style={styles.courseText}>Augusta National</Text>
            <Text style={styles.dateText}>Sat, Jun 24 • 9:15 AM</Text>
            <Text style={styles.playersText}>With: Sarah L. and 1 other</Text>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
          </Card>
          <TouchableOpacity style={styles.addGameButton}>
            <Text style={styles.addGameText}>+ Schedule a Game</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <ActivityCard 
          type="friend_request"
          name="Mike Johnson"
          time="2h ago"
          message="Wants to connect with you"
          actionable
        />
        <ActivityCard 
          type="game_invite"
          name="Linda Smith"
          time="Yesterday"
          message="Invited you to play at Pebble Beach"
          actionable
        />
        <ActivityCard 
          type="marketplace"
          name="David Wilson"
          time="2d ago"
          message="Commented on your TaylorMade driver listing"
        />
        
        <Text style={styles.sectionTitle}>Hot Marketplace Deals</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <Card style={styles.marketplaceItem}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/6974/golf-club-la-quinta-california-desert.jpg' }} 
              style={styles.marketplaceImage}
            />
            <View style={styles.marketplaceInfo}>
              <Text style={styles.marketplaceTitle}>Titleist Pro V1 (New)</Text>
              <Text style={styles.marketplacePrice}>$35</Text>
            </View>
          </Card>
          <Card style={styles.marketplaceItem}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/2533158/pexels-photo-2533158.jpeg' }} 
              style={styles.marketplaceImage}
            />
            <View style={styles.marketplaceInfo}>
              <Text style={styles.marketplaceTitle}>Ping G425 Driver</Text>
              <Text style={styles.marketplacePrice}>$299</Text>
            </View>
          </Card>
          <Card style={styles.marketplaceItem}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/6970/golf-course-golfing-lifestyle-golf-clubs.jpg' }} 
              style={styles.marketplaceImage}
            />
            <View style={styles.marketplaceInfo}>
              <Text style={styles.marketplaceTitle}>Golf Lesson (1hr)</Text>
              <Text style={styles.marketplacePrice}>$75</Text>
            </View>
          </Card>
        </ScrollView>
        
        <View style={styles.spacer} />
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
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  greeting: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1A202C',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#718096',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#2D3748',
    marginTop: 24,
    marginBottom: 12,
  },
  horizontalScroll: {
    flexDirection: 'row',
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  upcomingGame: {
    width: 260,
    padding: 16,
    marginRight: 12,
    backgroundColor: '#FFFFFF',
  },
  courseText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#2D3748',
  },
  dateText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#2F855A',
    marginTop: 4,
  },
  playersText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#718096',
    marginTop: 8,
  },
  detailsButton: {
    backgroundColor: '#E6FFFA',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  detailsButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#2F855A',
  },
  addGameButton: {
    width: 180,
    height: 120,
    backgroundColor: '#E6FFFA',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#B2F5EA',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  addGameText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#2F855A',
  },
  marketplaceItem: {
    width: 180,
    marginRight: 12,
    overflow: 'hidden',
  },
  marketplaceImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  marketplaceInfo: {
    padding: 12,
  },
  marketplaceTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#2D3748',
  },
  marketplacePrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#2F855A',
    marginTop: 4,
  },
  spacer: {
    height: 100,
  },
});