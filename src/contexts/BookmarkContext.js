import React, { createContext, useState, useEffect } from 'react';
import { createTable, insertBookmark, fetchBookmarks, deleteBookmark } from '../utils/database';

export const BookmarkContext = createContext();

export default function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    createTable();
    fetchBookmarks(setBookmarks);
  }, []);

  const addBookmark = (job) => {
    setBookmarks((prev) => [...prev, job]);
    insertBookmark(job);
  };

  const removeBookmark = (id) => {
    setBookmarks((prev) => prev.filter((job) => job.id !== id));
    deleteBookmark(id);
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
}
