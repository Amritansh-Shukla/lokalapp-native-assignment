import React from 'react';
import MainNavigator from './src/navigate/MainNavigator.js';
import BookmarkProvider from './src/contexts/BookmarkContext.js';
import { ThemeProvider } from './src/contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
    <BookmarkProvider>
      <MainNavigator />
    </BookmarkProvider>
    </ThemeProvider>
  );
}
