import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the bookmark icon
import axios from 'axios';
import { BookmarkContext } from '../contexts/BookmarkContext';

export default function JobsScreen({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { bookmarks, addBookmark, removeBookmark } = useContext(BookmarkContext);

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

  useEffect(() => {
    fetchJobs();
  }, []);

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
      style={styles.card}
      onPress={() => navigation.navigate('JobDetails', { job: item })}
    >
      <View style={styles.cardContent}>
        <View style={{ flex: 1, flexShrink: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.detail}>Location: {item.job_location_slug || "N/A"}</Text>
          <Text style={styles.detail}>Salary: {item.salary_min || "N/A"}</Text>
          <Text style={styles.detail}>Phone: {item.whatsapp_no || "N/A"}</Text>
        </View>
        <TouchableOpacity onPress={() => handleBookmarkToggle(item)} style={styles.bookmarkIcon}>
          <Ionicons
            name={isBookmarked(item.id) ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={isBookmarked(item.id) ? 'blue' : 'gray'}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>Failed to load jobs. Please try again later.</Text>}
      <FlatList
        data={jobs}
        renderItem={renderJobCard}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        onEndReached={fetchJobs}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 10 
  },
  card: { 
    padding: 15, 
    marginVertical: 10, 
    backgroundColor: '#f9f9f9', 
    borderRadius: 10 
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap', // Allow items to wrap if space is limited
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    flexShrink: 1, // Prevents text from overflowing
  },
  detail: { 
    fontSize: 16, 
    color: '#555',
    flexShrink: 1, 
  },
  bookmarkIcon: {
    marginLeft: 10, // Ensures some spacing
    minWidth: 30, // Prevents it from disappearing
    alignSelf: 'center',
  },
  error: { 
    color: 'red', 
    textAlign: 'center', 
    marginVertical: 10 
  },
});