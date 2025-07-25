import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Search, Filter, ChevronDown, Tag, FileSliders as Sliders, CirclePlus as PlusCircle } from 'lucide-react-native';
import { Header } from '@/components/ui/Header';
import { Card } from '@/components/ui/Card';
import { marketplaceItems } from '@/data/marketplace';

const categories = ['All', 'Clubs', 'Balls', 'Apparel', 'Accessories', 'Lessons'];

export default function MarketplaceScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  
  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <Header 
        title="Marketplace" 
        rightIcon={<Filter size={24} color="#718096" />} 
        onRightPress={() => console.log('Filter pressed')}
      />
      
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#718096" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search golf gear..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text 
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <View style={styles.sortContainer}>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortText}>Sort by: {sortBy}</Text>
          <ChevronDown size={16} color="#4A5568" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.priceButton}>
          <Text style={styles.priceText}>Price</Text>
          <Sliders size={16} color="#4A5568" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.itemsGrid}>
          {filteredItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.itemCard}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              {item.isNew && <View style={styles.newBadge}><Text style={styles.newBadgeText}>NEW</Text></View>}
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
                <View style={styles.itemFooter}>
                  <View style={styles.sellerInfo}>
                    <Image source={{ uri: item.sellerAvatar }} style={styles.sellerAvatar} />
                    <Text style={styles.sellerName}>{item.sellerName}</Text>
                  </View>
                  {item.offerType === 'trade' && (
                    <View style={styles.tradeBadge}>
                      <Tag size={12} color="#805AD5" />
                      <Text style={styles.tradeBadgeText}>Trade</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.spacer} />
      </ScrollView>
      
      <TouchableOpacity style={styles.addButton}>
        <PlusCircle size={24} color="#FFFFFF" />
        <Text style={styles.addButtonText}>List Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#2D3748',
    padding: 10,
  },
  categoriesScroll: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  categoriesContainer: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
    backgroundColor: '#EDF2F7',
  },
  selectedCategoryButton: {
    backgroundColor: '#2F855A',
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4A5568',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  sortContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  sortText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4A5568',
    marginRight: 4,
  },
  priceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF2F7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  priceText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4A5568',
    marginRight: 4,
  },
  listContainer: {
    flex: 1,
    padding: 12,
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  newBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#ED8936',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  newBadgeText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 10,
  },
  itemDetails: {
    padding: 12,
  },
  itemTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#2D3748',
    marginBottom: 4,
  },
  itemPrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#2F855A',
    marginBottom: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 4,
  },
  sellerName: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#718096',
  },
  tradeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tradeBadgeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: '#805AD5',
    marginLeft: 2,
  },
  spacer: {
    height: 80,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#2F855A',
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});