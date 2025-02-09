// BookmarksScreen.js
import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { BookmarkContext } from '../contexts/BookmarkContext';

export default function BookmarksScreen() {
  const { bookmarks } = useContext(BookmarkContext);

  const renderBookmark = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>Location: {item.job_location_slug}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {bookmarks.length === 0 ? (
        <Text style={styles.empty}>No bookmarks yet!</Text>
      ) : (
        <FlatList
          data={bookmarks}
          renderItem={renderBookmark}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  card: { padding: 15, marginVertical: 10, backgroundColor: '#f9f9f9', borderRadius: 10 },
  title: { fontSize: 18, fontWeight: 'bold' },
  text: { fontSize: 16, color: '#555' },
  empty: { textAlign: 'center', fontSize: 18, color: 'gray', marginTop: 20 },
});
