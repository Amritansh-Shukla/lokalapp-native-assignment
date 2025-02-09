import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
let SQLite;

if (Platform.OS !== 'web') {
  // Conditionally import SQLite for native platforms
  SQLite = require('expo-sqlite');
}

const isWeb = Platform.OS === 'web';
console.log('Running on platform:', Platform.OS);

let db = null;
if (!isWeb && SQLite) {
  db = SQLite.openDatabase('bookmarks.db');
}

export const createTable = async () => {
  if (isWeb) {
    console.log('Using AsyncStorage for web.');
  } else if (db) {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS bookmarks (id INTEGER PRIMARY KEY NOT NULL, title TEXT, location TEXT, salary TEXT, phone TEXT, description TEXT);'
      );
    });
  }
};

export const insertBookmark = async (job) => {
  if (isWeb) {
    const bookmarks = JSON.parse(await AsyncStorage.getItem('bookmarks')) || [];
    bookmarks.push(job);
    await AsyncStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else if (db) {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO bookmarks (id, title, location, salary, phone, description) VALUES (?, ?, ?, ?, ?, ?);',
        [job.id, job.title, job.location, job.salary, job.phone, job.description]
      );
    });
  }
};

export const fetchBookmarks = async (callback) => {
  if (isWeb) {
    const bookmarks = JSON.parse(await AsyncStorage.getItem('bookmarks')) || [];
    callback(bookmarks);
  } else if (db) {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM bookmarks;', [], (_, { rows }) => {
        callback(rows._array);
      });
    });
  }
};

export const deleteBookmark = async (id) => {
  if (isWeb) {
    const bookmarks = JSON.parse(await AsyncStorage.getItem('bookmarks')) || [];
    const updatedBookmarks = bookmarks.filter((job) => job.id !== id);
    await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
  } else if (db) {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM bookmarks WHERE id = ?;', [id]);
    });
  }
};