import React from 'react';
import MainNavigator from './src/navigate/MainNavigator.js';
import BookmarkProvider from './src/contexts/BookmarkContext.js';

export default function App() {
  return (
    <BookmarkProvider>
      <MainNavigator />
    </BookmarkProvider>
  );
}
