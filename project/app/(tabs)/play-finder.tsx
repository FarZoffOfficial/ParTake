import { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, PanResponder } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MessageSquare, X, Heart, Filter, Star } from 'lucide-react-native';
import { Header } from '@/components/ui/Header';
import { golfers } from '@/data/golfers';

const SWIPE_THRESHOLD = 120;

export default function PlayFinderScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const rotation = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD * 2, 0, SWIPE_THRESHOLD * 2],
    outputRange: ['-30deg', '0deg', '30deg'],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > SWIPE_THRESHOLD) {
          swipeRight();
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          swipeLeft();
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -SWIPE_THRESHOLD * 2, y: 0 },
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, golfers.length - 1));
      position.setValue({ x: 0, y: 0 });
    });
  };

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: SWIPE_THRESHOLD * 2, y: 0 },
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, golfers.length - 1));
      position.setValue({ x: 0, y: 0 });
    });
  };

  if (!golfers[currentIndex]) {
    return (
      <View style={styles.container}>
        <Header title="PlayFinder" />
        <View style={styles.noMoreCardsContainer}>
          <Text style={styles.noMoreCardsText}>No more golfers in your area</Text>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={() => setCurrentIndex(0)}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const golfer = golfers[currentIndex];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Header 
        title="PlayFinder" 
        rightIcon={<Filter size={24} color="#718096" />}
        onRightPress={() => console.log('Filter pressed')} 
      />

      <View style={styles.cardContainer}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.card,
            {
              transform: [
                { translateX: position.x },
                { translateY: position.y },
                { rotate: rotation },
              ],
            },
          ]}
        >
          <Image source={{ uri: golfer.photo }} style={styles.cardImage} />
          <View style={styles.cardInfo}>
            <View style={styles.nameContainer}>
              <Text style={styles.cardName}>{golfer.name}, {golfer.age}</Text>
              {golfer.verified && (
                <Star size={18} color="#F6AD55" fill="#F6AD55" style={styles.verifiedIcon} />
              )}
            </View>
            <Text style={styles.cardLocation}>{golfer.location}</Text>
            <View style={styles.handicapContainer}>
              <Text style={styles.handicapLabel}>Handicap:</Text>
              <Text style={styles.handicapValue}>{golfer.handicap}</Text>
            </View>
            <Text style={styles.cardBio}>{golfer.bio}</Text>
            <View style={styles.badgesContainer}>
              {golfer.badges.map((badge, index) => (
                <View key={index} style={styles.badge}>
                  <Text style={styles.badgeText}>{badge}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>

        {/* Next card preview */}
        {golfers[currentIndex + 1] && (
          <View style={[styles.card, styles.nextCard]}>
            <Image source={{ uri: golfers[currentIndex + 1].photo }} style={styles.cardImage} />
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.passButton]} onPress={swipeLeft}>
          <X size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.messageButton]}>
          <MessageSquare size={24} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.likeButton]} onPress={swipeRight}>
          <Heart size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  card: {
    width: '100%',
    height: '80%',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    overflow: 'hidden',
  },
  nextCard: {
    position: 'absolute',
    top: '10%',
    left: 16,
    right: 16,
    zIndex: -1,
    height: '80%',
    transform: [{ scale: 0.95 }],
    opacity: 0.7,
  },
  cardImage: {
    width: '100%',
    height: '60%',
  },
  cardInfo: {
    padding: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedIcon: {
    marginLeft: 8,
  },
  cardName: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#2D3748',
  },
  cardLocation: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#718096',
    marginTop: 4,
  },
  handicapContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  handicapLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#4A5568',
  },
  handicapValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#2F855A',
    marginLeft: 8,
  },
  cardBio: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#4A5568',
    marginTop: 12,
    lineHeight: 20,
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  badge: {
    backgroundColor: '#E6FFFA',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  badgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#2F855A',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  passButton: {
    backgroundColor: '#FC8181',
  },
  messageButton: {
    backgroundColor: '#4299E1',
  },
  likeButton: {
    backgroundColor: '#2F855A',
  },
  noMoreCardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noMoreCardsText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: '#4A5568',
    textAlign: 'center',
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: '#2F855A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  resetButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
});