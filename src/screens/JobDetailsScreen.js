import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the back button
import { ThemeContext } from '../contexts/ThemeContext';

export default function JobDetailsScreen({ route, navigation }) {
  const { theme } = useContext(ThemeContext); // Get theme
  const { job } = route.params; // Get job details from navigation

  // Set up a custom header with a back button
  useEffect(() => {
    navigation.setOptions({
      title: "Job Details",
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme === 'dark' ? 'white' : 'black'} />
        </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: theme === 'dark' ? '#121212' : 'white' },
      headerTitleStyle: { color: theme === 'dark' ? 'white' : 'black' },
    });
  }, [theme, navigation]);

  return (
    <ScrollView style={[styles.container, theme === 'dark' ? styles.containerDark : styles.containerLight]}>
      <Text style={[styles.title, theme === 'dark' && styles.textDark]}>{job.title}</Text>
      <Text style={[styles.detail, theme === 'dark' && styles.textDark]}>
        🏢 Company: {job.company_name || "N/A"}
      </Text>
      <Text style={[styles.detail, theme === 'dark' && styles.textDark]}>
        📍 Location: {job.job_location_slug || "N/A"}
      </Text>
      <Text style={[styles.detail, theme === 'dark' && styles.textDark]}>
        💰 Salary: {job.salary_min ? `$${job.salary_min}` : "N/A"}
      </Text>
      <Text style={[styles.detail, theme === 'dark' && styles.textDark]}>
        📞 Contact: {job.whatsapp_no || "N/A"}
      </Text>
      <Text style={[styles.description, theme === 'dark' && styles.textDark]}>
        {job.description || "No job description available."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15 },
  containerLight: { backgroundColor: 'white' },
  containerDark: { backgroundColor: '#121212' },

  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  detail: { fontSize: 18, marginBottom: 5, color: '#555' },
  description: { fontSize: 16, marginTop: 10, color: '#333' },

  textDark: { color: 'white' },

  backButton: {
    marginLeft: 15,
  },
});
