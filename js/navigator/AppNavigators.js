import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/HomePage';
import DetailPage from '../pages/DetailPage';
import WebViewPage from '../pages/WebViewPage';
import AuthorPage from '../pages/AuthorPage';
import CustomTagPage from '../pages/CustomTagPage';
import TagSortingPage from '../pages/TagSortingPage';
import SearchPage from '../pages/SearchPage';
import CodePushPage from '../pages/CodePushPage';
import MapPage from '../pages/MapPage';

const Stack = createStackNavigator();

export default function InitNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        animationEnabled: false,
        // gestureResponseDistance: { vertical: 20 },
      }}
      initialRouteName="WelcomePage"
    >
      <Stack.Screen name="WelcomePage" component={WelcomePage} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="DetailPage" component={DetailPage} />
      <Stack.Screen name="WebViewPage" component={WebViewPage} />
      <Stack.Screen name="AuthorPage" component={AuthorPage} />
      <Stack.Screen name="CustomTagPage" component={CustomTagPage} />
      <Stack.Screen name="TagSortingPage" component={TagSortingPage} />
      <Stack.Screen name="SearchPage" component={SearchPage} />
      <Stack.Screen name="CodePushPage" component={CodePushPage} />
      <Stack.Screen name="MapPage" component={MapPage} />
    </Stack.Navigator>
  );
}
