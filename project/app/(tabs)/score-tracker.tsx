import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { CirclePlus as PlusCircle, ChevronDown, Save, History } from 'lucide-react-native';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ScoreHistory } from '@/components/ScoreHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ScoreTrackerScreen() {
  const [activeTab, setActiveTab] = useState('newScore');
  const [courseName, setCourseName] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [holes, setHoles] = useState('18');
  const [scores, setScores] = useState(Array(18).fill(''));
  const [pars, setPars] = useState(Array(18).fill('4'));
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState([]);
  
  const visibleHoles = parseInt(holes, 10);
  
  const calculateTotal = () => {
    return scores
      .slice(0, visibleHoles)
      .reduce((sum, score) => sum + (parseInt(score) || 0), 0);
  };
  
  const calculatePar = () => {
    return pars
      .slice(0, visibleHoles)
      .reduce((sum, par) => sum + (parseInt(par) || 0), 0);
  };
  
  const getTotalOverUnder = () => {
    const total = calculateTotal();
    const par = calculatePar();
    const diff = total - par;
    
    if (diff === 0) return 'E';
    return diff > 0 ? `+${diff}` : diff;
  };

  const handleScoreChange = (index, value) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  const handleParChange = (index, value) => {
    const newPars = [...pars];
    newPars[index] = value;
    setPars(newPars);
  };

  const saveScore = async () => {
    if (!courseName) {
      alert('Please enter a course name');
      return;
    }

    const scoreData = {
      id: Date.now().toString(),
      courseName,
      date,
      holes: visibleHoles,
      scores: scores.slice(0, visibleHoles),
      pars: pars.slice(0, visibleHoles),
      total: calculateTotal(),
      par: calculatePar(),
      overUnder: getTotalOverUnder(),
    };

    try {
      // Get existing scores
      const existingScoresJson = await AsyncStorage.getItem('golfScores');
      const existingScores = existingScoresJson ? JSON.parse(existingScoresJson) : [];
      
      // Add new score to the beginning of the array
      const updatedScores = [scoreData, ...existingScores];
      
      // Save back to storage
      await AsyncStorage.setItem('golfScores', JSON.stringify(updatedScores));
      
      // Reset form
      setCourseName('');
      setScores(Array(18).fill(''));
      setPars(Array(18).fill('4'));
      
      // Update history
      setHistory(updatedScores);
      
      // Show success message
      alert('Score saved successfully!');
    } catch (error) {
      console.error('Error saving score:', error);
      alert('Failed to save score. Please try again.');
    }
  };

  const loadScoreHistory = async () => {
    try {
      const scoresJson = await AsyncStorage.getItem('golfScores');
      if (scoresJson) {
        const loadedScores = JSON.parse(scoresJson);
        setHistory(loadedScores);
      }
    } catch (error) {
      console.error('Error loading score history:', error);
    }
  };

  const renderHoleInputs = () => {
    const rows = [];
    for (let i = 0; i < visibleHoles; i++) {
      rows.push(
        <View key={i} style={styles.holeRow}>
          <View style={styles.holeNumberContainer}>
            <Text style={styles.holeNumber}>{i + 1}</Text>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Par</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={pars[i]}
              onChangeText={(value) => handleParChange(i, value)}
              maxLength={1}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Score</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={scores[i]}
              onChangeText={(value) => handleScoreChange(i, value)}
              maxLength={2}
            />
          </View>
          <View style={styles.scoreDiff}>
            <Text 
              style={[
                styles.scoreDiffText,
                scores[i] && (parseInt(scores[i]) < parseInt(pars[i]) 
                  ? styles.underPar 
                  : parseInt(scores[i]) > parseInt(pars[i]) 
                    ? styles.overPar 
                    : styles.evenPar)
              ]}
            >
              {scores[i] 
                ? parseInt(scores[i]) === parseInt(pars[i]) 
                  ? 'E' 
                  : parseInt(scores[i]) < parseInt(pars[i]) 
                    ? `${parseInt(scores[i]) - parseInt(pars[i])}` 
                    : `+${parseInt(scores[i]) - parseInt(pars[i])}` 
                : ''}
            </Text>
          </View>
        </View>
      );
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Score Tracker" 
        rightIcon={<History size={24} color="#718096" />}
        onRightPress={() => {
          loadScoreHistory();
          setShowHistory(true);
        }} 
      />
      
      {showHistory ? (
        <ScoreHistory 
          history={history} 
          onClose={() => setShowHistory(false)} 
        />
      ) : (
        <>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'newScore' && styles.activeTab]}
              onPress={() => setActiveTab('newScore')}
            >
              <Text 
                style={[
                  styles.tabText, 
                  activeTab === 'newScore' && styles.activeTabText
                ]}
              >
                New Score
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'stats' && styles.activeTab]}
              onPress={() => setActiveTab('stats')}
            >
              <Text 
                style={[
                  styles.tabText, 
                  activeTab === 'stats' && styles.activeTabText
                ]}
              >
                Stats
              </Text>
            </TouchableOpacity>
          </View>
          
          {activeTab === 'newScore' && (
            <ScrollView style={styles.content}>
              <Card style={styles.courseDetailsCard}>
                <Text style={styles.cardTitle}>Course Details</Text>
                
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Course Name</Text>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter course name"
                    value={courseName}
                    onChangeText={setCourseName}
                  />
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Date</Text>
                  <TouchableOpacity style={styles.dateSelector}>
                    <Text style={styles.dateText}>{date}</Text>
                    <ChevronDown size={16} color="#4A5568" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Holes</Text>
                  <View style={styles.holesToggle}>
                    <TouchableOpacity
                      style={[
                        styles.holeOption,
                        holes === '9' && styles.activeHoleOption
                      ]}
                      onPress={() => setHoles('9')}
                    >
                      <Text 
                        style={[
                          styles.holeOptionText,
                          holes === '9' && styles.activeHoleOptionText
                        ]}
                      >
                        9
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.holeOption,
                        holes === '18' && styles.activeHoleOption
                      ]}
                      onPress={() => setHoles('18')}
                    >
                      <Text 
                        style={[
                          styles.holeOptionText,
                          holes === '18' && styles.activeHoleOptionText
                        ]}
                      >
                        18
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
              
              <Card style={styles.scoreCard}>
                <Text style={styles.cardTitle}>Enter Scores</Text>
                <View style={styles.holeRowHeader}>
                  <Text style={styles.holeHeaderText}>Hole</Text>
                  <Text style={styles.holeHeaderText}>Par</Text>
                  <Text style={styles.holeHeaderText}>Score</Text>
                  <Text style={styles.holeHeaderText}>+/-</Text>
                </View>
                
                {renderHoleInputs()}
                
                <View style={styles.totalSection}>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total Par:</Text>
                    <Text style={styles.totalValue}>{calculatePar()}</Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Your Score:</Text>
                    <Text style={styles.totalValue}>{calculateTotal()}</Text>
                  </View>
                  <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Over/Under:</Text>
                    <Text 
                      style={[
                        styles.totalValue,
                        getTotalOverUnder() === 'E' 
                          ? styles.evenPar 
                          : getTotalOverUnder() < 0 
                            ? styles.underPar 
                            : styles.overPar
                      ]}
                    >
                      {getTotalOverUnder()}
                    </Text>
                  </View>
                </View>
                
                <Button 
                  icon={<Save size={18} color="#FFFFFF" />}
                  onPress={saveScore}
                  style={styles.saveButton}
                >
                  Save Score
                </Button>
              </Card>
              
              <View style={styles.bottomSpacer} />
            </ScrollView>
          )}
          
          {activeTab === 'stats' && (
            <ScrollView style={styles.content}>
              <Card style={styles.statsCard}>
                <Text style={styles.cardTitle}>Coming Soon</Text>
                <Text style={styles.statsMessage}>
                  We're working on comprehensive stats tracking for your golf game. 
                  Check back soon for detailed analytics on your performance!
                </Text>
              </Card>
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2F855A',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#718096',
  },
  activeTabText: {
    color: '#2F855A',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  courseDetailsCard: {
    marginBottom: 16,
    padding: 16,
  },
  cardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#2D3748',
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#2D3748',
    backgroundColor: '#FFFFFF',
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFFFFF',
  },
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#2D3748',
  },
  holesToggle: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  holeOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  activeHoleOption: {
    backgroundColor: '#2F855A',
  },
  holeOptionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#4A5568',
  },
  activeHoleOptionText: {
    color: '#FFFFFF',
  },
  scoreCard: {
    padding: 16,
  },
  holeRowHeader: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    marginBottom: 12,
  },
  holeHeaderText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
  },
  holeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  holeNumberContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EBF8FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  holeNumber: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#4299E1',
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: 4,
  },
  inputLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#718096',
    marginBottom: 2,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    padding: 8,
    textAlign: 'center',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#2D3748',
    backgroundColor: '#FFFFFF',
  },
  scoreDiff: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreDiffText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
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
  totalSection: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#4A5568',
  },
  totalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#2D3748',
  },
  saveButton: {
    marginTop: 24,
  },
  bottomSpacer: {
    height: 100,
  },
  statsCard: {
    padding: 20,
    alignItems: 'center',
  },
  statsMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
  },
});