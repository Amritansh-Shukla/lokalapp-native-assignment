import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { BookmarkContext } from '../contexts/BookmarkContext';
import { ThemeContext } from '../contexts/ThemeContext';

export default function JobsScreen({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { bookmarks, addBookmark, removeBookmark } = useContext(BookmarkContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    // Set the navigation options dynamically
    navigation.setOptions({
      title: "Jobs",
      headerRight: () => (
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggleButton}>
          <Ionicons 
            name={theme === 'dark' ? 'sunny' : 'moon'} 
            size={24} 
            color={theme === 'dark' ? 'white' : 'black'} 
          />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: theme === 'dark' ? '#121212' : 'white',
      },
      headerTitleStyle: {
        color: theme === 'dark' ? 'white' : 'black',
      },
    });
  }, [theme, navigation]);

  const fetchJobs = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=${page}`);
      const jobResults = response.data.results || [];
      setJobs((prev) => [...prev, ...jobResults]);
      setPage(page + 1);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const isBookmarked = (jobId) => bookmarks.some((bookmark) => bookmark.id === jobId);

  const handleBookmarkToggle = (job) => {
    if (isBookmarked(job.id)) {
      removeBookmark(job.id);
    } else {
      addBookmark(job);
    }
  };

  const renderJobCard = ({ item }) => (
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

        {/* Bookmark Icon */}
        <TouchableOpacity onPress={() => handleBookmarkToggle(item)} style={styles.bookmarkIcon}>
          <Ionicons
            name={isBookmarked(item.id) ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={theme === 'dark' ? 'blue' : 'gray'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, theme === 'dark' ? styles.containerDark : styles.containerLight]}>
      {error && <Text style={[styles.error, theme === 'dark' && styles.textDark]}>Failed to load jobs.</Text>}

      <FlatList
        data={jobs}
        renderItem={renderJobCard}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        onEndReached={fetchJobs}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color={theme === 'dark' ? 'white' : 'black'} /> : null}
      />
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

  error: { color: 'red', textAlign: 'center', marginVertical: 10 },

  bookmarkIcon: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Theme Toggle Button (in Navbar)
  themeToggleButton: {
    marginRight: 15, // Add spacing from the right side
  },
});
