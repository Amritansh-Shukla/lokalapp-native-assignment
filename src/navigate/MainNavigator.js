import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import JobsScreen from '../screens/JobsScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import { Ionicons } from '@expo/vector-icons';
import JobDetailsScreen from '../screens/JobDetailsScreen';

// Inside MainNavigator.js


const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Jobs') {
              iconName = 'briefcase-outline';
            } else if (route.name === 'Bookmarks') {
              iconName = 'bookmark-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Jobs" component={JobsScreen} />
        <Tab.Screen name="JobDetails" component={JobDetailsScreen} options={{ tabBarButton: () => null }} />
        <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}