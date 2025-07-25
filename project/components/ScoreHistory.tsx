import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Card } from './ui/Card';
import { ChevronLeft, Calendar, Target } from 'lucide-react-native';

interface ScoreHistoryProps {
  history: any[];
  onClose: () => void;
}

export function ScoreHistory({ history, onClose }: ScoreHistoryProps) {
  const renderScoreCard = ({ item }: { item: any }) => (
    <Card style={styles.scoreCard}>
      <View style={styles.scoreCardHeader}>
        <Text style={styles.courseName}>{item.courseName}</Text>
        <View style={styles.scoreInfoContainer}>
          <Text 
            style={[
              styles.scoreOverUnder,
              item.overUnder === 'E' 
                ? styles.evenPar 
                : item.overUnder < 0 
                  ? styles.underPar 
                  : styles.overPar
            ]}
          >
            {item.overUnder}
          </Text>
          <Text style={styles.scoreTotal}>{item.total}</Text>
        </View>
      </View>
      
      <View style={styles.scoreCardDetails}>
        <View style={styles.scoreCardDetail}>
          <Calendar size={16} color="#718096" />
          <Text style={styles.scoreCardDetailText}>{item.date}</Text>
        </View>
        <View style={styles.scoreCardDetail}>
          <Target size={16} color="#718096" />
          <Text style={styles.scoreCardDetailText}>Par {item.par}</Text>
        </View>
      </View>
      
      <View style={styles.holesContainer}>
        {item.scores.map((score: string, index: number) => (
          <View 
            key={index} 
            style={[
              styles.holeScore,
              parseInt(score) < parseInt(item.pars[index]) 
                ? styles.holeBirdieOrBetter 
                : parseInt(score) > parseInt(item.pars[index]) 
                  ? styles.holeBogeyOrWorse 
                  : styles.holePar
            ]}
          >
            <Text style={styles.holeNumber}>{index + 1}</Text>
            <Text style={styles.holeScoreText}>{score}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <ChevronLeft size={24} color="#4A5568" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Score History</Text>
        <View style={styles.placeholder} />
      </View>
      
      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No scores recorded yet</Text>
          <TouchableOpacity style={styles.emptyButton} onPress={onClose}>
            <Text style={styles.emptyButtonText}>Track Your First Score</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderScoreCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
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
  placeholder: {
    width: 40,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  scoreCard: {
    marginBottom: 16,
    padding: 16,
  },
  scoreCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  courseName: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#2D3748',
    flex: 1,
  },
  scoreInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreOverUnder: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    marginRight: 8,
  },
  underPar: {
    color: '#38A169', // Green
  },
  overPar: {
    color: '#E53E3E', // Red
  },
  evenPar: {
    color: '#4A5568', // Gray
  },
  scoreTotal: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#2D3748',
  },
  scoreCardDetails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  scoreCardDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  scoreCardDetailText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#718096',
    marginLeft: 4,
  },
  holesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  holeScore: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginBottom: 8,
    position: 'relative',
  },
  holePar: {
    backgroundColor: '#EDF2F7',
  },
  holeBirdieOrBetter: {
    backgroundColor: '#C6F6D5',
  },
  holeBogeyOrWorse: {
    backgroundColor: '#FED7D7',
  },
  holeNumber: {
    position: 'absolute',
    top: 2,
    right: 2,
    fontFamily: 'Inter-Regular',
    fontSize: 8,
    color: '#718096',
  },
  holeScoreText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#2D3748',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#718096',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyButton: {
    backgroundColor: '#2F855A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  emptyButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});