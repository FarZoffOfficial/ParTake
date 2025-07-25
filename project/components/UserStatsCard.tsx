import { View, Text, StyleSheet } from 'react-native';
import { Card } from './ui/Card';
import { Target, Flag, Trophy } from 'lucide-react-native';

export function UserStatsCard() {
  return (
    <Card style={styles.container}>
      <View style={styles.statRow}>
        <View style={styles.statItem}>
          <View style={styles.iconContainer}>
            <Target size={20} color="#2F855A" />
          </View>
          <View>
            <Text style={styles.statValue}>12.4</Text>
            <Text style={styles.statLabel}>Handicap</Text>
          </View>
        </View>
        
        <View style={styles.separator} />
        
        <View style={styles.statItem}>
          <View style={[styles.iconContainer, styles.playedIcon]}>
            <Flag size={20} color="#3182CE" />
          </View>
          <View>
            <Text style={styles.statValue}>28</Text>
            <Text style={styles.statLabel}>Played</Text>
          </View>
        </View>
        
        <View style={styles.separator} />
        
        <View style={styles.statItem}>
          <View style={[styles.iconContainer, styles.bestScoreIcon]}>
            <Trophy size={20} color="#DD6B20" />
          </View>
          <View>
            <Text style={styles.statValue}>72</Text>
            <Text style={styles.statLabel}>Best Score</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6FFFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  playedIcon: {
    backgroundColor: '#EBF8FF',
  },
  bestScoreIcon: {
    backgroundColor: '#FEEBC8',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#2D3748',
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#718096',
    marginTop: 2,
  },
  separator: {
    width: 1,
    height: 40,
    backgroundColor: '#E2E8F0',
  },
});