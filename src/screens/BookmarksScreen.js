import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the back button
import { BookmarkContext } from '../contexts/BookmarkContext';
import { ThemeContext } from '../contexts/ThemeContext';

export default function BookmarksScreen({ navigation }) {
  const { bookmarks, removeBookmark } = useContext(BookmarkContext);
  const { theme } = useContext(ThemeContext); // Get current theme

  useEffect(() => {
    navigation.setOptions({
      title: "Bookmarks",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: theme === 'dark' ? '#121212' : 'white' },
      headerTitleStyle: { color: theme === 'dark' ? 'white' : 'black' },
    });
  }, [theme, navigation]);

  const renderBookmarkCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, theme === 'dark' ? styles.cardDark : styles.cardLight]}
      onPress={() => navigation.navigate('JobDetails', { job: item })}
    >
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, theme === 'dark' && styles.textDark]}>{item.title}</Text>
          <Text style={[styles.detail, theme === 'dark' && styles.textDark]}>
            Location: {item.job_location_slug || "N/A"}
          </Text>
          <Text style={[styles.detail, theme === 'dark' && styles.textDark]}>
            Salary: {item.salary_min || "N/A"}
          </Text>
        </View>

        {/* Remove bookmark button */}
        <TouchableOpacity onPress={() => removeBookmark(item.id)} style={styles.bookmarkIcon}>
          <Ionicons name="bookmark" size={24} color={theme === 'dark' ? 'blue' : 'gray'} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, theme === 'dark' ? styles.containerDark : styles.containerLight]}>
      {bookmarks.length === 0 ? (
        <Text style={[styles.emptyText, theme === 'dark' && styles.textDark]}>No bookmarks yet.</Text>
      ) : (
        <FlatList
          data={bookmarks}
          renderItem={renderBookmarkCard}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  containerLight: { backgroundColor: 'white' },
  containerDark: { backgroundColor: '#121212' },

  card: { padding: 15, marginVertical: 10, borderRadius: 10 },
  cardLight: { backgroundColor: '#f9f9f9' },
  cardDark: { backgroundColor: '#1e1e1e' },

  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textContainer: {
    flex: 1,
    marginRight: 10,
  },

  title: { fontSize: 18, fontWeight: 'bold' },
  detail: { fontSize: 16, color: '#555' },

  textDark: { color: 'white' },

  emptyText: { textAlign: 'center', fontSize: 18, marginTop: 20 },

  bookmarkIcon: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButton: {
    marginLeft: 15,
  },
});
