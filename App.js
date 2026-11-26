import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import './src/locales/i18n';
import { theme } from './src/theme';

import { HomeScreen } from './src/screens/HomeScreen';
import { FormScreen } from './src/screens/FormScreen';
import { DraftScreen } from './src/screens/DraftScreen';
import { ShareScreen } from './src/screens/ShareScreen';
import { HelpScreen } from './src/screens/HelpScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor={theme.colors.bg} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.bg,
            },
            headerTintColor: theme.colors.primary,
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
              color: theme.colors.ink,
            },
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: theme.colors.bg,
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Form"
            component={FormScreen}
            options={{
              title: 'Fill Agreement Details',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="Draft"
            component={DraftScreen}
            options={{
              title: 'Review Agreement Draft',
              headerBackTitle: 'Edit',
            }}
          />
          <Stack.Screen
            name="Share"
            component={ShareScreen}
            options={{
              title: 'Export & Share',
              headerBackTitle: 'Draft',
            }}
          />
          <Stack.Screen
            name="Help"
            component={HelpScreen}
            options={{
              title: 'Legal Aid & DLSA Helpline',
              headerBackTitle: 'Home',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
